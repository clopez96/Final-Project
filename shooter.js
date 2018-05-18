

	// loads images as spacerock and plane
function loadImages(){

	spacerockImage = new Image();
	planeImage = new Image();
	rocketImage = new Image();

	spacerockImage.src = "Images/rock.png";
	planeImage.src = "Images/plane2.png"
	rocketImage.src = "Images/bullet2.png"
}




function init(){
// document.getElementById('mycanvas') gets the canvas element defined in the html file by using its id.
canvas = document.getElementById('mycanvas');

console.log(canvas);
gameover = false;

// pen is an object created using the getContext() function.
pen = canvas.getContext('2d'); // 2d is passed to make 2d games in html

W = canvas.width;
H = canvas.height;
prev_counter = 0;
counter = 0;

loadImages();

// plane is the spaceship we are creating.
plane = {
	x : 600,
	y : H-100,
	w : 50,
	h : 60,
	speed : 25,
	rockets : [],

	update : function(){
	
	},

	draw : function(){
		// pen.drawImage() is used to load a custom image
		pen.drawImage(planeImage,plane.x,plane.y,plane.w,plane.h)

	
	},



	shoot : function(){

		if(counter-prev_counter>=1){
			console.log("Shooting a rocket");
			//centers rocket to the ship
			//this.y,10 is the speed of the rocket, the lower the number, the slower it goes.
			var b = new rocket(this.x + (this.w)/2.5, this.y,10);
			this.rockets.push(b);
			prev_counter = counter;

			rocks.forEach(function(spacerock){

			//if(isColliding(this.rockets[this.rockets.length()-1],spacerock)){
			if(isCollidingWithrocket(b,spacerock)){
				this.state = "inactive";
				console.log("spacerock destroyed");
				var index = rocks.indexOf(spacerock);

				//destroys one spacerock
				rocks.splice(index,1);
				}

			});

		}
		
	}

};



//spacebar (shooter)
function buttonGotPressed(e){
	if(e.key==" "){
		plane.shoot();
	}

//moves plane to the left
	if(e.key=="ArrowLeft"){
		plane.x = plane.x - plane.speed;
		if(plane.x<=0){
			plane.x= 0;
		}
	}


//moves plane up
	if(e.key=="ArrowUp"){
		plane.y = plane.y - plane.speed;
		if(plane.y<=0){
			plane.y= 0;
		}
	}

//moves plane down
	if(e.key=="ArrowDown"){
		plane.y = plane.y + plane.speed;
		if(plane.x<=0){
			plane.x= 0;
		}
	}

//moves plane to the right
	if(e.key=="ArrowRight"){
		plane.x = plane.x + plane.speed;
		if(plane.x >= W-plane.w){
			plane.x = W-plane.w;
		}
	}
}
document.addEventListener('keydown', buttonGotPressed);   
// When spacebar is pressed, then the plane shoots the rocket

rocks = [];
var e = new spacerock(10,20,5);
rocks.push(e);

}

// Class defined for a rocket
function rocket(x,y,speed){
	this.x = x;
	this.y = y;
	// this defines the width and height of the rockets
	this.w = 9;
	this.h = 25;
	//
	this.state = "active"
	this.speed = speed;

	this.draw = function(){

		
        pen.drawImage(rocketImage,this.x,this.y,this.w,this.h);

	}

	this.update = function(){
		this.y -= this.speed;

		if(this.y<=0){
			this.state = "inactive"
		}
	}

}

// Class defined for a spacerock
function spacerock(x,y,speed){
	this.x = x;
	this.y = y;
	// this defines the width and height of the rockets
	this.w = 50;
	this.h = 50;
	this.state = "active"
	this.speed = speed;

	this.draw = function(){

		pen.drawImage(spacerockImage,this.x,this.y,this.w,this.h);

	}

	this.update = function(){

		this.x = this.x + this.speed;

		// To test the boundary conditions
		if(this.x >= W-this.w || this.x<=0){
			this.speed *= -1;
		}

		this.y++;

		if(this.y<=0){
			this.state = "inactive"
		}
	}

}


function draw(){
	

	

	//Everthing on the screen gets re-drawn again. If I delete this then it creates multiple images and you won't be able to play
	pen.clearRect(0,0,W,H);


	//Drawing the plane
	plane.draw()

	//Drawing the rockets
	plane.rockets.forEach(function(rocket){
		rocket.draw();
	});

	//Drawing the spacerock
	rocks.forEach(function(spacerock){
		spacerock.draw();

	});

}

function update(){
	plane.update()

	plane.rockets.forEach(function(rocket){
		rocket.update();

	});

	rocks.forEach(function(spacerock){
		spacerock.update();
	});

    // Math.random() generates a random number between 0 and 1.
	var no =  Math.random();
	if(no<0.01){
		var x = Math.floor(Math.random()*(W-50));
		// multiplied by 100 to generate rocks in the region from 0 to 100px.
		var y = Math.floor(Math.random()*100);

		var speed = Math.random()*10 +2;
		var negative = Math.random();
		if(negative<0.5){
			speed = -speed;
		}

		var e = new spacerock(x,y,speed);
		rocks.push(e);
	}

	//collision
	rocks.forEach(function(spacerock){
		if(isColliding(plane,spacerock)){

			alert("Game over! You Lose!");
			gameover = true;
		}

	});
}

//Collision detection for the plane when is collides with the rock

function isColliding(r1,r2){
	var x_axis = Math.abs(r1.x - r2.x)<= Math.max(r1.w,r2.w);
	var y_axis = Math.abs(r1.y - r2.y)<= Math.max(r1.h,r2.h);

	return x_axis && y_axis;
}



//Collision detection for the rocket when is collides with the rock

function isCollidingWithrocket(r1,r2){
	var x_axis = Math.abs(r1.x - r2.x)<= Math.max(r1.w,r2.w);
	var y_axis = Math.abs(r1.y - r2.y)<= Math.max(r1.h,r2.h);

	return x_axis || y_axis;
}

// This is a function to call update() and draw()
function render(){
	draw();
	update();
	console.log("in render");
	counter++;

	// similar to setInterval()
	if(gameover == false){
		// similar to setInterval()
		window.requestAnimationFrame(render);
	}
	else{
		startGame();
	}
	}
	
function startGame(){
	init();
	render();
}

startGame();


//sound (could not figure out how to make it work)
var sound = new Howl({
  src: ['audio/ArcadeFunk.mp3']
}).play();




