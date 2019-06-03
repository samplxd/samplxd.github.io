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

    map: [15, 7, 15, 7, 7, 7, 15,
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

var kalafior1 = {active: 0, sprouting: 0};
var kalafior2 = {active: 0, sprouting: 0};
var kalafior3 = {active: 0, sprouting: 0};
var kalafior4 = {active: 0, sprouting: 0};
var kalafior5 = {active: 0, sprouting: 0};
var kalafior6 = {active: 0, sprouting: 0};
var kalafior7 = {active: 0, sprouting: 0};
var kalafior8 = {active: 0, sprouting: 0};
var kalafior9 = {active: 0, sprouting: 0};

    canvas.addEventListener("click", function (evt) {
        var mousePos = getMousePos(canvas, evt);
        alert(mousePos.x + ',' + mousePos.y);
        if (mousePos.x >= canvas.width / 7 * 1 && mousePos.x <= canvas.width / 7 * 2) {
          if (mousePos.y >= canvas.height / 7 * 1 && mousePos.y <= canvas.height / 7 * 2){
            console.log('kalafior1');
          }
          if (mousePos.y >= canvas.height / 7 * 3 && mousePos.y <= canvas.height / 7 * 4){
            console.log('kalafior4');
          }
          if (mousePos.y >= canvas.height / 7 * 5 && mousePos.y <= canvas.height / 7 * 6){
            console.log('kalafior7');
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

    kalafior1.tile_x = canvas.width / 7 * 1;
    kalafior2.tile_x = canvas.width / 7 * 3;
    kalafior3.tile_x = canvas.width / 7 * 5;
    kalafior4.tile_x = canvas.width / 7 * 1;
    kalafior5.tile_x = canvas.width / 7 * 3;
    kalafior6.tile_x = canvas.width / 7 * 5;
    kalafior7.tile_x = canvas.width / 7 * 1;
    kalafior8.tile_x = canvas.width / 7 * 3;
    kalafior9.tile_x = canvas.width / 7 * 5;

    kalafior1.tile_y = canvas.height / 7 * 1;
    kalafior2.tile_y = canvas.height / 7 * 1;
    kalafior3.tile_y = canvas.height / 7 * 1;
    kalafior4.tile_y = canvas.height / 7 * 3;
    kalafior5.tile_y = canvas.height / 7 * 3;
    kalafior6.tile_y = canvas.height / 7 * 3;
    kalafior7.tile_y = canvas.height / 7 * 5;
    kalafior8.tile_y = canvas.height / 7 * 5;
    kalafior9.tile_y = canvas.height / 7 * 5;

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

var game_speed = 5;
var speed = 1000 * game_speed;
var generator = setInterval(game, speed)

function game()
{

  var random = Math.random();

  if (random <= 0.11){
    if (kalafior1.sprouting >= 1 || kalafior1.active == 1){game();}
    kalafior1.sprouting = 1;
  }

  if (random > 0.11 && random <= 0.22){
    if (kalafior2.sprouting >= 1 || kalafior2.active == 1){game();}
    kalafior2.sprouting = 1;
  };

  if (random > 0.22 && random <= 0.33){
    if (kalafior3.sprouting >= 1 || kalafior3.active == 1){game();}
    kalafior3.sprouting = 1;
  };

  if (random > 0.33 && random <= 0.44){
    if (kalafior4.sprouting >= 1 || kalafior4.active == 1){game();}
    kalafior4.sprouting = 1;
  };

  if (random > 0.44 && random <= 0.55){
    if (kalafior5.sprouting >= 1 || kalafior5.active == 1){game();}
    kalafior5.sprouting = 1;
  };

  if (random > 0.55 && random <= 0.66){
    if (kalafior6.sprouting >= 1 || kalafior6.active == 1){game();}
    kalafior6.sprouting = 1;
  };

  if (random > 0.66 && random <= 0.77){
    if (kalafior7.sprouting >= 1 || kalafior7.active == 1){game();}
    kalafior7.sprouting = 1;
  };

  if (random > 0.77 && random <= 0.88){
    if (kalafior8.sprouting >= 1 || kalafior8.active == 1){game();}
    kalafior8.sprouting = 1;
  };

  if (random > 0.88){
    if (kalafior9.sprouting >= 1 || kalafior9.active == 1){game();}
    kalafior9.sprouting = 1;
  };
  console.log("now");
};

var updating = setInterval(update, 500)

var animate = {

    n1: 0,
    n2: 0,
    n3: 0,
    n4: 0,
    n5: 0,
    n6: 0,
    n7: 0,
    n8: 0,
    n9: 0

}

function update() {

if (kalafior1.active == 1){

    animate.n1 ++;

    switch (animate.n1) {
      case 1:
      case 3:
      case 5:
      {
          ctx.drawImage(tilesheet, tilesheet_data.kalafior5_1_x, tilesheet_data.kalafior5_1_y, 32, 32, kalafior1.tile_x, kalafior1.tile_y, canvas.width / 7, canvas.height / 7);
          break;
      }
      case 2:
      case 4:
      {
          ctx.drawImage(tilesheet, tilesheet_data.kalafior5_2_x, tilesheet_data.kalafior5_2_y, 32, 32, kalafior1.tile_x, kalafior1.tile_y, canvas.width / 7, canvas.height / 7);
          break;
      }
      case 6:
      {
        ctx.drawImage(tilesheet, tilesheet_data.kalafior0_x, tilesheet_data.kalafior0_y, 32, 32, kalafior1.tile_x, kalafior1.tile_y, canvas.width / 7, canvas.height / 7);
        kalafior1.active = 0;
      }
    }

}
else animate.n1 = 0;

if (kalafior1.sprouting > 0) {

  switch (kalafior1.sprouting) {
    case 1: {
      ctx.drawImage(tilesheet, tilesheet_data.kalafior1_x, tilesheet_data.kalafior1_y, 32, 32, kalafior1.tile_x, kalafior1.tile_y, canvas.width / 7, canvas.height / 7);
      break;
    }
    case 2: {
      ctx.drawImage(tilesheet, tilesheet_data.kalafior2_x, tilesheet_data.kalafior2_y, 32, 32, kalafior1.tile_x, kalafior1.tile_y, canvas.width / 7, canvas.height / 7);
      break;
    }
    case 3: {
      ctx.drawImage(tilesheet, tilesheet_data.kalafior3_x, tilesheet_data.kalafior3_y, 32, 32, kalafior1.tile_x, kalafior1.tile_y, canvas.width / 7, canvas.height / 7);
      break;
    }
    case 4: {
      ctx.drawImage(tilesheet, tilesheet_data.kalafior4_x, tilesheet_data.kalafior4_y, 32, 32, kalafior1.tile_x, kalafior1.tile_y, canvas.width / 7, canvas.height / 7);
      break;
    }
  }

  kalafior1.sprouting++;
    if (kalafior1.sprouting == 5) {
      kalafior1.sprouting = 0;
      kalafior1.active = 1;
    };
  }

  if (kalafior2.active == 1){

      animate.n2 ++;

      switch (animate.n2) {
        case 1:
        case 3:
        case 5:
        {
            ctx.drawImage(tilesheet, tilesheet_data.kablafior5_1_x, tilesheet_data.kablafior5_1_y, 32, 32, kalafior2.tile_x, kalafior2.tile_y, canvas.width / 7, canvas.height / 7);
            break;
        }
        case 2:
        case 4:
        {
            ctx.drawImage(tilesheet, tilesheet_data.kablafior5_2_x, tilesheet_data.kablafior5_2_y, 32, 32, kalafior2.tile_x, kalafior2.tile_y, canvas.width / 7, canvas.height / 7);
            break;
        }
        case 6:
        {
          ctx.drawImage(tilesheet, tilesheet_data.kablafior0_x, tilesheet_data.kablafior0_y, 32, 32, kalafior2.tile_x, kalafior2.tile_y, canvas.width / 7, canvas.height / 7);
          kalafior2.active = 0;
        }
      }
  }
  else animate.n2 = 0;

  if (kalafior2.sprouting > 0) {

    switch (kalafior2.sprouting) {
      case 1: {
        ctx.drawImage(tilesheet, tilesheet_data.kablafior1_x, tilesheet_data.kablafior1_y, 32, 32, kalafior2.tile_x, kalafior2.tile_y, canvas.width / 7, canvas.height / 7);
        break;
      }
      case 2: {
        ctx.drawImage(tilesheet, tilesheet_data.kablafior2_x, tilesheet_data.kablafior2_y, 32, 32, kalafior2.tile_x, kalafior2.tile_y, canvas.width / 7, canvas.height / 7);
        break;
      }
      case 3: {
        ctx.drawImage(tilesheet, tilesheet_data.kablafior3_x, tilesheet_data.kablafior3_y, 32, 32, kalafior2.tile_x, kalafior2.tile_y, canvas.width / 7, canvas.height / 7);
        break;
      }
      case 4: {
        ctx.drawImage(tilesheet, tilesheet_data.kablafior4_x, tilesheet_data.kablafior4_y, 32, 32, kalafior2.tile_x, kalafior2.tile_y, canvas.width / 7, canvas.height / 7);
        break;
      }
    }

    kalafior2.sprouting++;
      if (kalafior2.sprouting == 5) {
        kalafior2.sprouting = 0;
        kalafior2.active = 1;
      };
    }

    if (kalafior3.sprouting > 0) {
      kalafior3.sprouting++;
        if (kalafior3.sprouting == 5) {
          kalafior3.sprouting = 0;
          kalafior3.active = 1;
        };
      }

      if (kalafior4.sprouting > 0) {
        kalafior4.sprouting++;
          if (kalafior4.sprouting == 5) {
            kalafior4.sprouting = 0;
            kalafior4.active = 1;
          };
        }


        if (kalafior5.sprouting > 0) {
          kalafior5.sprouting++;
            if (kalafior5.sprouting == 5) {
              kalafior5.sprouting = 0;
              kalafior5.active = 1;
            };
          }

          if (kalafior6.sprouting > 0) {
            kalafior6.sprouting++;
              if (kalafior6.sprouting == 5) {
                kalafior6.sprouting = 0;
                kalafior6.active = 1;
              };
            }

            if (kalafior7.sprouting > 0) {
              kalafior7.sprouting++;
                if (kalafior7.sprouting == 5) {
                  kalafior7.sprouting = 0;
                  kalafior7.active = 1;
                };
              }

              if (kalafior8.sprouting > 0) {
                kalafior8.sprouting++;
                  if (kalafior8.sprouting == 5) {
                    kalafior8.sprouting = 0;
                    kalafior8.active = 1;
                  };
                }


                if (kalafior9.sprouting > 0) {
                  kalafior9.sprouting++;
                    if (kalafior9.sprouting == 5) {
                      kalafior9.sprouting = 0;
                      kalafior9.active = 1;
                    };
                  }
}

function deactivate(kalafior){

  kalafior.active = 0;

}


window.addEventListener('load',posCheck);
window.addEventListener('resize',posCheck);

function sproutcheck()
{
  console.log(kalafior1);
  console.log(kalafior2);
  console.log(kalafior3);
  console.log(kalafior4);
  console.log(kalafior5);
  console.log(kalafior6);
  console.log(kalafior7);
  console.log(kalafior8);
  console.log(kalafior9);
};
