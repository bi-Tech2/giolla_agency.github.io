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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to display user data
const displayUserData = (userData) => {
  const firstInitial = userData.firstname.charAt(0).toUpperCase();
  const lastInitial = userData.lastname.charAt(0).toUpperCase();
  const initials = `${firstInitial}${lastInitial}`;
  
  // Display user's initials
  document.getElementById("loggedUserFirstname").innerText = initials;

  // Display "Hello [firstname]" in the greeting
  document.getElementById("userGreeting").innerText = `Hello, ${userData.firstname}`;
  
  // Add the last name and email to the HTML
  document.getElementById("userFirstNameId").innerText = userData.firstname; // First Name
  document.getElementById("userLastNameId").innerText = userData.lastname; // Last Name
  document.getElementById("userEmailId").innerText = userData.email; // Email
};

// Check if the user is authenticated
onAuthStateChanged(auth, (user) => {
  if (user) {
    const loggedInUserId = localStorage.getItem("loggedInUserId");

    if (loggedInUserId) {
      const docRef = doc(db, "users", loggedInUserId);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            displayUserData(userData);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    }
  } else {
    // If no user is signed in, check local storage for user data
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      displayUserData(storedUserData); // Display user data if available
    } else {
      // Redirect to the register page if no data is found
      window.location.href = "register.html";
    }
  }
});

// Add click event listener to the ion-icon to toggle Sign Out button
document.getElementById("userIcon").addEventListener("click", () => {
  const signOutBtn = document.getElementById("signOutBtn");
  
  // Toggle display between "block" and "none"
  signOutBtn.style.display = signOutBtn.style.display === "none" || !signOutBtn.style.display ? "block" : "none";
});

// Sign-out logic
document.getElementById("signOutBtn").addEventListener("click", (event) => {
  event.preventDefault();
  
  // Ask the user for confirmation before signing out
  const confirmSignOut = confirm("Are you sure you want to sign out? You will need to log in again.");
  if (confirmSignOut) {
    signOut(auth)
      .then(() => {
        // Clear local storage and redirect to register
        localStorage.removeItem("loggedInUserId");
        window.location.href = "register.html";
      })
      .catch((error) => {
        console.error("Sign out error: ", error);
      });
  }
});

const imageUpload = document.getElementById("imageUpload");
const placeholderIcon = document.getElementById("placeholderIcon");

// Function to display the uploaded or stored image
function displayImage(imageSrc) {
    let uploadedImg = document.createElement("img");
    uploadedImg.src = imageSrc;
    uploadedImg.style.width = "100%";
    uploadedImg.style.height = "100%";
    uploadedImg.style.objectFit = "cover";
    placeholderIcon.replaceWith(uploadedImg); // Replace Ionicon with the image
}

// Check if there's an image stored in localStorage when the page loads
window.addEventListener("load", function() {
    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage) {
        displayImage(storedImage); // Display the stored image
    }
});

// Handle image upload
imageUpload.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageSrc = e.target.result;

            // Store the uploaded image in localStorage
            localStorage.setItem("uploadedImage", imageSrc);

            // Display the uploaded image
            displayImage(imageSrc);
        };
        reader.readAsDataURL(file); // Read the uploaded file
    }
});
