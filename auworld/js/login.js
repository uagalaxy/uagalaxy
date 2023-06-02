  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBr2Ld829X4fDpbTi-GKYFZVquPt5WklJ4",
  authDomain: "auworld.firebaseapp.com",
  databaseURL: "https://auworld-default-rtdb.firebaseio.com",
  projectId: "auworld",
  storageBucket: "auworld.appspot.com",
  messagingSenderId: "173892554240",
  appId: "1:173892554240:web:8aac5a987bae9c2e3a12e5",
  measurementId: "G-W0VYSQ7VL2"  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

document.querySelector(".signin form").addEventListener("submit",(event)=>{
    event.preventDefault()
})
document.querySelector(".signup form").addEventListener("submit",(event)=>{
    event.preventDefault();
    document.getElementById("error").innerHTML = "sign up like no one watching";
    document.querySelector(".error h2").innerHTML = "<div class='circle-loader'></div>";
    document.querySelector(".error").style.display = "flex";
    checkInputsignup();
})

function checkInputsignup() {

const username = document.getElementById('upname');
const email = document.getElementById('upemail');
const password = document.getElementById('uppassword');
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
        
	} else {
	}
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
	}
	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
	} else {
	}
	
}
function setErrorFor(i,message){
    document.querySelector(".error h2").innerHTML = "ERROR";
    document.getElementById("error").innerHTML = message;
    document.querySelector(".error").style.display = "flex";
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}



//fffffffffffffffffffffffffffffffff

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        location.replace("app.html")
    }
})
function login(){
    const email = document.getElementById("inemail").value
    const password = document.getElementById("inpassword").value
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error)=>{
        document.getElementById("error").innerHTML = error.message
        document.querySelector(".error").style.display = "flex"
    })
}

function signUp(){
    const email = document.getElementById("upemail").value
    const password = document.getElementById("uppassword").value
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error)=>{
        document.getElementById("error").innerHTML = error.message
        document.querySelector(".error").style.display = "flex"
    })
}

function signUp() {
  const email = document.getElementById("upemail").value;
  const password = document.getElementById("uppassword").value;
  const displayName = document.getElementById("upname").value;
  const photoURL = document.getElementById("profilelink").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      user.updateProfile({
        displayName,
        photoURL
      });
    })
    .catch((error)=>{
        document.getElementById("error").innerHTML = error.message
        document.querySelector(".error").style.display = "flex"
    })
};


function forgotPass(){
    const email = document.getElementById("inemail").value
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        alert("Reset link sent to your email id")
    })
    .catch((error)=>{
        document.getElementById("error").innerHTML = error.message
        document.querySelector(".error").style.display = "flex"
    })
}
function logout(){
    firebase.auth().signOut()
}
