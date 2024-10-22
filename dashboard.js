<<<<<<< HEAD
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDof1osvm7sUifygPIqH_UyHdZLIRh-Kmo",
  authDomain: "giolla-974a3.firebaseapp.com",
  projectId: "giolla-974a3",
  storageBucket: "giolla-974a3.appspot.com",
  messagingSenderId: "665088692194",
  appId: "1:665088692194:web:dd1c57d4261cc5fe5973bb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Check if the user is authenticated
onAuthStateChanged(auth, (user) => {
  if (user) {
    const loggedInUserId = localStorage.getItem("loggedInUserId");

    if (loggedInUserId) {
      const docRef = doc(db, "users", loggedInUserId); // Ensure "users" is the correct collection name
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();

            // Display only initials (First letter of first name + first letter of last name)
            const firstInitial = userData.firstname.charAt(0).toUpperCase();
            const lastInitial = userData.lastname.charAt(0).toUpperCase();
            const initials = `${firstInitial}${lastInitial}`;

            document.getElementById("loggedUserFirstname").innerText = initials;
          }
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    }
  } else {
    // If no user is signed in, redirect to the register page
    window.location.href = "register.html";
  }
});

// Add click event listener to the ion-icon to toggle Sign Out button
document.getElementById("userIcon").addEventListener("click", () => {
  console.log("User icon clicked!"); // Debugging
  const signOutBtn = document.getElementById("signOutBtn");
  console.log("Current button display:", signOutBtn.style.display); // Debugging

  // Toggle display between "block" and "none"
  signOutBtn.style.display = signOutBtn.style.display === "none" || !signOutBtn.style.display ? "block" : "none";
  console.log("New button display:", signOutBtn.style.display); // Debugging
});

// Sign-out logic
document.getElementById("signOutBtn").addEventListener("click", (event) => {
  event.preventDefault();

  signOut(auth)
    .then(() => {
      console.log("User signed out successfully!"); // Debugging

      // Clear local storage and redirect to register
      localStorage.removeItem("loggedInUserId");
      window.location.href = "register.html";
    })
    .catch((error) => {
      console.error("Sign out error: ", error);
    });
});






// send("service_4c9xitj", "template_gdpqzab", {
// //   to_email: "giolla.world.wide@gmail.com",
// emailjs.init("cGFGCFOuNXLaOaIXB"); // Replace with your EmailJS user ID
=======
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDof1osvm7sUifygPIqH_UyHdZLIRh-Kmo",
  authDomain: "giolla-974a3.firebaseapp.com",
  projectId: "giolla-974a3",
  storageBucket: "giolla-974a3.appspot.com",
  messagingSenderId: "665088692194",
  appId: "1:665088692194:web:dd1c57d4261cc5fe5973bb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Check if the user is authenticated
onAuthStateChanged(auth, (user) => {
  if (user) {
    const loggedInUserId = localStorage.getItem("loggedInUserId");

    if (loggedInUserId) {
      const docRef = doc(db, "users", loggedInUserId); // Ensure "users" is the correct collection name
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();

            // Display only initials (First letter of first name + first letter of last name)
            const firstInitial = userData.firstname.charAt(0).toUpperCase();
            const lastInitial = userData.lastname.charAt(0).toUpperCase();
            const initials = `${firstInitial}${lastInitial}`;

            document.getElementById("loggedUserFirstname").innerText = initials;
          }
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    }
  } else {
    // If no user is signed in, redirect to the register page
    window.location.href = "register.html";
  }
});

// Add click event listener to the ion-icon to toggle Sign Out button
document.getElementById("userIcon").addEventListener("click", () => {
  console.log("User icon clicked!"); // Debugging
  const signOutBtn = document.getElementById("signOutBtn");
  console.log("Current button display:", signOutBtn.style.display); // Debugging

  // Toggle display between "block" and "none"
  signOutBtn.style.display = signOutBtn.style.display === "none" || !signOutBtn.style.display ? "block" : "none";
  console.log("New button display:", signOutBtn.style.display); // Debugging
});

// Sign-out logic
document.getElementById("signOutBtn").addEventListener("click", (event) => {
  event.preventDefault();

  signOut(auth)
    .then(() => {
      console.log("User signed out successfully!"); // Debugging

      // Clear local storage and redirect to register
      localStorage.removeItem("loggedInUserId");
      window.location.href = "register.html";
    })
    .catch((error) => {
      console.error("Sign out error: ", error);
    });
});






// send("service_4c9xitj", "template_gdpqzab", {
// //   to_email: "giolla.world.wide@gmail.com",
// emailjs.init("cGFGCFOuNXLaOaIXB"); // Replace with your EmailJS user ID
>>>>>>> 3ef907e (Deploy new version of Giolla Agency project)
