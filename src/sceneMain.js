import * as Phaser from 'phaser';
import Player from './player';
import Ground from './assets/sceneMain/ground.jpg';
import Box from './assets/sceneMain/box.jpg';
import Animations from './assets/ninja/animations.json.data';
import Ninja from './assets/ninja/ninja.png';
import NinjaAtlas from './assets/ninja/atlas.json.data';
import Grid from './utils/grid';

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }

  preload() {
    this.load.image('ground', Ground);
    this.load.image('box', Box);
    this.load.animation('ninjaData', Animations);
    this.load.atlas('ninja', Ninja, NinjaAtlas);
  }

  create() {
    this.matter.world.setBounds(0, 0, this.game.config.width, this.game.config.height, 32, true, true, false, true);

    this.grid = new Grid(this, 20);
    this.grid.showGrid(true);

    let coords = this.grid.getCoords(1, 2);
    this.player = new Player(this, coords.x, coords.y, 'ninja', 'ninja');
    this.player.on('created', () => console.log('player created'));
    window.player = this.player;

    this.box = this.matter.add.sprite(0, 0, 'box', null, {isStatic: true});
    this.box.setBounce(0);
    this.box.setFriction(0.5);
    this.box.body.label = 'box';
    this.box.body.jump = true;
    this.box.setInteractive();
    this.grid.scale(this.box);
    this.grid.placeAt(7, 1, this.box);
    this.box.on('pointerdown', () => this.player.goOn(this.box));

    this.makeGround(0, 0, this.grid.cols);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    if (this.cursors.left.isDown) {
      this.player.runLeft();
    } else if (this.cursors.right.isDown) {
      this.player.runRight();
    }
    if (this.cursors.up.isDown) {
      this.player.jump();
    }
  }

  placeBlock(col, row) {
    let block = this.matter.add.sprite(0, 0, 'ground', null, {isStatic: true});
    block.body.label = 'ground';
    block.body.jump = true;
    this.grid.scale(block);
    this.grid.placeAt(col, row, block, 'center', 'bottom');
  }

  makeGround(row, colStart, colEnd) {
    for (let col = colStart; col <= colEnd; col++) {
      this.placeBlock(col, row);
    }
  }
}
