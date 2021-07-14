import  {useState,useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/sidebar'
import Rightbar from '../../components/rightbar/rightbar'
import Feed from '../../components/feed/feed';
import './profile.css'
import axios from 'axios';
import {  useParams } from 'react-router-dom'
 
 function Profile() {  
    
    const param = useParams();  

    const [data,setdata] = useState({}); 

 

    useEffect(()=>{
        const fetch_user = async()=>{
            console.log(param)
            try {
             
            const user = await axios.get(`/api/user/get/?username=${param.username}`)
            setdata(user.data);
              
            } catch (error) {
                window.history.back('/')
            } 
            
        }
        fetch_user();
    },[param]);

    return (
        <>
        
       <>
       <Navbar></Navbar>
        <div className="profile">
        <Sidebar/> 
        <div className="profileright">
        <div className="profilerighttop">
        <div className="profilecover">
            <img src={ process.env.PUBLIC_URL+"/assets/profile/f.jpg" } alt="sry" className="coverImg"/>
            <img src={ process.env.PUBLIC_URL+"/assets/profile/b.jpg"} alt="sry" className="profileImg" />
        </div>
        
        <div className="profileinfo">
        <h4 className="info_name">{data.username}</h4>
        <span className="info_description">{data.desc}</span>
        </div>


        </div>


        <div className="profilerightbottom">
            <Feed username={data.username}/>
            <Rightbar data={data} /> 
        </div>
        
        
        </div>
          
        </div></>
          
        </>
    )
}
export default Profile