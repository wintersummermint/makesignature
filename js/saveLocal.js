
(function() {
  var sss = '';
  $(document).ready(function() {
    var canvas, hexToRgb, sigGenFlag, signatureNo, signaturePad;
    signatureNo = 0;
    canvas = document.querySelector("canvas");
    signaturePad = new SignaturePad(canvas, {
      minWidth: 0.6,
      maxWidth: 2,
      penColor: "rgb(0, 0, 0)"
    });
    sigGenFlag = 0;
    $('#clearButton').click(function() {
      signaturePad.clear();
      return sigGenFlag = 0;
    });
	
	sigGenFlag = 0;
   
	
    /**
	 * This is the function that will take care of image extracting and
	 * setting proper filename for the download.
	 * IMPORTANT: Call it from within a onclick event.
	*/
	function downloadCanvas(link, canvasId, filename) {
		// link.href = document.getElementById(canvasId).toDataURL();
    sss = document.getElementById(canvasId);
    link.download = sss;
    // $('.spinner').fadeIn();
    // $('.btn').attr('disabled', 'disabled');
    // setTimeout(function(){
    //   $('#sigImg').removeAttr('class');
    //   $("#sigImg").attr('src', sss.toDataURL("image/png"));
    //   $('.show-saves').fadeIn(1000);
    //   $('.btn').removeAttr('disabled');
    // }, 1500);
	}
	


	/** 
	 * The event handler for the link's onclick event. We give THIS as a
	 * parameter (=the link element), ID of the canvas and a filename.
	*/
	document.getElementById('saveLocal').addEventListener('click', function() {
		function randomString(len, charSet) {
			charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			var randomString = '';
			for (var i = 0; i < len; i++) {
				var randomPoz = Math.floor(Math.random() * charSet.length);
				randomString += charSet.substring(randomPoz,randomPoz+1);
			}
			return randomString;
		}
		var randomValue = randomString(8);
		var rand = "" + 'abc' + ".png";
		downloadCanvas(this, 'signatureCanvas', rand);
	}, false);
	


  });

}).call(this);
