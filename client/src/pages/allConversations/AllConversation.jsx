  import { useContext, useEffect, useState } from 'react';
  import { MyContext } from '../../context/context.js';
  import { Link } from 'react-router-dom';
  import axios from 'axios';
  import './allConversations.css';
  
  export default function AllConversations() {
    const { user, setUser } = useContext(MyContext);
    const [hasNewMessage, setHasNewMessage] = useState(false);
  
    useEffect(() => {
      // Check if user has new messages
      const checkNewMessages = () => {
        // Make an API request to check for new messages
        // You can modify the URL and headers based on your API setup
        axios.get('http://localhost:3000/conversations', { headers: { token: localStorage.getItem('token') } })
          .then(response => {
            const hasNewMessage = response.data.hasNewMessage; // Replace with the actual response data structure
            setHasNewMessage(hasNewMessage);
          })
          .catch(error => {
            console.error('Error checking new messages:', error);
          });
      };
  
      // Call the function to check for new messages
      checkNewMessages();
  
      // You can set an interval to periodically check for new messages
      const interval = setInterval(() => {
        checkNewMessages();
      }, 5000); // Adjust the interval time according to your requirements
  
      // Clear the interval when the component unmounts
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    const deleteConversation = async (conversationId) => {
      try {
        const response = await axios.delete(`http://localhost:3000/conversations/${conversationId}`, {
          headers: { token: localStorage.getItem('token') },
        });
  
        console.log(response.data); // Success message from the backend
  
        setUser(response.data.data);
      } catch (error) {
        console.error('Error deleting conversation:', error);
      }
    };
  
    return (
      <div className='conversations'>
        <h3 className='conversations-banner'>Conversations</h3>
        <div className={`conversation-list ${hasNewMessage ? 'has-new-message' : ''}`}>
          {user?.conversations.map((c) => (
            <div className='single-conversation' key={c._id}>
              <Link to={`/messenger/${c._id}`} className='conversation-link'>
                <div className='conversation-info'>
                  <h2 className='users-conversation'>
                    {c?.guest.userName} started a conversation with {c?.host.userName}
                  </h2>
                </div>
              </Link>
                <button className='delete-button' onClick={() => deleteConversation(c._id)}>
                  🗑️
                </button>
              
            </div>
          ))}
        </div>
      </div>
    );
  }