function UserInfo({ isEditing, onEdit, user }) {
  
  const cultureOptions = ["Arab", "Jewish"];
  const languageOptions = ["Arabic", "Hebrew", "English"];
  const cityOptions = ["Haifa", "SomeCity"];
  const academicInstitutionOptions = [
    "University of Haifa",
    "Tel Aviv University",
    "The Hebrew University",
    "Technion",
  ];

  return (
    <div className="user-info">
      <h3>User Information</h3>
      <div className="info-grid">
        {/* City */}
        <div className="FieldH">
          <span className="FieldH">City:</span>
          {isEditing ? (
            <select
              value={user.city || ""}
              onChange={(e) => onEdit("city", e.target.value)}
              className="dropdown"
            >
              {cityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <span>{user.city || "Not specified"}</span>
          )}
        </div>

        {/* Culture */}
        <div className="FieldH">
          <span className="FieldH">Culture:</span>
          {isEditing ? (
            <select
              value={user.culture || ""}
              onChange={(e) => onEdit("culture", e.target.value)}
              className="dropdown"
            >
              {cultureOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <span>{user.culture || "Not specified"}</span>
          )}
        </div>

        {/* Social Links */}
        <div className="FieldH">
          <span className="FieldH">Social Links:</span>
          {user.instagram && (
            <a href={user.instagram} target="_blank" rel="noreferrer">
              📸
            </a>
          )}
          {user.facebook && (
            <a href={user.facebook} target="_blank" rel="noreferrer">
              🔗
            </a>
          )}
        </div>

        {/* Language */}
        <div>
          <span className="FieldH">Language:</span>
          {isEditing ? (
            <select
              value={user.language[0] || ""}
              onChange={(e) => onEdit("language", [e.target.value])}
              className="dropdown"
            >
              {languageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <span>{user.language.join(", ") || "Not specified"}</span>
          )}
        </div>

        {/* Education */}
        <div>
          <span className="FieldH">Education:</span>
          <span>{user.education || "Not specified"}</span>
        </div>

        {/* University */}
        <div>
          <span className="FieldH">University:</span>
          {isEditing ? (
            <select
              value={user.academicInstitution || ""}
              onChange={(e) => onEdit("academicInstitution", e.target.value)}
              className="dropdown"
            >
              {academicInstitutionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <span>{user.academicInstitution || "Not specified"}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
