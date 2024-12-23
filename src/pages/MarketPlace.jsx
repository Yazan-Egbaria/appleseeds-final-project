import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HomePageCategory from "../components/HomePageCategory";
import Card from "./../components/card/Card";
import { Link } from "react-router-dom";
import categorizeUsers from "./../FirebaseFunctions/FetchFilteredData";

const MarketPlace = () => {
  const { category } = useParams();

  const [filterd, setFilterd] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({
    "Basic Programming": [],
    "Full-Stack Development": [],
    "Front-End Development": [],
    "Back-End Development": [],
    "Mobile Development": [],
    "Data Analysis": [],
    "UI/UX Design": [],
    "Graphic Design": [],
    "Video Editing": [],
    "Digital Marketing": [],
  });
  const [allUsers, setAllUsers] = useState([]);

  function Filter(text) {
    setFilterd((prevFilterd) => {
      const newFilterd = new Set(prevFilterd);
      if (newFilterd.has(text)) {
        newFilterd.delete(text);
      } else {
        newFilterd.add(text);
      }
      return newFilterd;
    });
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const categorizedData = await categorizeUsers();
        setCategories(categorizedData);
        setAllUsers(Object.values(categorizedData).flat());
        setLoading(false);

        if (category) {
          setFilterd(new Set([category]));
        }
      } catch (error) {
        console.error("Error fetching and categorizing users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [category]);

  return (
    <div className="pagePadding container mx-auto flex flex-col">
      <HomePageCategory
        padding="pt-20"
        filterFunc={Filter}
        category={category}
      />
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <span>Loading...</span>
        </div>
      ) : filterd.size === 0 ? (
        <div className="flex flex-wrap gap-4">
          {allUsers.map((user, userIndex) => (
            <Link to={`/profile/${user.id}`}>
              <Card
                key={userIndex}
                name={user.name}
                profession={user.profession}
                description={user.bio}
                coins={user.coins}
                profileImage={user.imgUrl}
                rating={user.rating}
                backgroundImage={user.backgroundImage}
              />
            </Link>
          ))}
        </div>
      ) : (
        [...filterd].map((title) => {
          const currentUsers = categories[title];
          return (
            <div key={title} className="flex flex-wrap gap-4">
              {currentUsers.map((user, userIndex) => (
                <Link to={`/profile/${user.id}`}>
                  <Card
                    key={userIndex}
                    name={user.name}
                    profession={user.profession}
                    description={user.bio}
                    coins={user.coins}
                    profileImage={user.imgUrl}
                    rating={user.rating}
                    backgroundImage={user.backgroundImage}
                  />
                </Link>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
};

export default MarketPlace;
