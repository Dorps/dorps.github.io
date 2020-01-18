//import database.js;
function start() {
  //button toggle
  var x = document.getElementById("camera");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("scan").value = "Turn Off Camera";
  } else {
    x.style.display = "none";
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
        readers: ["ean_reader"]
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

  Quagga.onDetected(function(data) {
    console.log(data.codeResult.code);
    document.querySelector("#result").innerText = data.codeResult.code;
    var barcode = data.codeResult.code;
    //var barList = []
  });
}
