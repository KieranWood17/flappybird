// the Game object used by the phaser.io library
var stateActions = {preload: preload, create: create, update: update};

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var Labelscore;
var score = 0;
var player;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/jamesBond.gif");
    game.load.image("pipe", "assets/pipe.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // set the background colour of the scene
    game.stage.setBackgroundColor("#FF0000");
    game.add.text(20, 360, "Welcome to my game",
        {font: "30px Arial", fill: "#FFFFFF"});
    player = game.add.sprite(10, 270, "playerImg");
    game.physics.arcade.enable(player);

    Labelscore = game.add.text(20, 20, "0");
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);
    generatePipe()
    pipeInterval = 1.75;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
        generatePipe);

    player.body.velocity.x = 200;
    player.body.gravity.y = 200;

}


function changescore() {
    score = score + 1;
    Labelscore.setText(score.toString())
}

function spaceHandler() {
    player.body.velocity.y = -100;
}

function generatePipe() {
    var gapStart = game.rnd.integerInRange(1, 5);
    for (var count = 0; count < 8; count = count + 1) {
        if (count != gapStart && count != gapStart + 1) {
            addPipeBlock(800, count * 50);
        }
    }
}

function addPipeBlock(x, y) {
    var pipe = game.add.sprite(x, y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -100;
}

//is function updates the scene. It is called for every new frame.

function update() {

}