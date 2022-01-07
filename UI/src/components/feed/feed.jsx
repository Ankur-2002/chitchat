import './feed.css';
import Share from '../Share/share';
import Post from '../Post/post.jsx';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/Context';

function Feed(props) {
  const { user } = useContext(Context);
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = props.username
        ? await axios.get(`/api/post/allpost/${props.username}`) //
        : await axios.get(`/api/post/timeline/${user._id}`); // When user Login, then all timelines are fetch
      setdata(
        res.data.sort((p1, p2) => {
          // sort all post as per the created date
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetch();
  }, [user, props.username]);
  return (
    <div className="feed">
      <div className="feedwrapper">
        {!props.username || props.username === user.username ? <Share /> : null}

        {data.length > 0 &&
          data.map((value, index) => {
            return <Post data={value} key={value._id} event={setdata} />;
          })}
      </div>
    </div>
  );
}

export default Feed;
