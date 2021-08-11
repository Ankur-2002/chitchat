import { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/sidebar';
import Rightbar from '../../components/rightbar/rightbar';
import Feed from '../../components/feed/feed';
import './profile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Cancel, Check, Edit } from '@material-ui/icons';
import { Context } from '../../Context/Context';

function Profile() {
  const { user: User, dispatch } = useContext(Context);
  const param = useParams();
  const [data, setdata] = useState({});
  const [file, setfile] = useState(null);

  useEffect(() => {
    const fetch_user = async () => {
      // console.log(param)
      try {
        const user = await axios.get(
          `/api/user/get/?username=${param.username}`
        );
        setdata(user.data);
      } catch (error) {
        window.history.back('/');
      }
    };
    fetch_user();
  }, [param]);

  const upload = async () => {
    const Data = new FormData();
    let fileName = Date.now() + file.name;
    Data.append('Fname', fileName);
    Data.append('file', file);

    try {
      const newuser = User;
      newuser.profilePicture = fileName;
      await axios.post('/api/upload', Data).then(async res => {
        await axios.put(`/api/user/${User._id}`, newuser);
        // console.log(fileName)
        dispatch({ type: 'updateUser', payload: fileName });
        setfile(null);
      });
    } catch (error) {
      window.history.back('/');
    }
  };
  return (
    <>
      <>
        <Navbar Key={'Navbar_from_Profile_bar'}></Navbar>
        <div className="profile">
          <Sidebar Key={'Sidebar_from_profile_bar'} />
          <div className="profileright">
            <div className="profilerighttop">
              <div className="profilecover">
                <div className="current_picture_profile">
                  {file && (
                    <>
                      <img src={URL.createObjectURL(file)} alt="IMG"></img>
                      {
                        <Cancel
                          style={{ fontSize: '40px', color: 'grey' }}
                          onClick={() => setfile(null)}
                          className="cross_in_profile"
                        />
                      }
                      {
                        <Check
                          onClick={upload}
                          style={{ fontSize: '30px' }}
                          className="tick_in_profile"
                        />
                      }
                    </>
                  )}
                </div>
                {User && data && User.username === data.username ? (
                  <label key="file">
                    <Edit
                      className="edit_icon"
                      style={{ display: file ? 'none' : 'block' }}
                    />
                    <input
                      type="file"
                      accept=".png,.jpeg,.jpg"
                      style={{ display: 'none' }}
                      id="file"
                      onChange={img => setfile(img.target.files[0])}
                    />
                  </label>
                ) : null}
                <img
                  src={process.env.PUBLIC_URL + `/assets/profile/user.png`}
                  alt="sry"
                  className="coverImg"
                />
                <img
                  src={
                    data.profilePicture
                      ? `/images/${data.profilePicture}`
                      : process.env.PUBLIC_URL + '/assets/profile/user.png'
                  }
                  alt="sry"
                  className="profileImg"
                />
              </div>

              <div className="profileinfo">
                <h4 className="info_name">{data.username}</h4>
                <span className="info_description">{data.desc}</span>
              </div>
              <div className="counter">
                <div className="following_count">
                  {data.following && (
                    <>
                      {' '}
                      <p>{data.following.length}</p>
                      <p>Following</p>
                    </>
                  )}
                </div>
                <div className="following_names">
                  <p>{data.followers && data.followers.length}</p>
                  <p>Followers</p>
                </div>
              </div>
            </div>

            <div className="profilerightbottom">
              <Feed username={data.username} Key={'Feed_from_Profile_bar'} />
              <Rightbar data={data} Key={'Right_from_Profile_bar'} />
            </div>
          </div>
        </div>
      </>
    </>
  );
}
export default Profile;
