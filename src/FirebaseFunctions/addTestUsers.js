import { db } from "../firebase.js";
import {
  collection,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const sampleUsers = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    religion: "Jewish",
    dob: "1990-01-01",
    education: "Tel Aviv University (TAU)",
    experience: "5 years in software development",
    profession: ["Full-Stack Development"],
    bio: "Passionate about building scalable web applications and exploring new technologies.",
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/20/17/icon-350226_640.png",
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    religion: "Christian",
    dob: "1992-05-12",
    education: "Hebrew University",
    experience: "3 years in marketing",
    profession: ["Front-End Development", "Digital Marketing"],
    bio: "Creative digital marketer with a knack for UI/UX design and branding.",
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/20/17/icon-350226_640.png",
  },
  {
    name: "Ahmed Ali",
    email: "ahmedali@example.com",
    religion: "Muslim",
    dob: "1988-09-15",
    education: "Technion",
    experience: "7 years in engineering",
    profession: ["Back-End Development"],
    bio: "Skilled in server-side technologies and backend architecture.",
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/20/17/icon-350226_640.png",
  },
  {
    name: "Liora Cohen",
    email: "lioracohen@example.com",
    religion: "Jewish",
    dob: "1995-03-10",
    education: "Bar-Ilan University",
    experience: "2 years in research",
    profession: ["Data Analysis", "UI/UX Design"],
    bio: "Data analyst with a passion for creating meaningful data visualizations.",
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/20/17/icon-350226_640.png",
  },
  {
    name: "Mohammed Hassan",
    email: "mohammedhassan@example.com",
    religion: "Muslim",
    dob: "1985-12-20",
    education: "Ben-Gurion University",
    experience: "10 years in IT",
    profession: ["Mobile Development", "Graphic Design"],
    bio: "Experienced IT manager with expertise in mobile app development and graphic design.",
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/20/17/icon-350226_640.png",
  },
  {
    name: "Sarah Levi",
    email: "sarahlevi@example.com",
    religion: "Jewish",
    dob: "1998-07-18",
    education: "Open University",
    experience: "1 year in teaching",
    profession: ["Basic Programming", "Video Editing"],
    bio: "Teacher with a love for technology and a knack for video content creation.",
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/20/17/icon-350226_640.png",
  },
  {
    name: "Daniel Green",
    email: "danielgreen@example.com",
    religion: "Christian",
    dob: "1993-11-02",
    education: "Haifa University",
    experience: "4 years in software development",
    profession: ["Front-End Development", "UI/UX Design"],
    bio: "Frontend developer specializing in creating responsive and engaging user interfaces.",
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/20/17/icon-350226_640.png",
  },
  {
    name: "Fatima Zayed",
    email: "fatimazayed@example.com",
    religion: "Muslim",
    dob: "1997-04-30",
    education: "Ariel University",
    experience: "3 years in healthcare",
    profession: ["Mobile Development", "Digital Marketing"],
    bio: "Health care professional turned mobile developer with a passion for innovation.",
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/20/17/icon-350226_640.png",
  },
  {
    name: "Yosef Gold",
    email: "yosefgold@example.com",
    religion: "Jewish",
    dob: "1980-01-05",
    education: "Bar-Ilan University",
    experience: "15 years in finance",
    profession: ["Data Analysis", "Full-Stack Development"],
    bio: "Finance expert exploring the world of data science and full-stack development.",
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/20/17/icon-350226_640.png",
  },
  {
    name: "Maya Shafir",
    email: "mayashafir@example.com",
    religion: "Christian",
    dob: "1991-06-25",
    education: "Tel Aviv University",
    experience: "6 years in design",
    profession: ["Basic Programming", "Graphic Design"],
    bio: "Designer with a passion for creating aesthetically pleasing and functional designs.",
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/20/17/icon-350226_640.png",
  },
  {
    name: "Michael Brown",
    email: "michaelbrown@example.com",
    religion: "Jewish",
    dob: "1987-08-22",
    education: "Technion",
    experience: "4 years in full-stack development",
    profession: ["Full-Stack Development", "UI/UX Design"],
    bio: "Full-stack developer with a love for both front-end and back-end technologies.",
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/20/17/icon-350226_640.png",
  },
  {
    name: "Emily Davis",
    email: "emilydavis@example.com",
    religion: "Christian",
    dob: "1995-12-30",
    education: "Hebrew University",
    experience: "5 years in front-end development",
    profession: ["Front-End Development", "Video Editing"],
    bio: "Frontend developer with a strong background in multimedia content.",
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/20/17/icon-350226_640.png",
  },
  {
    name: "Robert Johnson",
    email: "robertjohnson@example.com",
    religion: "Christian",
    dob: "1989-03-15",
    education: "Tel Aviv University",
    experience: "8 years in back-end development",
    profession: ["Back-End Development", "Data Analysis"],
    bio: "Backend developer focused on building efficient and scalable backend systems.",
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/20/17/icon-350226_640.png",
  },
  {
    name: "Olivia Martinez",
    email: "oliviamartinez@example.com",
    religion: "Muslim",
    dob: "1994-02-18",
    education: "Ariel University",
    experience: "6 years in mobile development",
    profession: ["Mobile Development", "Graphic Design"],
    bio: "Mobile app developer and graphic designer with a creative mindset.",
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/20/17/icon-350226_640.png",
  },
  {
    name: "David Wilson",
    email: "davidwilson@example.com",
    religion: "Jewish",
    dob: "1984-09-10",
    education: "Haifa University",
    experience: "7 years in data analysis",
    profession: ["Data Analysis", "UI/UX Design"],
    bio: "Data analyst with a keen eye for detail and a passion for designing user-friendly interfaces.",
    imgUrl:
      "https://cdn.pixabay.com/photo/2014/05/21/20/17/icon-350226_640.png",
  },
];

const addTestUsers = async () => {
  const auth = getAuth(); // Initialize Firebase Auth

  try {
    const promises = sampleUsers.map(async (user, index) => {
      const userId = `testUser${index + 1}`;

      // Check if the email is already associated with any account in Firestore
      const userRef = doc(db, "users", user.email);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        console.log(`User with email ${user.email} already exists. Skipping.`);
        return;
      }

      // Create user account with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        "123123",
      );
      const uid = userCredential.user.uid;

      await updateProfile(userCredential.user, {
        displayName: user.name,
      });

      // Add user details to Firestore
      await setDoc(doc(db, "users", uid), {
        ...user,
        coins: 0,
      });

      console.log(`User ${userId} added successfully with authentication.`);
    });

    await Promise.all(promises);
    console.log("All test users added successfully with authentication!");
  } catch (error) {
    console.error("Error adding test users:", error);
  }
};

addTestUsers();
