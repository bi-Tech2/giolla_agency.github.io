// Initialize EmailJS
emailjs.init("cGFGCFOuNXLaOaIXB");

// Handle form submission
document
  .getElementById("signUpForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect user information
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;

    // For security, don't send passwords via email
    // const password = document.getElementById("password").value;

    // Send the user's info to your email using EmailJS
    emailjs
      .send("service_4c9xitj", "template_gdpqzab", {
        to_email: "jodicksonjoshua@gmail.com", // You can replace this with a different email if needed
        firstname: firstname,
        lastname: lastname,
        email: email,
      })
      .then(function (response) {
        console.log("Email sent successfully!", response.status, response.text);

        // Show success message
        document.getElementById("signUpMessage").innerText =
          "Registration successful! Check your email for confirmation.";
        document.getElementById("signUpMessage").style.color = "green";
      })
      .catch(function (error) {
        console.error("Failed to send email.", error);

        // Show error message
        document.getElementById("signUpMessage").innerText =
          "An error occurred. Please try again.";
        document.getElementById("signUpMessage").style.color = "red";
      });

    // Optionally, handle Firebase or any other registration process here
    // e.g., registerUser(firstname, lastname, email, password);
  });

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
  }, 1000);
}

// Sign-up logic
document.getElementById("signUpForm").addEventListener("submit", (event) => {
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
          alert("Account creation successful! redirecting now....");
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          console.error("Firestore error:", error);
          alert("Error storing user data in Firestore");
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        alert("This email is already in use!");
      } else {
        alert("Email is already in use");
      }
    });
});

// Sign-in logic
document.getElementById("signInForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const emailI = document.getElementById("emailI").value;
  const passwordI = document.getElementById("passwordI").value;

  signInWithEmailAndPassword(auth, emailI, passwordI)
    .then((userCredential) => {
      alert("Login Successful! redirecting now....");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        alert("Account not found");
      } else if (errorCode === "auth/wrong-password") {
        alert("Incorrect password");
      } else {
        alert("Wrong Email or Password inputed");
      }
    });
});

const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    const parent = inp.parentElement;
    parent.classList.add("focus");
  });

  inp.addEventListener("blur", () => {
    if (inp.value === "") {
      const parent = inp.parentElement;
      parent.classList.remove("focus");
    }
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

let index = 1;
setInterval(() => {
  index++;
  if (index > images.length) {
    index = 1;
  }
  changeImage(index);
}, 1000);

function changeImage(index) {
  images.forEach((img) => {
    img.classList.remove("show");
  });
  images[index - 1].classList.add("show");
  updateBullets(index);
}

function updateBullets(index) {
  bullets.forEach((bullet) => {
    bullet.classList.remove("active");
  });
  bullets[index - 1].classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", () => {
    const value = bullet.getAttribute("data-value");
    changeImage(value);
    index = value;
  });
});
