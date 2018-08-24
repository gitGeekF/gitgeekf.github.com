document.getElementById("secPasswordField").hidden = true;
var isSignedIn = false;
function login() {
  var emailText = document.getElementById("emailField").value;
  var passwordText = document.getElementById("passwordField").value;
    
  alert(isSignedIn);
  if (emailText.length < 5 || passwordText.length < 8 || isSignedIn) {
      if (isSignedIn){
          logout()
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
  if (document.getElementById("secPasswordField").hidden == true){
    document.getElementById("secPasswordField").hidden = false;
    document.getElementById("singUpBtn").textContent = "Create my account";
    document.getElementById("singInBtn").textContent = "Cancel";
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
    document.getElementById("singInBtn").textContent = "Sign in";
    document.getElementById("singUpBtn").textContent = "Sign up here";
    document.getElementById("secPasswordField").value = "";
    document.getElementById("secPasswordField").hidden = true;
  }
  
}

function logout(){
    firebase.auth().signOut().then(function() {
        
      }).catch(function(error) {
        
      });
}



firebase.auth().onAuthStateChanged(function (user) {
  if (user){
    isSignedIn = true;
    document.getElementById("emailField").hidden = true;
    document.getElementById("passwordField").hidden = true;
    document.getElementById("signInBtn").textContent = "Sign out";
    document.getElementById("singUpBtn").hidden = true;
    alert("Welcome Back");
    
  }else {
    isSignedIn = false;
    document.getElementById("passwordField").value = "";
    document.getElementById("singInBtn").textContent = "Sign in";
    document.getElementById("emailField").hidden = false;
    document.getElementById("passwordField").hidden = false;
    document.getElementById("secPasswordField").hidden = false;
    document.getElementById("signUpBtn").hidden = false;
    
  }
});
