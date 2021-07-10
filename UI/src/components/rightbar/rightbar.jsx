import "./rightbar.css";
import { useContext, useEffect, useState } from "react";
import { friends } from "../sidebar/sidedata"
import $ from 'jquery'
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import axios from "axios"; 
function Rightbar({data}) {
 
   const {user , dispatch} = useContext(Context);  
    
   const [friend,setfriends] = useState([]);
   const [Follow,setFollow] = useState();

//    console.log(user)
    useEffect(()=>{
     console.log(data)
       data && setFollow(user.following.includes(data._id)) 
       
    },[data])
   useEffect(()=>{
    const fetch = async ()=>{  
    try {
        const id = data._id;
        const datas = await axios.get("/api/user/allfriends/"+id);
        setfriends(datas.data)  
    } catch (error) {
        console.log(error)
    }
    }
        fetch();
    },[data , user._id]);
   
   
   
    const hide_all = (e)=>{
        $(".friend_status").fadeToggle();
    }


    const followHandler = async() =>{
        try {
            if(Follow)
            {
                await axios.put(`/api/user/${data._id}/unfollow`,{userId : user._id})
                dispatch({type : "UnFollow" , payload : data._id})
                setFollow(false);

            }
            else    
            {
            await axios.put(`/api/user/${data._id}/follow`,{userId : user._id}) 
            dispatch({type : "Follow" , payload : data._id});
            setFollow(true);
            }
        } catch (error) {
            
        }
    }

    const HOME_RIGHT_BAR = () =>{
        return (<>
        <div className="topstatus" >

          

        <div className="mystatus">
            <img src={process.env.PUBLIC_URL+"/assets/profile/a.jpg"} width="32" height="32" className="status_img_user" alt="new" />
            <span className="mytext">My Story</span>
        </div>
            
        <hr className="separater"/>
        <div className="All_stories" onClick={hide_all}><span>All stories</span></div>

        <div className="friend_status">

        {
            friends.map((value,index)=>{
            return (  <div key={index} className="friends_status">
            <img src={value.profile} width="32" height="32" className="status_img" alt="new" />
            <span className="mytext">{value.name}</span>
        </div>
            )
            })
        } 
        </div>

        </div>
        <div className="online_friends">
        <div className="All_stories"><span>Online friends</span></div>
        <ul className="all_online_list">
            {
                friends.map((value,index)=>{
                    return (  <li key={index} className="friends_online">
                <img src={value.profile} width="32" height="32" className="status_img" alt="new" />
                <span className="mytext">{value.name}</span>
            </li>
                    )
                })
            }
        </ul>
        </div>
        
        </>);
    }
const PROFILE_BAR = () =>{
    return (<>
        {
         <>

            {user.username !== data.username && <button className="follow_button" onClick={followHandler}>
            {(Follow) ? "Unfollow" : "Follow"}    
            </button>}
            <h4 className="rightbartitle">User Information</h4>
            <div className="rightbarinfo">
            <div className="rightbaritem">
                <span className="infokey">City</span>
                <span className="infovalue">{data.city}</span>
            </div>
    
            <div className="rightbaritem">
                <span className="infokey">From : </span>
                <span className="infovalue">{data.from}</span>
            </div>
            <div className="rightbaritem">
                <span className="infokey">Relations :</span>
                <span className="infovalue">{data.relationship}</span>
            </div>
            </div>
            <h4 className="rightbartitle">User Friends</h4>
            <div className="rightbarfollwings" style={{textDecoration:"none"}}>

            {friend.length > 0 && friend.map((value , index)=>{
                return (
                <Link to={`/profile/${value.username}`} style={{color:"black",fontWeight:"500",textDecoration:"none"}}>
                <div className="rightbarfollowings" key={value._id}>
                 <img width="32" height="32" src={process.env.PUBLIC_URL+"/assets/profile/a.jpg"} alt="soory" className="following_img" />
                 <span className="follwing_name"  >{value.username}</span>
                 </div> 
                 </Link>
                
                )
            })
            }
              </div>
             </>  

        }

    </>)
}
    return (
        
        <div className="rightbar">
           <div className="wrapper">
            {
            (data === undefined) ? <HOME_RIGHT_BAR/> : <PROFILE_BAR/>
            }
           </div>
        </div>
    )
}

export default Rightbar;
