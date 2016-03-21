// Gane settings
var settings = {
    width : 505,
    height : 606 
};
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //this.x = 200;
    this.x = Math.floor(Math.random() * settings.width);
    //this.y = 231; third row, next line used to appear random in row 1, 2, or 3
    var enemyRow = [65, 148, 231];
    this.y = enemyRow[Math.floor(Math.random() * enemyRow.length)];

    // Set the speed of the enemy
    //this.speed = 100 next line create a random speed between 31 and 330
    this.speed = Math.floor(Math.random() * 300) + 31;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);

    // check if enemy reach border of canvas and wrap
    if (this.x > settings.width) {
        this.x = -101;
    }
    // Collision detection with player
    // First check if the enemy is on the same row as the player
    if (this.y + 8 === player.y) {
        // Then check if the enemy and player are close to each other
        if (Math.abs(player.x - this.x) < 80) {
            player.reset();
            player.renderSorry();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Our player class
var Player = function() {

    // The image/sprite for our player, this uses
    // a helper we've received to easily load images
    this.sprite = 'images/char-boy.png';

    // set the initial position for player
    this.x = 202;
    this.y = 405;
};

// initial position of player in case  of win the game
Player.prototype.update = function() {
    if (this.y < 0) {
        this.x = 202;
        this.y = 405;
        this.renderWin();
    }
};
//
// Player Reset put at original position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 405;
};

// Player moves to new position
Player.prototype.handleInput = function(key) {
  //
    ctx.clearRect(250, 10, 255, 38);
  // In case of left key check if player is on the screen then move one square left
    if (key === 'left') {
        if (this.x > 0) {
            this.x -= 101;
        }
    }

  // In case of right key check if player is on the screen then move one square right
    else if (key === 'right') {
         if (this.x < 404) {
             this.x += 101;
        }
    }
   // In case of up key check if player is on the screen then move one square up
    else if (key === 'up') {
         if (this.y > 0) {
             this.y -= 83;
        }
    }
   // In case of down key check if player is on the screen then move one square down
    else if (key === 'down') {
         if (this.y < 405) {
             this.y += 83;
        }         
    }
//
};
/**
 * Print the Win message
 */
Player.prototype.renderWin = function() {
    ctx.font = "30px Impact";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.clearRect(300, 10, 205, 38);
    ctx.fillText("You Win!!", settings.width, 40);
};
/**
 * Print the you lose message
 */
Player.prototype.renderSorry = function() {
    ctx.font = "30px Impact";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.clearRect(300, 10, 205, 38);
    ctx.fillText("Sorry, try again!", settings.width, 40);
};
/**
 * Initial Message at the beggining of game
 */
Player.prototype.renderStartmessage = function() {
    ctx.font = "30px Impact";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.clearRect(300, 10, 205, 38);
    ctx.fillText("Start new game!!", settings.width, 40);
};
    // Draw our player on the screen
    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];
//allEnemies.push(new Enemy()) only one enemy
// creation of 5 enemies
for (var j=0; j<5; j++){
    allEnemies.push(new Enemy())
}
// Place the player object in a variable called player

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
