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

            // Populate the HTML with user data
            document.getElementById("loggedUserFirstname").innerText = userData.firstname;
            document.getElementById("loggedUserLastname").innerText = userData.lastname;
            document.getElementById("loggedUserEmail").innerText = userData.email;
          }
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    }
  } else {
    // If no user is signed in, redirect to the login page
    window.location.href = "login.html";
  }
});

// Sign-out logic
document.getElementById("signOutBtn").addEventListener("click", (event) => {
  event.preventDefault();

  signOut(auth)
    .then(() => {
      // Clear local storage and redirect to login
      localStorage.removeItem("loggedInUserId");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Sign out error: ", error);
    });
});
