
function UserPreview({ user }){

  function handleImgChange(e) {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setUser((prevUser) => {
        return Object.assign({}, prevUser, { profileImg: imgURL });
      });
    }
  }

  return (
    <div className="user-preview">
      <div className="headerRow">
        <div className="info-section">
          <img onChange={()=>handleImgChange} src={user.imageUrl} alt={user.name} />
          <div>
            <h2>{user.name}</h2>
            <p>{user.title}</p>
          </div>
        </div>
        <p className="coins">Coins: {user.coins}</p>
      </div>
      <div className="user-details">
        <p className="bio">{user.bio}</p>
        <div className="toActionRow">
          <div className="rating">⭐ ⭐ ⭐ ⭐ ⭐</div>
          <button className="message-btn">Message</button>
        </div>
      </div>
    </div>
  );
};

export default UserPreview;
