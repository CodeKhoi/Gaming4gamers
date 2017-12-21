var sessionId = sessionStorage.getItem('sessionId');


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


// database.ref('/sessions/'+ sessionId).once('value').then(function(snapshot) {
// //   var username = (snapshot.val() && snapshot.val().uname) || 'Anonymous';
// console.log('sessions: id' + sessionId + ', sessions: ' + uname)
// // });
// sessionStorage.setItem("sessionId", sessionId);
// sessionStorage.setItem("username", uname.toString());

var databaseSessionRef = database.ref('/sessions/' + sessionId);

//grabs user info from local session format obj to send into firebase
var sessionDetail = {
  sessionId: sessionStorage.getItem("sessionId"),
  uname: sessionStorage.getItem("username"),
  activeAt: sessionStorage.getItem("loginAt")

};
console.log(sessionDetail)

//get user from database
database.ref('/sessions/' + sessionDetail.sessionId).once('value').then(function(snapshot) {
  //stores the login user
  var logedUser = (snapshot.val()) || 'Anonymous';

  if(logedUser != 'Anonymous'){
    console.log('THis is the username from the session database ', logedUser);
    console.log(logedUser)
    //get the time from firebase and covert it into local time
    var covertedTime = new Date(parseInt(logedUser.activeAt)).toLocaleString();
    //this si the converted time
    console.log(covertedTime)
    var start = new Date(parseInt(logedUser.activeAt));
    console.log(start)
    // the event to time goes here:
    var end = new Date();

    var elapsed = end - start;
    console.log(elapsed);
    if(elapsed > 3600000){
      sessionStorage.clear();
      database.ref.remove('/sessions/' + sessionDetail.sessionId);
      window.location.href='../html/login.html'

    } else {
      var updates = {};
      updates['/sessions/'+ sessionId + '/activeAt'] = firebase.database.ServerValue.TIMESTAMP;

      return database.ref().update(updates);
      $("#signInTab").text("Hi " + uname);

    }; // elapsed time in milliseconds
    // if(elapsed <)
  }


})


// var sessionInfo = getSessionFromFirebase('sessionId');
// //if(sessionInfo == NULL || sessionInfo.lastActiveDate < currentTime - SessionTimeout) then redirect to login page and clear local storage
// // else:

// log whatever user is doing
// update sessionInfo.lastActiveDate

//should be coming from form
// var pw = "password"

// database.ref('/users/' + sessionDetail.uname).once('value').then(function (snapshot) {
//   //stores the login user
//   var user = snapshot.val()
//   console.log(user, "this is our user")
//   if(user.pword == pw) {
//     console.log("congrats you logged in")
//   }
//   else {
//     window.location.href = '../html/index.html'
//   }
// })
