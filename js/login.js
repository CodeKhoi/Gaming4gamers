//----------------------BELOW IS SIGN UP CODE ---------------------//
// var config = {
//   apiKey: "AIzaSyC3cedoQvjQ0WvLhfXRzWRVZO2P7dCX1zA",
//   authDomain: "proje-920bd.firebaseapp.com",
//   databaseURL: "https://proje-920bd.firebaseio.com",
//   projectId: "proje-920bd",
//   storageBucket: "proje-920bd.appspot.com",
//   messagingSenderId: "105509487976"
// };
var config = {
    apiKey: "AIzaSyC3cedoQvjQ0WvLhfXRzWRVZO2P7dCX1zA",
    authDomain: "proje-920bd.firebaseapp.com",
    databaseURL: "https://proje-920bd.firebaseio.com",
    projectId: "proje-920bd",
    storageBucket: "proje-920bd.appspot.com",
    messagingSenderId: "105509487976"
  };
firebase.initializeApp(config);

var database = firebase.database();
var databaseUserRef = database.ref('/users');
console.log(databaseUserRef);


$("#signUpSubmit").on("click", function (event) {
  // prevent form from trying to submit/refresh the page
  event.preventDefault();

  // Capture User Inputs and store them into variables
  var name = $("#signName").val().trim();
  var email = $("#signUpEmailAddress").val().trim();
  var uname = $("#username").val().trim();
  var pword = $("#signUpPassword").val().trim();
  var cpword = $("#confirmPassword").val().trim();
  console.log(email, name, pword);

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validate() {
    if (validateEmail(email)) {
      alert("email is valid :)");
      if (pword === cpword) {
        alert("password is valid :)");


        var newPerson = {
          name: name,
          email: email,
          uname: uname,
          pword: pword,
          cpword: cpword,

        };

        database.ref('users/' + newPerson.uname).set(newPerson);
        sessionStorage.clear();

        databaseUserRef.on('value', function (snapshot) {
          console.log(snapshot.val())
          // var snap = snapshot.val()
          // for (var key in snap) {
          //     console.log(key)
          //     if(snap[key] == sessionStorage.getItem("username")){
          //         console.log(snap[key])
          //     }
          // }
        });

        //
        // database.ref('/sessions/' + newPerson.uname).once('value').then(function(snapshot) {
        //   var username = (snapshot.val() && snapshot.val().uname) || 'Anonymous';
        //   console.log('User: ' + username)
        // });

        var uuid4 = UUIDjs.create();
        console.log('SessionId: ' + uuid4.toString());
        var sessionId = uuid4.toString();

        var databaseSessionRef = database.ref('/sessions/' + sessionId);
        var sessionDetail = {
          sessionId: sessionId,
          uname: uname,
          activeAt: firebase.database.ServerValue.TIMESTAMP
        };
        databaseSessionRef.set(sessionDetail);

        databaseSessionRef.on('value', function (snapshot) {
          console.log(snapshot.val())
          // var snap = snapshot.val()
          // for (var key in snap) {
          //     console.log(key)
          //     if(snap[key] == sessionStorage.getItem("username")){
          //         console.log(snap[key])
          //     }
          // }
        });

        // Store the username into localStorage using "localStorage.setItem"
        sessionStorage.setItem("sessionId", sessionId);
        sessionStorage.setItem("username", uname.toString());


        var databaseSessionRef = database.ref('/session');
        console.log(databaseSessionRef);

        window.location.href='../html/index.html' // this totaly works comment back in after done with testing

      } else {
        alert("password is NOT valid :)");
      }
    } else {
      alert("email is NOT valid :)");
    }
    return false;
  }

  validate();

});
/*
//----------------------BELOW IS SIGN IN CODE ---------------------//
$("#signInSubmit").on("click", function (event) {
  // prevent form from trying to submit/refresh the page
  event.preventDefault();

  // Capture User Inputs and store them into variables
  var unameSignIn = $("#signInUname").val().trim();
  var pwordSignIn = $("#confirmPword").val().trim();

  database.ref('/users/' + sessionDetail.uname).once('value').then(function (snapshot) {
    //stores the login user
    var user = snapshot.val()
    console.log(user, "this is our user")
    if(user.pword == pwordSignIn) {
      console.log("congrats you logged in");

      var uuid4 = UUIDjs.create();
      console.log('SessionId: ' + uuid4.toString());
      var sessionId = uuid4.toString();

      sessionStorage.clear();
      sessionStorage.setItem("sessionId", sessionId);
      sessionStorage.setItem("username", uname.toString());
    }
    else {
      window.location.href = '../html/index.html'
    }
  })


  });
  */
