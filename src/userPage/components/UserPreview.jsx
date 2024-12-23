import Rating from "./util/Rating";

function UserPreview({ isEditing, onEdit, user }) {
  const professionOptions = ["social science", "exact sciences", "engineering"];

  const handleImgChange = (e) => {
    if (isEditing) {
      const file = e.target.files[0];
      if (file) {
        const imgURL = URL.createObjectURL(file);
        onEdit("profileImg", imgURL); // Update the profile image using onEdit callback
      }
    }
  };

  return (
    <div className="user-preview">
      <div className="headerRow">
        <div className="info-section">
          {/* Image as clickable to open file input */}
          <img
            onClick={() => document.getElementById("profileImgUpload").click()} // Trigger the file input on image click
            src={user.imgURL}
            alt={user.name}
          />

          {/* Hidden file input element */}
          {isEditing && (
            <input
              className="input-file"
              type="file"
              id="profileImgUpload"
              accept="image/*"
              onChange={handleImgChange}
              style={{ display: "none" }} // Hide the input field
            />
          )}

          <div>
            <h2>{user.name}</h2>
            {isEditing ? (
              <select
                value={user.profession}
                onChange={(e) => onEdit("profession", e.target.value)}
                className="dropdown"
              >
                {professionOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <span>{user.profession}</span>
            )}
          </div>
        </div>
        <p className="coins">Coins: {user.coins}</p>
      </div>
      <div className="user-details">
        {isEditing ? (
          <textarea
            value={user.aboutMe}
            onChange={(e) => onEdit("aboutMe", e.target.value)}
            className="bio-edit"
            placeholder="Edit about me"
          />
        ) : (
          <p className="bio">{user.aboutMe}</p>
        )}
        <div className="toActionRow">
          <Rating rating={user.rating} />
          <button className="message-btn">Message</button>
        </div>
      </div>
    </div>
  );
}

export default UserPreview;
