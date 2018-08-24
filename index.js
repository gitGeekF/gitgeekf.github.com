var isSignedIn = false;
var elementsShownState = 0;

function login() {
  var emailText = document.getElementById("emailField").value;
  var passwordText = document.getElementById("passwordField").value;

  if (emailText.length < 5 || passwordText.length < 8 || isSignedIn) {
      if (elementsShownState == 2){
          logout()
      }else if (elementsShownState == 1){
        showElements(0);
      }else{
        diagnozeError(emailText,passwordText,passwordText);
      }
  }else{
    firebase.auth().signInWithEmailAndPassword(emailText, passwordText).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Error:" + error.message);
      
        // ...
      });
  }
  
}

function signUp(){
  var p1 = document.getElementById("secPasswordField").value;
  var p2 = document.getElementById("passwordField").value;
  var e1 = document.getElementById("emailField").value;

  if (elementsShownState == 0){
    //shows sign up screen
    showElements(1);
  }else{
    //checks for errors, if it's ok it continues
    if(p1 == p2 && p1.length >= 8 && e1.length >= 5 ){
      var error = null
      firebase.auth().createUserWithEmailAndPassword(e1, p1).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        error = error.message
        showElements(1);
        alert("Error: " + errorMessage);
      });
      if (error == null){
        showElements(0);
      }
    }else{
      showElements(1);
      diagnozeError(e1,p1,p2);  
    }
    
  }
  
}

function logout(){
    firebase.auth().signOut().then(function() {
        
      }).catch(function(error) {
        
      });
}


firebase.auth().onAuthStateChanged(function (user) {
  if (user){
    showElements(2);
    alert("Welcome Back");

  }else {
    showElements(0);
    
  }
});

function showElements(config){
  var btn1 = "signInBtn";
  var btn2 = "signUpBtn";
  var i1 = "emailField";
  var i2 = "passwordField";
  var i3 = "secPasswordField";
  
  document.getElementById(i2).value = "";
  document.getElementById(i3).value = "";

  elementsShownState = config;
  
  if (config == 0){
    document.getElementById(btn1).hidden = false;
    document.getElementById(btn2).hidden = false;
    document.getElementById(i1).hidden = false;
    document.getElementById(i2).hidden = false;
    document.getElementById(i3).hidden = true; 

    document.getElementById(btn1).textContent = "Sign in";
    document.getElementById(btn2).textContent = "Sign up here";

    isSignedIn = false;
  }else if (config == 1){
    document.getElementById(btn1).hidden = false;
    document.getElementById(btn2).hidden = false;
    document.getElementById(i1).hidden = false;
    document.getElementById(i2).hidden = false;
    document.getElementById(i3).hidden = false; 

    document.getElementById(btn1).textContent = "Cancel";
    document.getElementById(btn2).textContent = "Create my account";

    isSignedIn = false;
  }else {
    
    document.getElementById(btn1).hidden = false;
    document.getElementById(btn2).hidden = false; 
    document.getElementById(i1).hidden = true;
    document.getElementById(i2).hidden = true;
    document.getElementById(i3).hidden = true; 
    
    document.getElementById(btn1).textContent = "Sign out";
    document.getElementById(btn2).textContent = "Sign up here";
    
    isSignedIn = true;
  }
}

function diagnozeError(e1, p1, p2){
  if (e1.length < 5){
    alert("Please enter a valid email.")
  }else if(p1.length < 8){
    alert("Please make sure that your password has at least 8 letters.");
  }else{
    alert("Please make sure that your passwords match.");
  }
}
