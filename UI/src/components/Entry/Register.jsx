import axios from 'axios'
import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { Context } from '../../Context/Context'
const Register = () =>{
   
    const {dispatch} = useContext(Context);
    // console.log(dispatch)
    const Submit =  async (e) =>{
        
        e.preventDefault();
        try {
            const user = {
                username : document.getElementById('username').value.trim(),
                password : document.getElementById('password').value.trim(),
                email : document.getElementById("email").value.trim()
                };
                if(user.username.trim().length === 0 || user.password.trim().length === 0 || user.email.trim().length === 0)
                return ;

                if(user.password.length < 6)
                {
                    console.log(user.password)
                    alert('Password Too Small')
                    return ; 
                }

                const response = await axios.post('/api/auth/register',user);
              
                dispatch({type : "Register",payload : response})
        } catch (error) {
            alert("Something went Wrong");   
        }
        
    }

       return (
        <div className="login">
 
        <div className="loginwrapper">
        <div className="loginLeft">
        <h3 className="loginlogo">Chit Chat</h3>
        <span className="logindescription">Connect with friends and the world around you on Chit Chat</span>
        </div>
        <div className="loginright">
            <div className="loginbox">
            <input type="text" id="username" placeholder="Username" name="username" />

            <input type="password"id="password" placeholder="Password" name="username" />
         
            <input type="password"id="password"  placeholder="Password Again"  name="password" />
        
            <input type="email" placeholder="Email"  id="email"/>
 
            <button className="loginbutton" onClick={Submit}>Sign up</button> 
                <span className="loginregisterbutton"> <Link to="/register">Forgot Password ?</Link> </span> 
                <div className="loginregisterbutton">
                    
                    <Link to="/login">Log In</Link>
                    
                </div>

            </div>
        </div>

        </div> 
    </div> 
    )
}

export default Register;
