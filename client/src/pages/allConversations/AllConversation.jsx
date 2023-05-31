import { useContext } from 'react';
import { MyContext } from '../../context/context';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./allConversations.css"


export default function AllConversation() {
  const { user, setUser } = useContext(MyContext);

  const deleteConversation = async (conversationId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/conversations/${conversationId}`,{headers: {token:localStorage.getItem('token')}});

      console.log(response.data); // Success message from the backend

      setUser(response.data.data);
    } catch (error) {
      console.error('Error deleting conversation:', error);

    }
  };


  return (
    <div className='conversations'>
      <h3 className='conversations-banner'>Conversations</h3>
      {user?.conversations.map((c) => (
        <div className='single-conversation' key={c._id}>
          <Link to={`/messenger/${c._id}`}>
            <h2 className='users-conversation'>
              {c?.guest.userName} and {c?.host.userName}
            </h2>
          </Link>
          <button className='delete-button' onClick={() => deleteConversation(c._id)}>Delete 🗑️</button>
        </div>
      ))}
    </div>
  );
}
