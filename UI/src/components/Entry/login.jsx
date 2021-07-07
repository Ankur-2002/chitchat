import {useContext} from 'react'
import {Link} from 'react-router-dom'
 
import './login.css';
import CallsServer from '../../CallsServer';
import {Context} from '../../Context/Context'
const Login =() =>{ 
    
    const {/*user */ waiting , /*error */ dispatch} = useContext(Context);
    const Submit =  async(e) =>{
    e.preventDefault();
   
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value;
    var email = document.getElementById("email").value
     CallsServer({username : username,password : password,email : email},dispatch);
    }
 
    return (
        <> 
        { 
        <div className="login">
        <div className="loginwrapper">
        <div className="loginLeft">
        <h3 className="loginlogo">Chit Chat</h3>
        <span className="logindescription">Connect with friends and the world around you on Chit Chat</span>
        </div>
        <div className="loginright">
            <div className="loginbox">
 
            <input type="text" id="username" placeholder="Username" name="username" />
         
            <input type="password" id="password" placeholder="Password"  name="password" />
        
            <input type="email" placeholder="Email"  id="email"/>
      

       
            <button className="loginbutton" disabled={waiting} onClick={Submit}>{waiting ? "LOADING": "LOG IN"}</button> 
                <span className="loginregisterbutton"><Link to="/register">Forgot Password ?</Link></span> 
                <div className="loginregisterbutton">
                    
                    <Link to="/register">{waiting ? "LOADING": "Create a New Account"}</Link>
                    
                </div>

            </div>
        </div>

        </div>
    </div> 
    }


        
        </>
    )
}

export default Login;
