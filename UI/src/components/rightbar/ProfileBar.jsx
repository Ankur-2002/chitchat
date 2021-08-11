import React from 'react';
const ProfileBar = () => {
  return (
    <>
      {
        <>
          {user.username !== data.username && (
            <button className="follow_button" onClick={followHandler}>
              {Follow ? 'Unfollow' : 'Follow'}
            </button>
          )}
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
          <div className="rightbarfollwings" style={{ textDecoration: 'none' }}>
            {friend.length > 0 &&
              friend.map((value, index) => {
                return (
                  <Link
                    to={`/profile/${value.username}`}
                    key={index}
                    style={{
                      color: 'black',
                      fontWeight: '500',
                      textDecoration: 'none',
                    }}
                  >
                    <div className="rightbarfollowings" key={index}>
                      <img
                        width="32"
                        height="32"
                        src={process.env.PUBLIC_URL + '/assets/profile/a.jpg'}
                        alt="soory"
                        className="following_img"
                      />
                      <span className="follwing_name">{value.username}</span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </>
      }
    </>
  );
};

export default ProfileBar;
