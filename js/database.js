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
//var ref = database.collection("score");

// var data = {
//     name: "testPerson1",
//     score: 50
// }

// ref.add(data);


//retrive data
var results = document.getElementById("databaseResults");

function renderScore(doc){
    let li = document.createElement('li');
    
    li.setAttribute('data-id', doc.id);
    li.textContent = "Barcode: " + doc.barcodeId + " Product name: " + doc.name + " Expiry Date: " + doc.expiryDate

    results.appendChild(li);
    //console.log("Name is", name.textContent, "Score is", score.textContent);
}

var docRef = database.collection("items");
docRef.get().then(function(querySnapshot){
    querySnapshot.forEach(doc => {
        console.log(doc.id, " => ", doc.data());
        renderScore(doc.data());
    })
});

// database.collection("score").get().then((onSnapshot) => {
//     onSnapshot.docs.forEach(doc => {
//         renderScore(doc);
//         //console.log(doc);
//     })
// });