import { useContext } from 'react'
import { MyContext } from '../context/context.js'
import { Link } from 'react-router-dom'


export default function AllConversation() {
    const {user} = useContext(MyContext)
    console.log(user)
  return (
    <div>
      <h3>Conversations</h3>
        {user?.conversations.map((c) => (<Link to={"/messenger/" + c._id}><h1> {c?.guest.userName} and {c?.host.userName}</h1></Link>)) }
    </div>
  )
}
