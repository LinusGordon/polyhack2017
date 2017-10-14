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

		var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

		function preload() {

		    game.load.image('background', 'assets/background.jpg');
		    game.load.image('jarad', 'assets/jarad.png');
			game.load.image('nouri', 'assets/nouri.png');
			game.load.image('jack', 'assets/jack.png');
			game.load.image('ben', 'assets/ben.png');
			game.load.image('donsky', 'assets/donsky.png')
			game.load.image('ground', 'assets/square.png')
		}

		var jarad;
		var ben;
		var nouri;
		var jack;
		var time;

		function create() {

		    game.stage.backgroundColor = '#2d2d2d';

		    game.physics.startSystem(Phaser.Physics.ARCADE);

		    //  Set the world (global) gravity
		    game.physics.arcade.gravity.y = 100;

		    //  Sprite 1 will use the World (global) gravity
		    // jarad = game.add.sprite(10, 10, 'jarad');
		    // jarad.scale.setTo(0.1, 0.1);

		    // //  Sprite 2 is set to ignore the global gravity and use its own value
		    // ben = game.add.sprite(10, 10, 'ben');
		    // ben.scale.setTo(0.1, 0.1);
		    // //  Sprite 3 will use both the world gravity and its own gravityScale modifier
		    // nouri = game.add.sprite(10, 10, 'nouri');
		    // nouri.scale.setTo(0.1, 0.1);
		    // //  Sprite 4 will ignore all gravity
		    // jack = game.add.sprite(10, 10, 'jack');
		    // jack.scale.setTo(0.1, 0.1);
		    // // Enable physics on those sprites
		    // game.physics.enable( [ jarad, ben, nouri, jack ], Phaser.Physics.ARCADE);

		    // jarad.body.collideWorldBounds = false;
		    // jarad.body.bounce.y = 0.8;
		    
		    // ben.body.collideWorldBounds = false;
		    // ben.body.bounce.y = 0.8;
		    // ben.body.gravity.y = 200;
		    
		    // nouri.body.collideWorldBounds = false;
		    // nouri.body.bounce.y = 0.8;
		    // nouri.body.gravity.y = 50;

		    // jack.body.gravity.y = 200;
		    time = 0;
		    level = 1;
		}

		function render() {

		    // game.debug.text('world gravity', jarad.x - 32, 64);
		    // game.debug.text('local gravity', ben.x - 32, 64);
		    // game.debug.text('local / 2', nouri.x - 32, 64);
		    // game.debug.text('no gravity', jack.x - 32, 64);

		}

		function update() {
			x_value = game.world.centerX + Math.random() * (350 + 350) - 350;
			if(time % Math.round(150000 / level) == 0) {
			    jarad = game.add.sprite(x_value, -100, 'jarad');
			    jarad.scale.setTo(0.1, 0.1);
			}
			if(time % Math.round(400000 / level) == 0) {
			    jack = game.add.sprite(x_value, -100, 'jack');
			    jack.scale.setTo(0.1, 0.1);
			}
			if(time % Math.round(600000 / level) == 0) {
			    ben = game.add.sprite(x_value, -100, 'ben');
			    ben.scale.setTo(0.1, 0.1);
			}
			if(time % Math.round(1200000 / level) == 0) {
			    nouri = game.add.sprite(x_value, -100, 'nouri');
			    nouri.scale.setTo(0.1, 0.1);
			}			
			game.physics.enable( [ jarad, ben, nouri, jack ], Phaser.Physics.ARCADE);
			time++;

			if (time % 200) {
				level += 3
			}
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