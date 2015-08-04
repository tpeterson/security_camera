var RaspiCam = require("raspicam");
var Client = require('ftp');
var fs = require('fs');

function takePic() {
  // START PHOTO-TAKING PROCESS
  var photo_file = PHOTO_DESTINATION;
  var camera = new RaspiCam({mode: "photo", output: photo_file});

  camera.start();

  camera.on("exit", function() {
    console.log("Camera finished");
    camera.stop();
  });

  //listen for the "stop" event triggered when the stop method was called
  camera.on("stop", function(){
      console.log("Done");
      c.connect(connection_info);
  });
  
  // START FTP PROCESS
  var c = new Client();

  // ADD FTP CREDENTIALS
  var connection_info = {
    host: "",
    user: "",
    password: ""
  };

  c.on('ready', function() {
    c.put(PHOTO_DESTINATION, FTP_DESTINATION, function(err) {
      if (err) throw err;
      c.end();
    });
    console.log("Uploaded a picture");
  });
}
// take photo and upload to FTP once every 5 minutes
setInterval(takePic, 60000);
