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
        video.style.visibility = 'hidden' // Hide the video screen

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
        overlay.style.visibility = 'hidden' // Hide the video screen

        document.body.appendChild(overlay);

        var cl = webgazer.getTracker().clm;

        function drawLoop() {
            requestAnimFrame(drawLoop);
            overlay.getContext('2d').clearRect(0,0,width,height);
            if (cl.getCurrentPosition()) {
                cl.draw(overlay);
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
			game.load.image('donsky', 'assets/basket.png')
			game.load.image('ground', 'assets/square.png')
			game.load.image('donsky', 'assets/basket.png')
			game.load.image('apple', 'assets/apple.png')
			game.load.image('peach', 'assets/peach.gif')
			game.load.image('bad_apple', 'assets/bad_apple.png')
			game.load.image('start','assets/start.png');


		}

		var jarad;
		var ben;
		var nouri;
		var jack;
		var time;
		var donsky;
		var game_over;
		var apple;
		var score;
		var peach;
		var bad_apple;
		var text;
		var text2;

		function create() {
			this.game.scale.pageAlignHorizontally = true;
			this.game.scale.pageAlignVertically = true;
			this.game.scale.refresh();


		    game.physics.startSystem(Phaser.Physics.ARCADE);

		    //  Set the world (global) gravity
		    game.physics.arcade.gravity.y = 100;

		    background = game.add.tileSprite(0,0,800,600,'background')

		    time = 0;
		    level = 1;
		    donsky = game.add.sprite(game.world.centerX - 40, game.world.height - 20, 'donsky');
			donsky.scale.setTo(0.2, 0.2);
			game.physics.enable(donsky, Phaser.Physics.ARCADE);
			donsky.body.allowGravity = false
			donsky.body.collideWorldBounds = true;
			game_over = false;
			game.physics.arcade.enable(this);
			apples = game.add.group();
			bad_apples = game.add.group();
			score = 0;
			paused = true;

			button = game.add.button(game.world.centerX - 140, game.height / 2 - 55, 'start', actionOnClick, this, 2, 1, 0);
			button.scale.setTo(.25, .25);
			text = game.add.text(game.world.centerX + 20, game.world.height / 2 - 200, 'Game over.', { font: "25px Arial", align: "center" });
    		text.anchor.setTo(0.5, 0.5);
    		text2 = game.add.text(game.world.centerX + 20, game.world.height / 2 - 150 , 'Press start to play again.', { font: "25px Arial", align: "center" });
    		text2.anchor.setTo(0.5, 0.5);
    		text.visible = false
    		text2.visible = false




		}

		function actionOnClick() {
			console.log("heyyyy")
			paused = false;
			button.kill();
			game_over = false;
			score = 0;
			level = 1;
			time = 0;
			text.kill()
			text2.kill()

		}

		function render() {
			game.debug.text('Your score: ' + score, 10, 20);
			if(game_over == true) {
				text.visible = true
				text2.visible = true
				//text2 = game.debug.text('Press Start to play again.' + score, game.world.centerX - 125, game.world.height / 2 - 150);
				button.revive()
		    } 

		}

		function update() {
			if(!paused) {
				x_value = game.world.centerX + Math.random() * (350 + 350) - 350;
				if(!game_over) {
					if(time % Math.round(100 ) == 0) {
					    apple = game.add.sprite(x_value, -100, 'apple');
					    apple.scale.setTo(.1, .1);
					    game.physics.enable(apple, Phaser.Physics.ARCADE)
					    apple.enableBody = true;
		    			apple.physicsBodyType = Phaser.Physics.ARCADE;
						apple.body.checkCollision.down = true
						apples.add(apple)
						game.physics.arcade.collide(apple, donsky);
						game.physics.arcade.overlap(apple, donsky, collisionGoodHandler, null, this);

					} else if (time % Math.round(250) == 0) {
						apple = game.add.sprite(x_value, -100, 'peach');
					    apple.scale.setTo(.2, .2);
					    game.physics.enable(apple, Phaser.Physics.ARCADE)
					    apple.enableBody = true;
		    			apple.physicsBodyType = Phaser.Physics.ARCADE;
						apple.body.checkCollision.down = true
						apples.add(apple)
						game.physics.arcade.collide(apple, donsky);
						game.physics.arcade.overlap(apple, donsky, collisionGoodHandler, null, this);
					} else if (time % Math.round(150) == 0) {
						bad_apple = game.add.sprite(x_value, -100, 'bad_apple');
					    bad_apple.scale.setTo(.1, .1);
					    game.physics.enable(bad_apple, Phaser.Physics.ARCADE)
					    bad_apple.enableBody = true;
		    			bad_apple.physicsBodyType = Phaser.Physics.ARCADE;
						bad_apple.body.checkCollision.down = true
						bad_apple.body.velocity.y = -4
						bad_apples.add(bad_apple)
						game.physics.arcade.collide(bad_apple, donsky);
						game.physics.arcade.overlap(bad_apple, donsky, collisionGoodHandler, null, this);
					}
					game.physics.arcade.overlap(apples, donsky, collisionGoodHandler, null, this);
					game.physics.arcade.overlap(bad_apples, donsky, collisionBadHandler, null, this);
				}
				if (!game_over) {
					time++;
				}
				if (time % 200) {
					level += 3
				}

				 if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				 	donsky.body.velocity.x = -300;
				 }
				 else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				 	donsky.body.velocity.x = 300;
				 } else {
				 	donsky.body.velocity.x = 0;
				 }
				 // var prediction = webgazer.getCurrentPrediction();
				 // if (prediction) {
					//     var x = prediction.x;
					//     var y = prediction.y;
					//     if(x < 400) {
					//     	donsky.body.velocity.x = -300
					//     } else if (x > 800) {
					//     	donsky.body.velocity.x = 300
					//     } else {
					//     	donsky.body.velocity.x = 0
					//     }
					// }
				}
		}
		function collisionGoodHandler(obj, donsky) {
			if(!game_over){
				if(obj.height < game.world.height + 30) {
					donsky.kill()
					score++;
				}
			}
		}
		function collisionBadHandler(obj, donsky) {
			game_over = true;
			if(obj.height < game.world.height + 30) {
				donsky.kill()
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