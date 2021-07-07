import axios from 'axios'
import React from 'react'
import {Link,  useHistory} from 'react-router-dom'
const Register = () =>{
  
 const history = useHistory();

    const Submit =  async (e) =>{
        e.preventDefault()
        const user = {
        username : document.getElementById('username').value,
        password : document.getElementById('password').value,
        email : document.getElementById("email").value
        }
        await axios.post('api/auth/register',user);
        history.push("/login")
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
