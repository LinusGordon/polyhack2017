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
			game.load.image('banner', 'assets/Banner.png')
			game.load.image('start_arrow_keys', 'assets/start_arrow_keys.png')
			//  The Google WebFont Loader will look for this object, so create it before loading the script.
			WebFontConfig = {

			    //  'active' means all requested fonts have finished loading
			    //  We set a 1 second delay before calling 'createText'.
			    //  For some reason if we don't the browser cannot render the text the first time it's created.
			    active: function() { game.time.events.add(Phaser.Timer.SECOND, startText, this); },

			    //  The Google Fonts we want to load (specify as many as you like in the array)
			    google: {
			      families: ['Gloria Hallelujah']
			    }

			};
    		game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

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
		var needs_setup;
		var arrow_keys;

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
			flash_apples = game.add.group();
			score = 0;
			paused = true;
			banner = game.add.sprite(-55, 50, 'banner')
			banner.scale.setTo(.6, .6)

			button = game.add.button(0, game.height / 2 + 160, 'start', actionOnClick, this, 2, 1, 0);
			button.scale.setTo(.3, .3);
			button2 = game.add.button(game.world.centerX + 30, game.height / 2 + 160, 'start_arrow_keys', actionOnClickArrowKeys, this, 2, 1, 0);
			button2.scale.setTo(.3, .3);
    		needs_setup = true;





		}

		function startText() {
			setup_text = game.add.text(game.world.centerX - 275, game.world.height / 2 - 30 , 'Before you press start, please follow the instructions below: \n \t 1) Look at the "Move Left" button while clicking it \n \t 2) Look at the "Move Right" button while clicking it \n \t 3) Repeat steps 1 and 2 a few times \n \t 4) Press start to begin', { font: "20px Gloria Hallelujah", fill: "#ffff99", align: "left" });
    		setup_text.font = "Gloria Hallelujah"
    		text = game.add.text(game.world.centerX - 350, game.world.height / 2 - 30, 'Game over. \n Press start to play again.', { font: "50px Gloria Hallelujah", fill: "#ffff99", align: "center" });
    		text.font = "Gloria Hallelujah"
    		text.visible = false
		}

		function actionOnClick() {
			paused = false;
			button.kill();
			button2.kill();
			game_over = false;
			score = 0;
			level = 1;
			time = 0;
			text.kill()
			setup_text.kill()
			banner.kill()
			arrow_keys = false;


		}
		function actionOnClickArrowKeys() {
			paused = false;
			button.kill();
			button2.kill();
			game_over = false;
			score = 0;
			level = 1;
			time = 0;
			text.kill()
			setup_text.kill()
			banner.kill()
			arrow_keys = true



		}


		function render() {
			game.debug.text('Your score: ' + score, 10, 20);
			if(game_over == true) {
				text.visible = true
				button.revive()
				button2.revive()
		    } 

		}

		function update() {
			if(!paused) {

				if(time % 10 < 3) {
					flash_apples.forEach(function (c) { c.tint = 0x0000ff;; });
				} else if(time % 10 < 6) {
					flash_apples.forEach(function (c) { c.tint = 0xffdf00;; });

				} else {
					flash_apples.forEach(function (c) { c.tint = 0xc0c0c0;; });
				}
				for(i = 0; i < flash_apples; i++) {
					if(time % 10 < 3) {
						flash_apples[i].tint = 0x0000ff;
					} else if (time % 10 < 6) {
						flash_apples[i].tint = 0xffdf00;
					} else {
						flash_apples[i].tint = 0xc0c0c0;
					}

				}
				x_value = game.world.centerX + Math.random() * (350 + 350) - 350;
				if(!game_over) {
					if(time % Math.round(100) == 0) {
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
						// As the level increases throw more bad apples
						for(i = 0; i < level; i++) {
							x_value = game.world.centerX + Math.random() * (350 + 350) - 350;
							y_value = Math.floor(Math.random() * -400 * level) - 100 
							bad_apple = game.add.sprite(x_value, y_value, 'bad_apple');
						    bad_apple.scale.setTo(.1, .1);
						    game.physics.enable(bad_apple, Phaser.Physics.ARCADE)
						    bad_apple.enableBody = true;
			    			bad_apple.physicsBodyType = Phaser.Physics.ARCADE;
							bad_apple.body.checkCollision.down = true
							// As the level increases bad apples have the chance to fall faster
							bad_apple.body.velocity.y = -1 * Math.floor(Math.random() * level) - 2 
							game.physics.arcade.collide(bad_apple, donsky);
							game.physics.arcade.overlap(bad_apple, donsky, collisionBadHandler, null, this);
							bad_apples.add(bad_apple)
						}
					} else if (time % Math.round(350) == 0) {
						apple = game.add.sprite(x_value, -100, 'apple');
					    apple.scale.setTo(.1, .1);
					    game.physics.enable(apple, Phaser.Physics.ARCADE)
					    apple.enableBody = true;
		    			apple.physicsBodyType = Phaser.Physics.ARCADE;
						apple.body.checkCollision.down = true
						apple.body.velocity.y = -7
						flash_apples.add(apple)
						game.physics.arcade.collide(apple, donsky);
						game.physics.arcade.overlap(apple, donsky, collisionGreatHandler, null, this);
					} 
					game.physics.arcade.overlap(apples, donsky, collisionGoodHandler, null, this);
					game.physics.arcade.overlap(bad_apples, donsky, collisionBadHandler, null, this);
					game.physics.arcade.overlap(flash_apples, donsky, collisionGreatHandler, null, this)
				}
				if (!game_over) {
					time++;
				}
				if(time % 300 == 0) {
					level++;
				}

				if(arrow_keys) {
					 if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
					 	donsky.body.velocity.x = -300;
					 }
					 else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
					 	donsky.body.velocity.x = 300;
					 } else {
					 	donsky.body.velocity.x = 0;
					 }
				} else {
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
				}
		}
		function collisionGoodHandler(obj, donsky) {
			if(!game_over){
				if(obj.height < game.world.height + 30) {
					donsky.kill()
					score++;
					myText = game.add.text(game.world.centerX - 100, 50, "Nice grab! +1 Point!", { font: "30px Gloria Hallelujah", fill: "red", align: "center" });
					game.time.events.add(100, function() {    game.add.tween(myText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    game.add.tween(myText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
				}
			}
		}
		function collisionGreatHandler(obj, donsky) {
			if(!game_over){
				if(obj.height < game.world.height + 30) {
					donsky.kill()
					score += 5;
					console.log("great")
					myText = game.add.text(game.world.centerX - 175, game.world.height / 2, "Bonus Apple! +5 Points!", { font: "30px Gloria Hallelujah", fill: "red", align: "center" });
					game.time.events.add(500, function() {    game.add.tween(myText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    game.add.tween(myText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
				}
			}
		}
		function collisionBadHandler(obj, donsky) {
			game_over = true;
			if(obj.height < game.world.height + 30) {
				donsky.kill()
				banner.revive()
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