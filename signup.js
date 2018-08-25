document.getElementById("e1").value = "";
document.getElementById("p1").value = "";
document.getElementById("p2").value = "";

var pressedSignUp = false;

function signUp(){
    var e1 = document.getElementById("e1").value;
    var p1 = document.getElementById("p1").value;
    var p2 = document.getElementById("p2").value;

    document.getElementById("p1").value = "";
    document.getElementById("p2").value = "";

    pressedSignUp = true;
    if(p1 == p2){
        firebase.auth().createUserWithEmailAndPassword(e1, p1).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert("Error: " + errorMessage);
            });
    }else{
        alert("Please make sure that your passwords match.")
    }
    
        
       
        
        
}

function cancel(){
    location.replace("index.html");
}

firebase.auth().onAuthStateChanged(function (user) {
    if (pressedSignUp){
        pressedSignUp = false;
        user.sendEmailVerification().then(function() {
            // Email sent.
            alert("We sent an email to verify your account's email. If you cannot find it please check your spam folder. ");
            
            location.replace("index.html");
              
        }).catch(function(error) {
            // An error happened.
        }); 
    }
    if (user){
        
        
        
    }else {
        
    }
  });

  function diagnozeError(e1, p1, p2){
    var error = null;
    if (e1.length < 5){
        error = "Please enter a valid email.";
    }else if(p1.length < 6){
        error = "Please make sure that your password has at least 8 letters.";
    } else{
        error = "Please make sure that your passwords match.";
    }
    document.getElementById("lbl1").value = error;
  }

function signOut(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
       // An error happened.
    });
}
  
