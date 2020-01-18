//import database.js;
function start() {
  //button toggle
  var x = document.getElementById("camera");
  var y = document.getElementById("text");
  if (x.style.display === "none" && y.style.display === "none") {
    x.style.display = "block";
    y.style.display = "block";
    document.getElementById("scan").value = "Turn Off Camera";
  } else {
    x.style.display = "none";
    y.style.display = "none";
    document.getElementById("scan").value = "Scan Now";
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
var barList = ["060383885830", "055653686002", "014100230243", "060410025604", "073141550017"];

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
