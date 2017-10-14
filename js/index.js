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
    var topDist = '0';
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
			game.load.image('donsky', 'assets/donsky.png')
		}

		var jarad;
		var ben;
		var nouri;
		var jack;
		var time;
		var donsky;
		var game_over;

		function create() {
this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();

		    game.stage.backgroundColor = '#2d2d2d';

		    game.physics.startSystem(Phaser.Physics.ARCADE);

		    //  Set the world (global) gravity
		    game.physics.arcade.gravity.y = 100;

		    background = game.add.tileSprite(0,0,800,600,'background')

		    time = 0;
		    level = 1;
		    donsky = game.add.sprite(game.world.centerX, game.world.height - 200, 'donsky');
			donsky.scale.setTo(0.2, 0.2);
			game.physics.enable(donsky, Phaser.Physics.ARCADE);
			donsky.body.allowGravity = false
			game_over = false;

		}

		function render() {

			if(game_over == true) {
				game.debug.text('Game over. Your score is: ' + time, game.world.centerX, game.world.height / 2);
		    }
		    // game.debug.text('local gravity', ben.x - 32, 64);
		    // game.debug.text('local / 2', nouri.x - 32, 64);
		    // game.debug.text('no gravity', jack.x - 32, 64);

		}

		function update() {
			x_value = game.world.centerX + Math.random() * (350 + 350) - 350;
			if(time % Math.round(150000 / level) == 0) {
			    jarad = game.add.sprite(x_value, -100, 'jarad');
			    jarad.scale.setTo(0.1, 0.1);
			    jarad.enableBody = true;
    			jarad.physicsBodyType = Phaser.Physics.ARCADE;
			}
			if(time % Math.round(400000 / level) == 0) {
			    jack = game.add.sprite(x_value, -100, 'jack');
			    jack.scale.setTo(0.1, 0.1);
			    jack.enableBody = true;
    			jack.physicsBodyType = Phaser.Physics.ARCADE;
			}
			if(time % Math.round(600000 / level) == 0) {
			    ben = game.add.sprite(x_value, -100, 'ben');
			    ben.scale.setTo(0.1, 0.1);
			    ben.enableBody = true;
    			ben.physicsBodyType = Phaser.Physics.ARCADE;
			}
			if(time % Math.round(1200000 / level) == 0) {
			    nouri = game.add.sprite(x_value, -100, 'nouri');
			    nouri.scale.setTo(0.1, 0.1);
			    nouri.enableBody = true;
    			nouri.physicsBodyType = Phaser.Physics.ARCADE;
			}			
			game.physics.enable( [ jarad, ben, nouri, jack ], Phaser.Physics.ARCADE);
			game.physics.arcade.overlap(jarad, donsky, collisionHandler, null, this);
			game.physics.arcade.overlap(nouri, donsky, collisionHandler, null, this);
			game.physics.arcade.overlap(ben, donsky, collisionHandler, null, this);
			game.physics.arcade.overlap(jack, donsky, collisionHandler, null, this);

			if (!game_over) {
				time++;
			}
			if (time % 200) {
				level += 3
			}

			 // if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			 // 	donsky.body.velocity.x = -300;
			 // }
			 // else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			 // 	donsky.body.velocity.x = 300;
			 // } else {
			 // 	donsky.body.velocity.x = 0;
			 // }
			 var prediction = webgazer.getCurrentPrediction();
			 if (prediction) {
				    var x = prediction.x;
				    var y = prediction.y;
				    if(x < 400) {
				    	donsky.body.velocity.x = -300
				    } else if (x > 800) {
				    	donsky.body.velocity.x = 300
				    } else {
				    	donsky.body.velocity.x = 0
				    }
				}
		}
		function collisionHandler(obj, donsky) {
			game_over = true
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