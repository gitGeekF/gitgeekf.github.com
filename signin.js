document.getElementById("p1").value = "";
var pressedSignIn = false;


function signIn(){
    let e1 = document.getElementById("e1").value;
    let p1 = document.getElementById("p1").value;
    document.getElementById("p1").value = "";

    pressedSignIn = true;
    signOut();
    firebase.auth().signInWithEmailAndPassword(e1, p1).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Error:" + error.message);
        // ...
      });
      

    
}

function signUp(){
    location.replace("signup.html");
}

firebase.auth().onAuthStateChanged(function (user) {   
    if (user){
        finalSignIn();
        
        
    }else {
        
    }
  });

  function diagnozeError(e1, p1, p2){
    if (e1.length < 5){
      alert("Please enter a valid email.")
    }else if(p1.length < 8){
      alert("Please make sure that your password has at least 8 letters.");
    }else{
      alert("Please make sure that your passwords match.");
    }
    
  }
  
function forgotPassword(){
    location.replace("forgot.html");
}


function finalSignIn(){ 
    var user = firebase.auth().currentUser;     
        if (pressedSignIn && user != null){ 
            pressedSignIn = false; 
            
            var emailVerified = user.emailVerified;
            
            if (emailVerified == true){
                location.replace("index.html");
            }else if(emailVerified == false){
                alert("Please verify your email address.");
                
                
            }else{
                alert("Unexpected error occurred.");
                
            }
        }else{
            var emailVerified = user.emailVerified;
            if (emailVerified == true){
                location.replace("index.html");
            }
        }
}

function signOut(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
       // An error happened.
    });
}


