import { useState } from "react";
import UserPreview from "./components/UserPreview";
import UserInfo from "./components/UserInfo";
import AttributeContainer from "./components/AttributeContainer";
import { useParams } from "react-router-dom";
export default function ProfilePage() {
  //the shred db user object
  const [user, setUser] = useState([
    {
      name: "Ohad",
      coins: 100,
      rating: "4.7/5",
      basicStatistics: "need to be improved...",
      feedback: "daniel: amazing, shara: good",
      profileImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQi2Mm5P8j09P4hPKa1B-t9eIOHzHmR7IBkw&s",
      language: ["Hebrew"],
      profession: "engineering",
      culture: "Jewish",
      academicInstitution: "University of Haifa",
      typeOfService: ["Private lessons"],
      MySkills: ["Programming"],
      aboutMe: "Passionate about design and innovation.",
      experience: "year",
      id: "1",
    },
  ]);
  const { id } = useParams(); /*retrieve the id using useParams*/
  const profile = user.find(
    (User) => User.id === id,
  ); /*choose the correct profile using the id*/
  if (!profile) {
    return <div>Profile not found</div>; // Handle case where profile is not found
  }
  const [isEditing, setIsEditing] = useState(false);

  // תהילה
  const [isEditingServices, setIsEditingServices] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);

  //const data menu
  const TypeOfService = [
    "Exam preparation",
    "Private lessons",
    "Professional intention",
  ];

  const TypeOfSkills = ["Chess", "Programming", "Cooking"];

  const Experience = ["year", "2-5 years", "5-10 years", "10 and above"];

  const profession = ["social science", "exact sciences", "engineering"];

  const AcademicInstitution = [
    "University of Haifa",
    "Tel Aviv University",
    "The Hebrew University",
    "Technnyon",
  ];

  function toggleEdit() {
    setIsEditing((isEditingPrev) => {
      return !isEditingPrev;
    });
  }
  const handleDropdownChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  // תהילה

  function toggleEditServices() {
    setIsEditingServices(!isEditingServices);
  }

  function toggleService(service) {
    setUser((prevUser) => {
      let updatedServices;

      if (prevUser.typeOfService.includes(service)) {
        updatedServices = prevUser.typeOfService.filter(
          (item) => item !== service,
        );
      } else {
        updatedServices = prevUser.typeOfService.concat(service);
      }
      return {
        typeOfService: updatedServices,
      };
    });
  }

  function toggleEditSkills() {
    setIsEditingSkills(!isEditingSkills);
  }

  function toggleSkills(skill) {
    setUser((prevUser) => {
      let updatedSkills;

      if (prevUser.MySkills.includes(skill)) {
        updatedSkills = prevUser.MySkills.filter((item) => item !== skill);
      } else {
        updatedSkills = prevUser.MySkills.concat(skill);
      }
      return {
        MySkills: updatedSkills,
      };
    });
  }

  return (
    <div className="container mx-auto max-w-screen-lg gap-5 p-5">
      <div className="pageHeader mb-6 flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
        <button className="rounded-md bg-indigo-600 px-4 py-2 text-white transition-transform duration-300 hover:bg-indigo-700">
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <article className="HeroSection grid grid-cols-3 gap-6 p-4">
        <UserPreview
          user={profile}
          isEditing={isEditing}
          onEdit={handleDropdownChange}
        />
        <UserInfo
          user={profile}
          isEditing={isEditing}
          onEdit={handleDropdownChange}
        />
      </article>

      <h1 className="section-header mb-4 text-2xl font-bold text-blue-600">
        My services
      </h1>
      <AttributeContainer
        user={profile}
        isEditing={isEditing}
        onEdit={handleDropdownChange}
        listKey={"typeOfService"}
        options={TypeOfService}
      />

      <h1 className="section-header mb-4 text-2xl font-bold text-blue-600">
        My skills
      </h1>
      <AttributeContainer
        user={profile}
        isEditing={isEditing}
        onEdit={handleDropdownChange}
        listKey={"MySkills"}
        options={TypeOfSkills}
      />

      <h1 className="section-header mb-4 text-2xl font-bold text-blue-600">
        Feedback
      </h1>
      <div className="square mb-5 rounded-md bg-gray-100 p-5 shadow-md">
        <div className="feedback-item mb-3 rounded-md bg-gray-200 p-4 shadow-lg transition-all duration-300 hover:translate-y-1 hover:bg-green-100">
          <div className="feedback-header mb-3 flex items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="Daniel"
              className="feedback-avatar mr-3 h-12 w-12 rounded-full"
            />
            <h5>
              <a
                href="/profile/daniel"
                className="feedback-name font-bold text-blue-600"
              >
                Daniel
              </a>
            </h5>
          </div>
          <p className="feedback-comment text-sm leading-6 text-gray-600">
            Amazing professional!
          </p>
        </div>

        <div className="feedback-item mb-3 rounded-md bg-gray-200 p-4 shadow-lg transition-all duration-300 hover:translate-y-1 hover:bg-green-100">
          <div className="feedback-header mb-3 flex items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="Sarah"
              className="feedback-avatar mr-3 h-12 w-12 rounded-full"
            />
            <h5>
              <a
                href="/profile/daniel"
                className="feedback-name font-bold text-blue-600"
              >
                Sarah
              </a>
            </h5>
          </div>
          <p className="feedback-comment text-sm leading-6 text-gray-600">
            Good!
          </p>
        </div>
      </div>
    </div>
  );
}
