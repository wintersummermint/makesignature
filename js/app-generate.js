$('.show-saves').hide();
$('.spinner').hide();
$('#imgURL').hide();


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
   $('#sigName, #fontFamily , #fontSize , .no-hex').on('keyup keypress blur change',function() {
      var ctx, fontSize, gc, sigFont, sigName;
      sigName = $('#sigName').val();
      if (sigName === "") {
        // alert("Please enter your name first.");
        // return false;
      }
      $('.hide-by-default').show();
      fontSize = $('#fontSize').val();
      sigFont = $('#fontFamily').val();
      signaturePad.clear();
      gc = document.getElementById("signatureCanvas");
      ctx = gc.getContext("2d");
      ctx.font = "" + fontSize + "px " + sigFont;
      ctx.fillText("" + sigName, 25, 60);
      return sigGenFlag = 1;
    });

    $('#generateButton').click(function() {
      var ctx, fontSize, gc, sigFont, sigName;
      sigName = $('#sigName').val();
      if (sigName === "") {
        // alert("Please enter your name first.");
        // return false;
      }
      $('.hide-by-default').show();
      fontSize = $('#fontSize').val();
      sigFont = $('#fontFamily').val();
      signaturePad.clear();
      gc = document.getElementById("signatureCanvas");
      ctx = gc.getContext("2d");
      ctx.font = "" + fontSize + "px " + sigFont;
      ctx.fillText("" + sigName, 25, 60);
      return sigGenFlag = 1;
    });

    $('#signatureGeneratorForm').submit(function(e) {
      e.preventDefault();
      return $('#generateButton').click();
    });
	
    /**
	 * This is the function that will take care of image extracting and
	 * setting proper filename for the download.
	 * IMPORTANT: Call it from within a onclick event.
	*/
	function downloadCanvas(link, canvasId, filename) {
		// link.href = document.getElementById(canvasId).toDataURL();

    sss = document.getElementById(canvasId);
    // link.download = sss;
    $('.spinner').fadeIn();
    $('.btn').attr('disabled', 'disabled');
    setTimeout(function(){
      $('#sigImg').removeAttr('class');
      $("#sigImg").attr('src', sss.toDataURL("image/png"));
      $('.show-saves').fadeIn(1000);
      $('.btn').removeAttr('disabled');
    }, 1500);
	}
	

  $('#imgCur').on('click', function(){
    $('#imgCur').attr('disabled', 'disabled');
    var $icon = $( this ).find( ".glyphicon.glyphicon-refresh" ),
          animateClass = "glyphicon-refresh-animate";

        $icon.addClass( animateClass );
        // setTimeout is to indicate some async operation
        window.setTimeout( function() {
          $icon.removeClass( animateClass );
           $('#imgCur').removeAttr('disabled');
        }, 2000 );

    try {
        var img = sss.toDataURL("image/png", 0.9).split(',')[1];
    } catch(e) {
        var img = sss.toDataURL().split(',')[1];
    }

    $.ajax({
        url: 'https://api.imgur.com/3/image',
        type: 'post',
        headers: {
            Authorization: 'Client-ID 0a182510c6a269e'
        },
        data: {
            image: img
        },
        dataType: 'json',
        success: function(response) {
            if(response.success) {
                // window.location = response.data.link;
                $('#imgURL').fadeIn("slow");
                $('#valURL').val(response.data.link);
            }
        }
    });
  });

   $('#saveLocal').on('click', function(){
    $('#imgCur').attr('disabled', 'disabled');
    var $icon = $( this ).find( ".glyphicon.glyphicon-refresh" ),
          animateClass = "glyphicon-refresh-animate";

        $icon.addClass( animateClass );
        // setTimeout is to indicate some async operation
        window.setTimeout( function() {
          $icon.removeClass( animateClass );
           $('#imgCur').removeAttr('disabled');
        }, 2000 );

    try {
        var img = sss.toDataURL("image/png", 0.9).split(',')[1];
    } catch(e) {
        var img = sss.toDataURL().split(',')[1];
    }

    $.ajax({
        url: 'https://api.imgur.com/3/image',
        type: 'post',
        headers: {
            Authorization: 'Client-ID 0a182510c6a269e'
        },
        data: {
            image: img
        },
        dataType: 'json',
        success: function(response) {
            if(response.success) {
                // window.location = response.data.link;
                var dow = response.data.link;
                var fname = "mySig";
                (function SaveToDisk(fileURL, fileName) {
                    // for non-IE
                    if (!window.ActiveXObject) {
                        var save = document.createElement('a');
                        save.href = fileURL;
                        save.target = '_blank';
                        save.download = fileName || 'unknown';

                        var event = document.createEvent('Event');
                        event.initEvent('click', true, true);
                        save.dispatchEvent(event);
                        (window.URL || window.webkitURL).revokeObjectURL(save.href);
                    }

                    // for IE
                    else if ( !! window.ActiveXObject && document.execCommand)     {
                        var _window = window.open(fileURL, '_blank');
                        _window.document.close();
                        _window.document.execCommand('SaveAs', true, fileName || fileURL)
                        _window.close();
                    }
                })(dow,fname);

            }
        }
    });
  });
  $('#makeAgain').on('click',function(){
    $('.canvas-wrapper').show();
    $('.hide-by-default').show();
    $('.show-saves').hide();
    $('.spinner').hide();
    $('#imgURL').hide();
    $('#sigImg').hide();
    $('#createImage').attr('src', '');
    signaturePad.clear();
  });


  /* save for email signature */
  $('#saveForEmail').on('click', function(){
    console.log('btn save for email clicked');
    $('#imgCur').attr('disabled', 'disabled');
    $('#saveLocal').attr('disabled', 'disabled');
    $('#saveForEmail').attr('disabled', 'disabled');
        // setTimeout is to indicate some async operation
        window.setTimeout( function() {
           $('#imgCur').removeAttr('disabled');
           $('#saveLocal').removeAttr('disabled');
           $('#saveForEmail').removeAttr('disabled');
        }, 3000 );
    $('.show-saves').hide();
    $('.spinner2').show();
    console.log('spinner 2 should show');
    try {
        var img = sss.toDataURL("image/png", 0.9).split(',')[1];
    } catch(e) {
        var img = sss.toDataURL().split(',')[1];
    }
    $.ajax({
        url: 'https://api.imgur.com/3/image',
        type: 'post',
        headers: {
            Authorization: 'Client-ID 0a182510c6a269e'
        },
        data: {
            image: img
        },
        dataType: 'json',
        success: function(response) {
            if(response.success) {
                // window.location = response.data.link;
                var dow = response.data.link;
                var fname = "mySig";
                localStorage["emailSignatureIMG"] = dow;
                localStorage["hasEmailSignatureIMG"] = true;
                window.location = 'email.html';
                (function SaveToDisk(fileURL, fileName) {
                    // for non-IE
                    if (!window.ActiveXObject) {
                        var save = document.createElement('a');
                        save.href = fileURL;
                        save.target = '_blank';
                        // save.download = fileName || 'unknown';

                        // var event = document.createEvent('Event');
                        // event.initEvent('click', true, true);
                        // save.dispatchEvent(event);
                        // (window.URL || window.webkitURL).revokeObjectURL(save.href);
                    }

                    // for IE
                    else if ( !! window.ActiveXObject && document.execCommand)     {
                        var _window = window.open(fileURL, '_blank');
                        _window.document.close();
                        _window.document.execCommand('SaveAs', true, fileName || fileURL)
                        _window.close();
                    }
                })(dow,fname);

            }
        },
        error: function(response){
          localStorage["emailSignatureIMG"] = 'images/spinner.gif';
        }
    });
  });



	/** 
	 * The event handler for the link's onclick event. We give THIS as a
	 * parameter (=the link element), ID of the canvas and a filename.
	*/
	document.getElementById('saveButton').addEventListener('click', function() {
    $('.canvas-wrapper').hide();
    $('.hide-by-default').hide();
    $('#sigImg').show();
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
	
    $(".pick-a-color").pickAColor({
      showSpectrum: false,
      showSavedColors: true,
      saveColorsPerElement: false,
      fadeMenuToggle: true,
      showHexInput: false,
      showBasicColors: true,
      allowBlank: false,
      inlineDropdown: true
    });
    $("#pen-color input").on("change", function() {
      var color;
      color = $(this).val();
      return signaturePad.penColor = hexToRgb(color);
    });
    $("select#penWidth").on("change", function() {
      var penWidth;
      penWidth = parseInt($(this).val());
      signaturePad.minWidth = penWidth - 0.5;
      return signaturePad.maxWidth = penWidth;
    });
    return hexToRgb = function(hex) {
      var result;
      result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (result) {
        return "rgb(" + parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16) + ")";
      } else {
        return null;
      }
    };
  });

}).call(this);
