
  firebase.auth().onAuthStateChanged(function (user) {
    if (user){
      var emailVerified = user.emailVerified;
      if (emailVerified == false){
        location.replace("signin.html");
      }

    }else {
      location.replace("signin.html");
      
    }
  });

  function signOut(){
    
    firebase.auth().signOut().then(function() {
        
    }).catch(function(error) {
      
    });
  }