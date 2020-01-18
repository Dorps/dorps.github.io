//Pre-written code by firebase
//################################################
var firebaseConfig = {
    apiKey: "AIzaSyD49vcZv3vN6EfKbbIGMBmW0iQIMbuGsZk",
    authDomain: "uhack7.firebaseapp.com",
    databaseURL: "https://uhack7.firebaseio.com",
    projectId: "uhack7",
    storageBucket: "uhack7.appspot.com",
    messagingSenderId: "532338834871",
    appId: "1:532338834871:web:81e16defcce9ca1ed37c32"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//###################################################

var database = firebase.firestore();
var ref = database.collection("score");

var data = {
    name: "testPerson1",
    score: 50
}

ref.add(data);


//retrive data ??? not working
const results = document.querySelector('#databaseResults');

function renderScore(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let score = document.createElement('span');
    
    li.setAttribute('data-id', doc.id);
    console.log("Log this:",doc.score);
    name.textContext = doc.data().name;
    score.textContext = doc.data().score;

    li.appendChild(name);
    li.appendChild(score);

    results.appendChild(li);
    //console.log("Name is", name.textContent, "Score is", score.textContent);
}

// var docRef = database.collection("score").doc();
// docRef.get().then(function(doc){
//     console.log("Doc data:", doc.get("name"));
//     renderScore(doc);
// });

database.collection("score").get().then((onSnapshot) => {
    onSnapshot.docs.forEach(doc => {
        renderScore(doc);
        //console.log(doc);
    })
});