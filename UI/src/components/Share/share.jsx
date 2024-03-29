import './share.css';
import { PermMedia, LiveTv, Cancel } from '@material-ui/icons';
import MoodIcon from '@material-ui/icons/Mood';
import { useContext, useRef, useState } from 'react';
import { Context } from '../../Context/Context';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
function Share() {
  const UseHistory = useHistory();
  const { user } = useContext(Context);
  const [file, setfile] = useState(null);
  const des = useRef();
  const send = async e => {
    e.preventDefault();
    if (des.current.value === '' && file === null) {
      alert('Empty post Not allowed');
      return;
    }

    const post = {
      userId: user._id,
      desc: des.current.value,
      img: file,
    };
    des.current.value = '';
    // if (file) {
    //   const data = new FormData();
    //   let fileName = Date.now() + file.name;
    //   data.append('Fname', fileName);
    //   data.append('file', file);
    //   post.img = file;
    //   // data.forEach((e)=>console.log(e))
    //   try {
    //     await axios.post('/api/upload', data);
    //   } catch (error) {
    //     // console.log(error)
    //   }
    // }

    try {
      console.log(post);
      await axios.post('/api/post', post);
      // window.location.replace("/")
      UseHistory.push('/');
    } catch (error) {
      // console.log(error)
    }
  };
  const car = img => {
    var file = new FileReader();
    file.addEventListener('load', () => console.log(file.result));
    file.readAsDataURL(img.target.files[0]);

    // console.log(file.readAsDataURL(img.target.files[0]));
  };
  return (
    <div className="share">
      <div className="sharewrapper">
        <div className="sharetop">
          <img
            className="shareprofileImg"
            alt="sorry"
            src="/assets/profile/a.jpg"
          ></img>
          <input
            placeholder={`What's in your mind ${user.username}`}
            ref={des}
            className="shareInput"
          ></input>
        </div>
        <hr className="shareHr"></hr>
        {file ? (
          <div className="shareImg">
            <img src={file} alt="sorry"></img>
            <Cancel className="Sharing_cancel" onClick={() => setfile(null)} />
          </div>
        ) : null}
        <div className="sharebottom">
          <form className="shareoptions" onSubmit={send}>
            <label key="file" className="shareoption">
              <PermMedia className="shareIcon1" />
              <span className="shareoptionText">Photo or Video</span>
              <input
                type="file"
                accept=".png,.jpeg,.jpg"
                style={{ display: 'none' }}
                id="file"
                onChange={img => {
                  setfile(img.target.files[0]);
                  var file = new FileReader();
                  file.addEventListener('load', () => {
                    console.log(file.result);
                    setfile(file.result);
                  });
                  file.readAsDataURL(img.target.files[0]);
                  // setfile(img.target.files[0]);
                }}
              ></input>
            </label>
            <div className="shareoption">
              <LiveTv className="shareIcon2" />
              <span className="shareoptionText">Live Video</span>
            </div>
            <div className="shareoption lastoption">
              <MoodIcon className="shareIcon3" />
              <span className="shareoptionText">Activity / Feeling</span>
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
  );
}

export default Share;
