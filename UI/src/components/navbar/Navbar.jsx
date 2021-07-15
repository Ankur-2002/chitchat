 
import './navbar.css';
import {Search, Person, Chat , Notifications} from '@material-ui/icons'
import { Link,  useHistory} from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { Context } from '../../Context/Context';
import $ from 'jquery'; 

function Navbar() {
    const history= useHistory();
    const [open , setview] = useState(false);
    const {user} = useContext(Context);
    const [menu , viewmenu] = useState(false);
    const [search, update] = useState("");
    const Logout = () =>{
           window.localStorage.removeItem("user");
           history.push('/') 
           window.location.reload()
    }   
    const show = () =>
    {  
        if(!open){
        $(".topbarmenus").css({"display" : "block"})
        }
        else{
        $(".topbarmenus").css({"display" : "none"})
        }
        setview(!open);
    }
    const setmenu = () =>{
        if(!menu){
        $(".sidebar").css({"display" : "block"});
        $(".post").css({"display":"none"})
        }
        else{
        $(".sidebar").css({"display" : "none"})
        $(".post").css({"display":"block"})
        }

        viewmenu(!menu);
    }   
    return (
        <div className="topbarContainer" > 
             <div className="hamburger" onClick={setmenu}>
                 <span className="ham1"></span>
                 <span className="ham2"></span>
                 <span className="ham3"></span>
            </div>
            <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo">ChitChat</span>
            </Link>
            </div>
            <div className="topbarcenter">
                <div className="searchbar"> 
                <Link to={`/profile/${search}`}><Search className="searchbar-icon"/></Link>
                <input placeholder="Search for friend , Post or video"  onChange={(e)=>update(e.target.value)} className="searchInput"></input>
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
