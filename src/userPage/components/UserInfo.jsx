
function UserInfo({ userInfo }){
  return (
    <div className="user-info">
      <h3>User Information</h3>
      <div className="info-grid">
        <div>
          <span>City:</span> {userInfo.city}
        </div>
        <div>
          <span>Culture:</span> {userInfo.culture}
        </div>
        <div>
          <span>Social Links:</span>
          <a href={userInfo.instagram} target="_blank" rel="noreferrer">
            📸
          </a>
          <a href={userInfo.facebook} target="_blank" rel="noreferrer">
            🔗
          </a>
        </div>
        <div>
          <span>Language:</span> {userInfo.language}
        </div>
        <div>
          <span>Education:</span> {userInfo.education}
        </div>
        <div>
          <span>University:</span> {userInfo.university}
        </div>
      </div>
    </div> 
  );
};

export default UserInfo;
