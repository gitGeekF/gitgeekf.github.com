function resetPassword(){
    var emailAddress = document.getElementById("e1").value;
    firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
        alert("A 'Reset password' email has been sent to your email address successfully.");
        location.replace("signin.html")
      }).catch(function(error) {
        alert(error.message);
      });
      
}