window.onload = function() {
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
         //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
         //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

    var width = 320;
    var height = 240;
    var topDist = '300px';
    var leftDist = '650px';
    
    var setup = function() {
        var video = document.getElementById('webgazerVideoFeed');
        video.style.display = 'block';
        video.style.position = 'absolute';
        video.style.top = topDist;
        video.style.left = leftDist;
        video.width = width;
        video.height = height;
        video.style.margin = '0px';

        webgazer.params.imgWidth = width;
        webgazer.params.imgHeight = height;

        var overlay = document.createElement('canvas');
        overlay.id = 'overlay';
        overlay.style.position = 'absolute';
        overlay.width = width;
        overlay.height = height;
        overlay.style.top = topDist;
        overlay.style.left = leftDist;
        overlay.style.margin = '0px';

        document.body.appendChild(overlay);

        var cl = webgazer.getTracker().clm;

        function drawLoop() {
            requestAnimFrame(drawLoop);
            overlay.getContext('2d').clearRect(0,0,width,height);
            if (cl.getCurrentPosition()) {
                cl.draw(overlay);
            }




            document.getElementById("testButton").onclick = function(event) { 
            	var prediction = webgazer.getCurrentPrediction();
				if (prediction) {
				    var x = prediction.x;
				    var y = prediction.y;
				    console.log("X is " + x)
				    console.log("Y is " + y)
				}


            }
            document.getElementById("testButton2").onclick = function(event) { 
            	var prediction = webgazer.getCurrentPrediction();
				if (prediction) {
				    var x = prediction.x;
				    var y = prediction.y;
				    console.log("X is " + x)
				    console.log("Y is " + y)
				}


            }

        }
        drawLoop();

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

		function preload() {
		}

		function create(){
			 // now the rocks
			 rocks = game.add.group();
		     rocks.enableBody = true;
		}
		function update(){
			 
			game.physics.arcade.collide(player, platforms);
		    game.physics.arcade.collide(rocks, platforms);
			game.physics.arcade.collide(player, rocks);
		    game.physics.arcade.collide(rocks, rocks);
			
			j++;
		    if (j === update_interval)
		    {	fallingrocks(1);
		        update_interval = Math.floor(Math.random() * 20) * 60; // 0 - 20sec @ 60fps
		        j = 0;
		}
		function fallingrocks(i){
		     
			 if (i==1){
			  rock = rocks.create(Math.floor(Math.random() * 45), 0, 'rock1');
		     rock.body.gravity.y = 200;
			 rock.body.bounce.y = 0.4;} else if (i==2)
				 {	  rock = rocks.create(Math.floor(Math.random() * 45), 0, 'rock2');
					rock.body.gravity.y = 150;
					rock.body.bounce.y = 0.3;} else if (i==3)
						{	 rock = rocks.create(Math.floor(Math.random() * 45), 0, 'rock3');
							rock.body.gravity.y = 100;
							rock.body.bounce.y = 0.2;}else 
							{	  rock = rocks.create(Math.floor(Math.random() * 45), 0, 'rock4');
								rock.body.gravity.y = 50;
								rock.body.bounce.y = 0.1;
							}
							rock.body.immovable = true;
							rock.body.collideWorldBounds = true;
							
		}
		

    };

    function checkIfReady() {
        if (webgazer.isReady()) {
            setup();
        } else {
            setTimeout(checkIfReady, 100);
        }
    }
    setTimeout(checkIfReady,100);
};




window.onbeforeunload = function() {
    //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    window.localStorage.clear(); //Comment out if you want to save data across different sessions 
}