import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
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

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Sign-up logic
document.getElementById("signupBtn").addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstname: firstname,
        lastname: lastname,
      };

      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          showMessage("Account created successfully!", "signUpMessage");
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("Firestore error:", error);
          showMessage("Error storing user data in Firestore", "signUpMessage");
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        showMessage("This email is already in use!", "signUpMessage");
      } else {
        showMessage("Error during sign-up: " + error.message, "signUpMessage");
      }
    });
});

// Sign-in logic
document.getElementById("signInBtn").addEventListener("click", (event) => {
  event.preventDefault();
  
  const emailI = document.getElementById("emailI").value;
  const passwordI = document.getElementById("passwordI").value;

  signInWithEmailAndPassword(auth, emailI, passwordI)
    .then((userCredential) => {
      showMessage("Login Successful", "signInMessage");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        showMessage("Account not found", "signInMessage");
      } else if (errorCode === "auth/wrong-password") {
        showMessage("Incorrect password", "signInMessage");
      } else {
        showMessage("Error during sign-in: " + error.message, "signInMessage");
      }
    });
});
