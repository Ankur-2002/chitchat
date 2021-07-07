import './share.css';
import {PermMedia,LiveTv, Cancel} from '@material-ui/icons';
import MoodIcon from '@material-ui/icons/Mood';
import { useContext, useRef, useState } from 'react';
import { Context } from '../../Context/Context';
 
import axios from 'axios';
function Share() {
    const {user} = useContext(Context);
    const [file,setfile] = useState(null);  
    const des = useRef();  
    const send = async (e) =>{
        e.preventDefault();
    
        const post = {
            userId : user._id,
            desc : des.current.value,  
            
        };
        if(file){
            const data = new FormData();
            let fileName =  Date.now() + file.name;
            data.append("Fname",fileName); 
            data.append("file",file);
            post.img = fileName;
            // data.forEach((e)=>console.log(e))
            try {
               await axios.post('/api/upload',data);
            } catch (error) {
                console.log(error)
            }
        }

        try {
           await axios.post('/api/post',post); 
            window.location.reload()
        } catch (error) {
            console.log(error)
        }

    }   

    return (
        <div className="share">
            <div className="sharewrapper">
            <div className="sharetop">
            <img className="shareprofileImg" alt="sorry" src="/assets/profile/a.jpg"></img>
            <input placeholder={`What's in your mind ${user.username}`} ref={des} className="shareInput"></input>
            </div>
            <hr className="shareHr"></hr>
            {(file)? (
                <div className="shareImg">
                <img  src={URL.createObjectURL(file)}></img>
                <Cancel className="Sharing_cancel" onClick={()=>setfile(null)}/>
                </div>
            ): null}
            <div className="sharebottom">
                <form className="shareoptions" onSubmit={send}>
                    <label key="file" className="shareoption">
                    <PermMedia className="shareIcon1"/>
                        <span className="shareoptionText">
                            Photo or Video
                        </span>
                        <input type="file" accept=".png,.jpeg,.jpg" style={{display:"none"}} id="file" onChange={(img)=>setfile(img.target.files[0])}></input>
                    </label>
                    <div className="shareoption">
                    <LiveTv className="shareIcon2"/>
                        <span className="shareoptionText">
                            Live Video
                        </span>
                    </div>
                    <div className="shareoption lastoption">
                    <MoodIcon className="shareIcon3"/>
                        <span className="shareoptionText">
                            Activity / Feeling
                        </span>
                    </div>
                    <div className="shareoption">
                    {/* <MoodIcon className="shareIcon4"/> */}
                        <button type="submit" className="shareoptionbutton">
                            Share
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Share
