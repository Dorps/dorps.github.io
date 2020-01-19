//variables
let barcode = "";
let currentItems = [];
var databaseResults = document.getElementById("databaseResults");
var currentItemTag = document.getElementById("currentItemTag");

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

    var database = firebase.firestore();
    var results = document.getElementById("databaseResults");
    var res = document.getElementById("result");
    var found = document.getElementById("itemfound");
    
    database.collection("items").where("barcodeId", "==", barcode)
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            
            console.log("Name is: ", doc.data().name);
            found.textContent = "Item is: " + doc.data().name + " and it will expire in " + String(doc.data().expiryDate) + " days!";
            currentItems.push(doc.data().name + " " + doc.data().expiryDate);
            console.log(found.textContent);
            Quagga.stop();
        });
    }).catch(function(error){
        console.log("Error getting documents: ", error);
    });

    console.log("Barcode is: ", barcode);
}

function printCurrentItems(){
    console.log("Clicked to see items");
    for(let j = 0; j < currentItems.length; j++){
        console.log("Inside the loop");
        var li = document.createElement('li');
        li.textContent = currentItems[j];
        databaseResults.appendChild(li);
    }
}