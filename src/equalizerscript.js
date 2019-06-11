function start() {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = context.createAnalyser();
  
    var ctx = document.querySelector("canvas").getContext("2d");
  
    var numPoints = analyser.frequencyBinCount;
    var heightArray = new Uint8Array(numPoints);
  
    function render() {
      analyser.getByteFrequencyData(heightArray);
      var width = ctx.canvas.width;
      var height = ctx.canvas.height;
      ctx.clearRect(0, 0, width, height);
      for (var x = 0; x < width; x += 10) {
         var ndx = x * numPoints / width | 0;
         var vol = heightArray[ndx];
         var y = vol * height / 255;
         ctx.fillRect(x, y, 10, 10);
      }
  
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  
    // Make a audio node
    var audio = new Audio();
    audio.loop = true;
    audio.autoplay = true;
    audio.crossOrigin = "anonymous";
  
    audio.addEventListener('canplay', function() {
      try {
        var source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
      } catch (e) {
        log(e.toString());
      }
    });
    audio.addEventListener('error', function(e) {
      log(e.toString());
    });
    audio.src = "https://greggman.github.io/doodles/sounds/DOCTOR VOX - Level Up.mp3";
    audio.play();
  
    function log() {
      var elem = document.createElement("div");
      elem.textContent = Array.prototype.join.call(arguments, ' ');
      document.body.appendChild(elem);
    }
  }
  
  
  var clickElem = document.querySelector("button");
  console.log(clickElem)
  clickElem.addEventListener('click', function() {
    clickElem.style.display = 'none';
    start();
  });
  
