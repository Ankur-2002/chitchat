 
import './navbar.css';
import {Search, Person, Chat , Notifications} from '@material-ui/icons'
import { Link,  useHistory} from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../Context/Context';
import $ from 'jquery';

function Navbar() {
    const history= useHistory();
    const {user} = useContext(Context);
    const Logout = () =>{
           window.localStorage.removeItem("user");
           history.push('/') 
           window.location.reload()
    }   
    const show = () =>
    {
        
    }

    return (
        <div className="topbarContainer"> 
            <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo">ChitChat</span>
            </Link>
            </div>
            <div className="topbarcenter">
                <div className="searchbar">
                <Search className="searchbar-icon"/>
                <input placeholder="Search for friend , Post or video" className="searchInput"></input>
                </div>
                 
            </div>
            <div className="topbarright">
                <div className="topbarLinks">
                    <span className="topbarlink">Homepage</span>
                    <span className="topbarlink">Timeline</span>
               
                </div>
                
                
                <div className="topbarIcons">
                
                <div className="topbarIconitems" onClick={show}>
                <img  src={process.env.PUBLIC_URL+"/assets/profile/a.jpg"} alt="" className="topbarImg"  />          
                <ul className="topbarmenus">
                    <li>
                    <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>Profile</Link> 
                    </li>
                    <li onClick={Logout}>Logout</li>
                    <li><Link to="/">Home</Link></li>
                </ul>
                
                </div>
                    <div className="topbarIconitems">
                        <Person/>
                        <span className="topbarIconbadge">
                            1
                        </span>
                    </div>
                    <div className="topbarIconitems">
                        <Chat/>
                        
                         {/* <img width="23px" style={{color : "white"}} src="https://cdn.iconscout.com/icon/free/png-64/facebook-messenger-555308.png"/> */}
                        <span className="topbarIconbadge">
                            2
                        </span>
                    </div>
                    <div className="topbarIconitems">
                        <Notifications/>
                        <span className="topbarIconbadge">
                            3
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
