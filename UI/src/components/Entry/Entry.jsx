import {Link} from 'react-router-dom'
// import Reac from 'react' 
function Entry() {
    return (
        <div>
            <div className="Entry">
                <span>Welcome to Chitchat App</span>
            </div> 

            <div>
               <Link to="/login"> <span>Login</span></Link>
                <hr/>
                <Link to="/register"><span>Register</span></Link>
            </div>


        </div>
    )
}

export default Entry



