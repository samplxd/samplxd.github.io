(function() { "use strict";

  /* The display handles everything to do with drawing graphics and resizing the
  screen. The world holds the map and its dimensions. */
  var display, world;

  display = {

    /* We draw the tiles to the buffer in "world" coordinates or unscaled coordinates.
    All scaling is handled by drawImage when we draw the buffer to the display canvas. */
    buffer:document.createElement("canvas").getContext("2d"),
    /* Scaling takes place on the display canvas. This is its drawing context. The
    height_width_ratio is used in scaling the buffer to the canvas. */
    context:document.querySelector("canvas").getContext("2d"),
    /* The height width ratio is the height to width ratio of the tile map. It is
    used to size the display canvas to match the aspect ratio of the game world. */
    height_width_ratio:undefined,

    /* The tile_sheet object holds the tile sheet graphic as well as its dimensions. */
    tile_sheet: {

      image:new Image(),// The actual graphic will be loaded into this.

      columns:4,
      tile_height:32,
      tile_width:32

    },

    /* This function draws the tile graphics from the tile_sheet.image to the buffer
    one by one according to the world.map. It then draws the buffer to the display
    canvas and takes care of scaling the buffer image up to the display canvas size. */
    render:function() {

      /* Here we loop through the tile map. */
      for (let index = world.map.length - 1; index > -1; -- index) {

        /* We get the value of each tile in the map which corresponds to the tile
        graphic index in the tile_sheet.image. */
        var value = world.map[index];

        /* This is the x and y location at which to cut the tile image out of the
        tile_sheet.image. */
        var source_x = (value % this.tile_sheet.columns) * this.tile_sheet.tile_width;
        var source_y = Math.floor(value / this.tile_sheet.columns) * this.tile_sheet.tile_height;

        /* This is the x and y location at which to draw the tile image we are cutting
        from the tile_sheet.image to the buffer canvas. */
        var destination_x = (index % world.columns) * this.tile_sheet.tile_width;
        var destination_y = Math.floor(index / world.columns) * this.tile_sheet.tile_height;

        /* Draw the tile image to the buffer. The width and height of the tile is taken from the tile_sheet object. */
        this.buffer.drawImage(this.tile_sheet.image, source_x, source_y, this.tile_sheet.tile_width, this.tile_sheet.tile_height, destination_x, destination_y, this.tile_sheet.tile_width, this.tile_sheet.tile_height);

      }

      /* Now we draw the finalized buffer to the display canvas. You don't need to
      use a buffer; you could draw your tiles directly to the display canvas. If
      you are going to scale your display canvas at all, however, I recommend this
      method, because it eliminates antialiasing problems that arize due to scaling
      individual tiles. It is somewhat slower, however. */
      this.context.drawImage(this.buffer.canvas, 0, 0, world.width, world.height, 0, 0, this.context.canvas.width, this.context.canvas.height);

    },

    /* Resizes the display canvas when the screen is resized. */
    resize:function(event) {

      display.context.canvas.width = document.documentElement.clientWidth - 16;

      if (display.context.canvas.width > document.documentElement.clientHeight - 16) {

        display.context.canvas.width = document.documentElement.clientHeight - 16;

      }

      /* That height_width_ratio comes into play here. */
      display.context.canvas.height = display.context.canvas.width * display.height_width_ratio;

      display.buffer.imageSmoothingEnabled = display.context.imageSmoothingEnabled = false;

      display.render();

    }

  };

  /* The world holds information about the tile map. */
  world = {

    map: [7, 7, 15, 7, 7, 7, 15,
          7, 8, 7, 0, 15, 8, 7,
          7, 7, 15, 7, 7, 7, 7,
          7, 8, 7, 8, 7, 0, 15,
          15, 7, 7, 7, 15, 7, 15,
          7, 0, 15, 8, 7, 8, 7,
          7, 15, 7, 7, 15, 7, 7],

    columns:7,

    height:224,
    width:224,

  };

  //// INITIALIZE ////

  /* Before we can draw anything we have to load the tile_sheet image. */
  display.tile_sheet.image.addEventListener("load", function(event) {

    display.buffer.canvas.height = world.height;
    display.buffer.canvas.width  = world.width;
    display.height_width_ratio   = world.height / world.width;

    display.resize();

  });

  /* Start loading the image. */
  display.tile_sheet.image.src = "img/tile_sheet.png";

  window.addEventListener("resize", display.resize);

})();

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var img = document.getElementById('tilesheet');



var kalafior = [
{active: 0, sprouting: 0},
{active: 0, sprouting: 0},
{active: 0, sprouting: 0},
{active: 0, sprouting: 0},
{active: 0, sprouting: 0},
{active: 0, sprouting: 0},
{active: 0, sprouting: 0},
{active: 0, sprouting: 0},
{active: 0, sprouting: 0},
]

    canvas.addEventListener("click", function (evt) {
        var mousePos = getMousePos(canvas, evt);

		for (var i = 0; i < 9; i++){
			if ( mousePos.x >= kalafior[i].tile_x && mousePos.x <= kalafior[i].tile_x + canvas.width / 7
			&& mousePos.y >= kalafior[i].tile_y && mousePos.y <= kalafior[i].tile_y + canvas.width / 7 )
			{
				if (kalafior[i].active == 1) {
					kalafior[i].active = 0;
					score++;
					ctx.font = "20px Didact Gothic";
					ctx.drawImage(tilesheet, 96, 32, 32, 32, 0, 0, canvas.width / 7, canvas.height / 7);
          ctx.fillText('Score:', 10, 25);
          ctx.fillText(score, 10, 43);

          if (i == 0 || i == 2 || i == 3 || i == 4 || i == 7 || i == 8){
					ctx.drawImage(tilesheet, tilesheet_data.kalafior0_x, tilesheet_data.kalafior0_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
				  }
          else{
          ctx.drawImage(tilesheet, tilesheet_data.kablafior0_x, tilesheet_data.kablafior0_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
          }
      }
			}
		}
    }, false);


    //Get Mouse Position
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

function posCheck()
  {

    kalafior[0].tile_x = canvas.width / 7 * 1;
    kalafior[1].tile_x = canvas.width / 7 * 3;
    kalafior[2].tile_x = canvas.width / 7 * 5;
    kalafior[3].tile_x = canvas.width / 7 * 1;
    kalafior[4].tile_x = canvas.width / 7 * 3;
    kalafior[5].tile_x = canvas.width / 7 * 5;
    kalafior[6].tile_x = canvas.width / 7 * 1;
    kalafior[7].tile_x = canvas.width / 7 * 3;
    kalafior[8].tile_x = canvas.width / 7 * 5;

    kalafior[0].tile_y = canvas.height / 7 * 1;
    kalafior[1].tile_y = canvas.height / 7 * 1;
    kalafior[2].tile_y = canvas.height / 7 * 1;
    kalafior[3].tile_y = canvas.height / 7 * 3;
    kalafior[4].tile_y = canvas.height / 7 * 3;
    kalafior[5].tile_y = canvas.height / 7 * 3;
    kalafior[6].tile_y = canvas.height / 7 * 5;
    kalafior[7].tile_y = canvas.height / 7 * 5;
    kalafior[8].tile_y = canvas.height / 7 * 5;

  }

var tilesheet_data = {

  kalafior0_x: 0,
  kalafior0_y: 64,

  kalafior1_x: 32,
  kalafior1_y: 64,

  kalafior2_x: 64,
  kalafior2_y: 64,

  kalafior3_x: 96,
  kalafior3_y: 64,

  kalafior4_x: 0,
  kalafior4_y: 96,

  kalafior5_1_x: 32,
  kalafior5_1_y: 96,

  kalafior5_2_x: 64,
  kalafior5_2_y: 96,

  kablafior0_x: 0,
  kablafior0_y: 0,

  kablafior1_x: 32,
  kablafior1_y: 0,

  kablafior2_x: 64,
  kablafior2_y: 0,

  kablafior3_x: 96,
  kablafior3_y: 0,

  kablafior4_x: 0,
  kablafior4_y: 32,

  kablafior5_1_x: 32,
  kablafior5_1_y: 32,

  kablafior5_2_x: 64,
  kablafior5_2_y: 32,

}

var generator = [

	{inactive: 0},
	{inactive: 0},
	{inactive: 0}

]

var score = 0;
ctx.fillText('Score:', 10, 25);
ctx.fillText(score, 10, 43);
var game_speed = 3;
var difficulty = 0;

var speed = 1000 * game_speed;
var generator = setInterval(game, speed);
var generator2;
clearInterval(generator2);
var lives = 3;
ctx.fillText('Lives:', canvas.width / 7 + 10, 25);
ctx.fillText(lives, canvas.width / 7 + 10, 43);



function game()
{

  var random = Math.random();
  var threshold = 0;

  for (var i = 0; i < 9; i++){

	threshold = 0.111 + i * 0.111;
	if (random >= threshold - 0.111 && random <= threshold)
	{
		if (kalafior[i].sprouting >= 1 || kalafior[i].active == 1){
			game(); break;
			}
		kalafior[i].sprouting = 1;
	}
  }

};

var updating = setInterval(update, 500)


var animate = [
{state: 0},
{state: 0},
{state: 0},
{state: 0},
{state: 0},
{state: 0},
{state: 0},
{state: 0},
{state: 0}
]

function update() {

        switch (score) {
           case 5: {if (difficulty == 0) {clearInterval(generator); game_speed -= 1; speed = 1000 * game_speed; generator = setInterval(game, speed)} difficulty = 1; break}
           case 15: { if (difficulty == 1) {generator2 = setInterval(game, speed);} difficulty = 2; break}
           case 30: { if (difficulty == 2) {clearInterval(generator); clearInterval(generator2); game_speed -= 1; speed = 1000 * game_speed; generator = setInterval(game, speed); generator2 = setInterval(game, speed)} difficulty = 3; break}
           case 50: { if (difficulty == 3) {clearInterval(generator); clearInterval(generator2); game_speed -= 1 / 2; speed = 1000 * game_speed; generator = setInterval(game, speed); generator2 = setInterval(game, speed)} difficulty = 4; break}
           case 150: { if (difficulty == 4) {clearInterval(updating); updating = setInterval(update, 333);}difficulty = 5; break;}
           default: {break;}
           }

	for (var i = 0; i < 9; i++){

		if (i == 0 || i == 2 || i == 3 || i == 4 || i == 7 || i == 8){

			if (kalafior[i].active == 1) {
				animate[i].state++;
				switch (animate[i].state) {

					case 1:
					case 3:
					case 5:
					case 7:
					{
						ctx.drawImage(tilesheet, tilesheet_data.kalafior5_1_x, tilesheet_data.kalafior5_1_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
					break;
					}
					case 2:
					case 4:
					case 6:
					{
							ctx.drawImage(tilesheet, tilesheet_data.kalafior5_2_x, tilesheet_data.kalafior5_2_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
					break;
					}
					case 8:
					{
						ctx.drawImage(tilesheet, tilesheet_data.kalafior0_x, tilesheet_data.kalafior0_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
						kalafior[i].active = 0;
						lives -= 1;
						break;
					}

				}

			}
			else { animate[i].state = 0; }

			if (kalafior[i].sprouting > 0) {

				switch (kalafior[i].sprouting) {
					case 1: {
						ctx.drawImage(tilesheet, tilesheet_data.kalafior1_x, tilesheet_data.kalafior1_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
						break;
							}
					case 2: {
						ctx.drawImage(tilesheet, tilesheet_data.kalafior2_x, tilesheet_data.kalafior2_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
						break;
							}
					case 3: {
						ctx.drawImage(tilesheet, tilesheet_data.kalafior3_x, tilesheet_data.kalafior3_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
						break;
							}
					case 4: {
						ctx.drawImage(tilesheet, tilesheet_data.kalafior4_x, tilesheet_data.kalafior4_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
						break;
						}
				}

			}

		}
		else {

			if (kalafior[i].active == 1) {
				animate[i].state++;
				switch (animate[i].state) {

					case 1:
					case 3:
					case 5:
					case 7:
					{
					ctx.drawImage(tilesheet, tilesheet_data.kablafior5_1_x, tilesheet_data.kablafior5_1_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
					break;
					}
					case 2:
					case 4:
					case 6:
					{
					ctx.drawImage(tilesheet, tilesheet_data.kablafior5_2_x, tilesheet_data.kablafior5_2_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
					break;
					}
					case 8:
					{
						ctx.drawImage(tilesheet, tilesheet_data.kablafior0_x, tilesheet_data.kablafior0_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
						kalafior[i].active = 0;
						lives -= 1;
						break;
					}

				}

			}
			else animate[i].state = 0;

			if (kalafior[i].sprouting > 0) {

				switch (kalafior[i].sprouting) {
					case 1: {
						ctx.drawImage(tilesheet, tilesheet_data.kablafior1_x, tilesheet_data.kablafior1_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
						break;
							}
					case 2: {
						ctx.drawImage(tilesheet, tilesheet_data.kablafior2_x, tilesheet_data.kablafior2_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
						break;
							}
					case 3: {
						ctx.drawImage(tilesheet, tilesheet_data.kablafior3_x, tilesheet_data.kablafior3_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
						break;
							}
					case 4: {
						ctx.drawImage(tilesheet, tilesheet_data.kablafior4_x, tilesheet_data.kablafior4_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);
						break;
						}
				}

			}

		}

		if (kalafior[i].sprouting >= 1) {

			kalafior[i].sprouting++;
				if (kalafior[i].sprouting == 5) {
					kalafior[i].sprouting = 0;
					kalafior[i].active = 1;
				};

		}

	if (lives <= 0)
	{
		for (var i = 0; i < 9; i++){
		if (i == 0 || i == 2 || i == 3 || i == 4 || i == 7 || i == 8){

			ctx.drawImage(tilesheet, tilesheet_data.kalafior0_x, tilesheet_data.kalafior0_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);

		}
		else {

			ctx.drawImage(tilesheet, tilesheet_data.kablafior0_x, tilesheet_data.kablafior0_y, 32, 32, kalafior[i].tile_x, kalafior[i].tile_y, canvas.width / 7, canvas.height / 7);

		}
		}
		clearInterval(updating);
    clearInterval(generator);
    clearInterval(generator2);
		ctx.font = "50px Didact Gothic";
		ctx.fillText('GAME OVER!', (canvas.width / 2) - 3 * 45, canvas.width / 2);
	}

	}

  ctx.font = "20px Didact Gothic";
  ctx.drawImage(tilesheet, 96, 32, 32, 32, canvas.width / 7, 0, canvas.width / 7, canvas.height / 7);
	ctx.fillText('Lives:', canvas.width / 7 + 10, 25);
  ctx.fillText(lives, canvas.width / 7 + 10, 43);

  ctx.drawImage(tilesheet, 96, 32, 32, 32, 0, 0, canvas.width / 7, canvas.height / 7);
  ctx.fillText('Score:', 10, 25);
  ctx.fillText(score, 10, 43);
}

window.addEventListener('load',posCheck);
window.addEventListener('resize',posCheck);

function sproutcheck()
{
for (var i = 0; i < 9; i++){
  console.log(kalafior[i]);
}
};
