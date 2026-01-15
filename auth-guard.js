import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

/* 🔥 Firebase config */
const firebaseConfig = {
  apiKey: "AIzaSyAXfJgQ8P7D-sOuu2DNeA3O5mIEhw2i1xs",
  authDomain: "claycare-bfb6b.firebaseapp.com",
  projectId: "claycare-bfb6b",
  storageBucket: "claycare-bfb6b.firebasestorage.app",
  messagingSenderId: "160759835778",
  appId: "1:160759835778:web:49231b58d003a4e807989b"
};

/* Init Firebase ONCE */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* Pages that DO NOT require login */
const publicPages = [
  "",
  "index.html",
  "login.html"
];

/* DOM elements (safe lookup) */
const loginBtn = document.getElementById("loginBtn");
const userBox = document.getElementById("userBox");
const userIcon = document.getElementById("userIcon");
const logoutBtn = document.getElementById("logoutBtn");
const warning = document.getElementById("loginWarning");

/* Auth guard */
onAuthStateChanged(auth, (user) => {
  const page = window.location.pathname.split("/").pop();

  if (!user && !publicPages.includes(page)) {
    // 🔒 Block all protected pages
    window.location.replace("login.html");
    return;
  }

  if (user) {
    // Logged in UI
    loginBtn && (loginBtn.style.display = "none");
    userBox && (userBox.style.display = "inline-block");
    warning && warning.classList.remove("show");
  } else {
    // Logged out UI
    loginBtn && (loginBtn.style.display = "inline-block");
    userBox && (userBox.style.display = "none");
    logoutBtn && (logoutBtn.style.display = "none");
    warning && warning.classList.add("show");
  }
});

/* Logout */
logoutBtn?.addEventListener("click", async () => {
  await signOut(auth);
  window.location.replace("login.html");
});

/* Toggle logout */
userIcon?.addEventListener("click", () => {
  if (!logoutBtn) return;
  logoutBtn.style.display =
    logoutBtn.style.display === "block" ? "none" : "block";
});
