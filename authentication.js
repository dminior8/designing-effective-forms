// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA3KKS7nIvP8qcedLM1-xbrq7LLXidrkjw",
    authDomain: "tpf-pk-55c85.firebaseapp.com",
    projectId: "tpf-pk-55c85",
    storageBucket: "tpf-pk-55c85.firebasestorage.app",
    messagingSenderId: "54094609534",
    appId: "1:54094609534:web:cac11a52134f00ab35ec2f",
    measurementId: "G-HD6Q8Q18N5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);

        document.getElementById("firstName").value = user.displayName.split(" ")[0] || "";
        document.getElementById("lastName").value = user.displayName.split(" ")[1] || "";
        document.getElementById("exampleInputEmail1").value = user.email || "";
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}
onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You are authenticated with Google");
        console.log(user);
    }
});

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
