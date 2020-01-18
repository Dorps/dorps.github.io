//import database.js;
function start() {
  //button toggle
  var x = document.getElementById("camera");
  var y = document.getElementById("text");
  if (x.style.display === "none" && y.style.display === "none") {
    x.style.display = "block";
    y.style.display = "block";
    document.getElementById("scan").value = "Scan Again";
  } else {
    x.style.display = "none";
    y.style.display = "none";
    document.getElementById("scan").value = "Scan Product";
  }

  //start of camera code
  Quagga.init(
    {
      inputStream: {
        name: "Live",
        type: "LiveStream",

        target: document.querySelector("#camera") // Or '#yourElement' (optional)
      },
      decoder: {
        readers: ["upc_reader"]

        /* reader options:
            "code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader",
            "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader",
            "2of5_reader", "code_93_reader"
            */
      }
    },
    function(err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    }
  );

  var result = document.getElementById("result");
  var barList = [
    "60383885830",
    "055653686002",
    "1410023024",
    "60410025604",
    "73141550017"
  ];

var result = document.getElementById("result");
var barList = ["060383885830", "055653686002", "01410023024", "060410025604", "073141550017"];

Quagga.onDetected(function (data) {
    console.log(data.codeResult.code);
    document.querySelector('#result').innerText = data.codeResult.code;
    for(let i = 0; i < barList.length; i++){
        console.log("Boolean is: ", String(data.codeResult.code) == barList[i])
        if(String(data.codeResult.code) == barList[i]){
            result.textContent = data.codeResult.code;
            Quagga.stop();
            break;
        }
    }

});


  //Possible solution:
  /*
    use Quagga.stop() at the beginning of the .onDetected() check whether the result is right or not
    if yes just assign it to result.textContent if not call Quagga.stop() while isFound == false 
*/
}
//import {barcode} from './camera.js'

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

var scanButton = document.getElementById("scan");
//scanButton.addEventListener("click", openCamera);

var database = firebase.firestore();
//var ref = database.collection("score");

// var data = {
//     name: "testPerson1",
//     score: 50
// }

// ref.add(data);

//retrive data
var results = document.getElementById("databaseResults");
var res = document.getElementById("result");
var found = document.getElementById("itemfound");


function renderScore(doc) {
  let li = document.createElement("li");

  li.setAttribute("data-id", doc.id);
  li.textContent =
    "Barcode: " +
    doc.barcodeId +
    " Product name: " +
    doc.name +
    " Expiry Date: " +
    doc.expiryDate;

  results.appendChild(li);
  //console.log("Name is", name.textContent, "Score is", score.textContent);
}

var currentItems = [];
console.log("Barcode is: ", res.textContent);

function compare(doc){
    var isFound = false;
    if(res.textContent == String(doc.barcodeId)){
        Quagga.stop();
        currentItems.append(doc);
        isFound = true;
        found.textContent = isFound;
    }
    console.log(currentItems);
} 

var docRef = database.collection("items");
docRef.get().then(function(querySnapshots){
    querySnapshots.forEach(doc => {
        console.log(doc.id, " => ", doc.data());
        compare(doc.data());
    })
});

var docRef = database.collection("items");
docRef.get().then(function(querySnapshot) {
  querySnapshot.forEach(doc => {
    console.log(doc.id, " => ", doc.data());
    renderScore(doc.data());
  });
});

// database.collection("score").get().then((onSnapshot) => {
//     onSnapshot.docs.forEach(doc => {
//         renderScore(doc);
//         //console.log(doc);
//     })
// });
