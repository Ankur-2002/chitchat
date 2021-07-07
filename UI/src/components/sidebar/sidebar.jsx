import "./sidebar.css";
import {sidedata,friends} from "./sidedata";
import $ from 'jquery';
// import {findDOMNode} from 'react-dom'
function sidebar() {
    const click = (props)=>{
            $(".sidebarFriendList").toggle("fast")
    }
    return (
        <div className="sidebar">
              <div className="sidewrapper">
            <ul className="sidebardata">
            {
                sidedata.map((value,index)=>{
                    return <li key={index}>{value.icon}{value.title}</li>
                })
            }

            </ul>
            </div>
            <div className="Readmore">
            <button onClick = {click}>Read More</button>
            </div>
            <hr className="hr"></hr>
            <div refs="toggle">
            <ul className="sidebarFriendList" >
            
            {
                friends.map((value,index)=>{
                    return <li key={index} className="sidebarFriend">
                        <img src={process.env.PUBLIC_URL+value.profile}  alt="sorry" className="friendimg" />
                        <span className="friendname">{value.name}</span>
                    </li>
                })
            } 
            </ul>
            </div>
        </div>
    )
}

export default sidebar
