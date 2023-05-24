import React from "react"; 
import { Navigate } from "react-router-dom";    
import { MyContext } from "../context/context.js";  
import { useContext } from "react"; 

export default function LogoutButton() { 
 const { user, setUser } = useContext(MyContext); 
 const logoutUser = () => { 
     localStorage.removeItem("token"); 
     setUser(null); 
 }; 
 if (user) { 
     return ( 
         <div> 
              <button style={
                    {   
                        width: '100px', 
                        height: '30px',
                        borderRadius: '10%',
                        objectFit: 'cover',
                        backgroundColor: 'red',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }
              } onClick={logoutUser}  >logout</button>  
         </div> 
     ); 
 } else { 
     return <Navigate to="/login" />; 
 } 
}  


