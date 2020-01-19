let barcode = "";
let currentItems = [];
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

        target: document.querySelector("#camera")
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
var barList = ["060383885830", "055653686002", "014100230243", "060410025604", "073141550017"];


Quagga.onDetected(function (data) {
    console.log(data.codeResult.code);
    document.querySelector('#result').innerText = data.codeResult.code;
    for(let i = 0; i < barList.length; i++){
        console.log("Boolean is: ", String(data.codeResult.code) == barList[i])
        if(String(data.codeResult.code) == barList[i]){
            result.textContent = data.codeResult.code;
            barcode = data.codeResult.code;
            console.log(barcode);
            database(String(barcode));
            break;
        }
    }

});

}

//########## End of Start() ######################

//Configure Firebase
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
function database(barcode){
    var scanButton = document.getElementById("scan");
    //scanButton.addEventListener("click", openCamera);

    var database = firebase.firestore();
    //var ref = database.collection("score");
    var results = document.getElementById("databaseResults");
    var res = document.getElementById("result");
    var found = document.getElementById("itemfound");
    
    database.collection("items").where("barcodeId", "==", barcode)
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            
            console.log("Name is: ", doc.data().name);
            found.textContent = "Item is: " + doc.data().name + " and it will expire in " + String(doc.data().expiryDate) + " days!";
            console.log(found.textContent);
            Quagga.stop();
        //         found.textContent = "Item is: ", doc.data().name;
        //         Quagga.stop();
        });
    }).catch(function(error){
        console.log("Error getting documents: ", error);
    });
    //retrive data


    // function renderScore(doc) {
    // let li = document.createElement("li");

    // li.setAttribute("data-id", doc.id);
    // li.textContent =
    //     "Barcode: " +
    //     doc.barcodeId +
    //     " Product name: " +
    //     doc.name +
    //     " Expiry Date: " +
    //     doc.expiryDate;

    // results.appendChild(li);
    // //console.log("Name is", name.textContent, "Score is", score.textContent);
    // }

    var breton = database.collection("items").doc("breton");
    var lays = database.collection("items").doc("lays");
    //var babyCarrot = database.collection("items").doc("babyCarrot");
    var goldfish = database.collection("items").doc("goldfish");
    var pocky = database.collection("items").doc("pocky");

    console.log("Barcode is: ", barcode);





    // switch(barcode){
    //     case ("055653686002"):
    //         console.log("Breton");
    //         found.textContent = "Item is: Breton";
    //         Quagga.stop();
    //         break;
    //     case ("014100230243"):
    //         console.log("Gold Fish");
    //         found.textContent = "Item is: Gold Fish";
    //         Quagga.stop();
    //         break;
    //     case ("060383885830"):
    //         console.log("Baby Carrot");
    //         found.textContent = "Item is: Baby Carrot";
    //         Quagga.stop();
    //         break;
    //     case("073141550017"):
    //         console.log("Pocky");
    //         found.textContent = "Item is: Pocky";
    //         Quagga.stop();
    //         break;
    //     case("060410025604"):
    //         console.log("Lays");
    //         found.textContent = "Item is: Lays";
    //         Quagga.stop();
    //         break;
    //     }


    // var docRef = database.collection("items");
    // docRef.get().then(function(querySnapshots){
    //     querySnapshots.forEach(doc => {

    //         console.log(doc.id, " => ", doc.data());
    //         compare(doc.data());
    //     })
    // });

    // var docRef = database.collection("items");
    // docRef.get().then(function(querySnapshot) {
    //   querySnapshot.forEach(doc => {
    //     console.log(doc.id, " => ", doc.data());
    //     renderScore(doc.data());
    //   });
// });

}

// database.collection("items").where("barcodeId", "==", 55653686002)
//     .get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());
//             console.log("name is", doc.data().name);
//         });
//     })
//     .catch(function(error) {
//         console.log("Error getting documents: ", error);
//     });

//function itemfind(barcode){
 //   var docItems = database.collections("items")
//}
// database.collection("score").get().then((onSnapshot) => {
//     onSnapshot.docs.forEach(doc => {
//         renderScore(doc);
//         //console.log(doc);
//     })
// });

// console.log("Real barcode is: ", barcode);
// //console.log("Barcode is: ", res.textContent);
// function compare(doc){
//     //var isFound = false;
//     if(barcode == String(doc.barcodeId)){
//         found.textContent = doc.name;
//         console.log("Doc name is: ", doc.name);
//         //isFound = true;
//         //found.textContent = isFound;
//     }
// } 

//########## DONT DELETE ##################
// var docRef = database.collection("items");
// docRef.get().then(function(querySnapshot) {
//   querySnapshot.forEach(doc => {
//     console.log(doc.id, " => ", doc.data());
//     renderScore(doc.data());
//   });
// });
