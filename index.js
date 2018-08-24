document.getElementById("secPasswordField").hidden = true;
var isSignedIn = false;
var elementsShownState = 0;

function login() {
  var emailText = document.getElementById("emailField").value;
  var passwordText = document.getElementById("passwordField").value;
    
  alert(isSignedIn);
  if (emailText.length < 5 || passwordText.length < 8 || isSignedIn) {
      if (isSignedIn){
          logout()
      }else if (elementsShownState == 2){
        showElements(0);
      }else{
        alert("Please type the email and the password correctly.");
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
    showElements(2);
  }else{
    if(p1 == p2 && p1.length >= 8 && e1.length >= 5 ){
      firebase.auth().createUserWithEmailAndPassword(e1, p1).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("Error" + errorMessage);
      });
    }else{
      alert("Please make sure that your password is has at least 8 letters.");
    }
    showElements(0);
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

  }else {
    showElements(0);
    
  }
});

function showElements(config){

  document.getElementById("passwordField").value = "";
  document.getElementById("secPasswordField").value = "";

  elementsShownState = config;

  if (config == 0){
    document.getElementById("singInBtn").hidden = false;
    document.getElementById("emailField").hidden = false;
    document.getElementById("passwordField").hidden = false;
    document.getElementById("signUpBtn").hidden = false;
    document.getElementById("secPasswordField").hidden = true;

    document.getElementById("singInBtn").textContent = "Sign in";
    document.getElementById("singUpBtn").textContent = "Sign up here";

    isSignedIn = false;
  }else if (config == 1){
    document.getElementById("singInBtn").hidden = false;
    document.getElementById("emailField").hidden = false;
    document.getElementById("passwordField").hidden = false;
    document.getElementById("signUpBtn").hidden = false;
    document.getElementById("secPasswordField").hidden = false;

    document.getElementById("singInBtn").textContent = "Cancel";
    document.getElementById("singUpBtn").textContent = "Create my account";

    isSignedIn = false;
  }else {
    document.getElementById("singInBtn").hidden = false;
    document.getElementById("emailField").hidden = true;
    document.getElementById("passwordField").hidden = true;
    document.getElementById("signUpBtn").hidden = true;
    document.getElementById("secPasswordField").hidden = true;

    document.getElementById("signInBtn").textContent = "Sign out";
    document.getElementById("singUpBtn").textContent = "Sign up here";

    isSignedIn = true;
  }
}
