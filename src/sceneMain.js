import * as Phaser from 'phaser';
import Player from './player';
import AlignGrid from './utils/alignGrid';
import Align from './utils/align';
import Ground from './assets/sceneMain/ground.jpg';
import Box from './assets/sceneMain/box.jpg';
import Animations from './assets/ninja/animations.json.data';
import Ninja from './assets/ninja/ninja.png';
import NinjaAtlas from './assets/ninja/atlas.json.data';

console.log(Ground);
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
        this.matter.world.setBounds(0, 0, game.config.width, game.config.height, 32, true, true, false, true);

        this.aGrid = new AlignGrid({scene: this, rows: 11, cols: 11});
        //this.aGrid.showNumbers();

        let coords = this.aGrid.getIndexCoords(101);
        this.player = new Player(this, coords.x, coords.y, 'ninja', 'ninja');
        this.player.on('created', () => console.log('player created'));
        window.player = this.player;

        this.box = this.matter.add.sprite(0, 0, 'box', null, {isStatic: true});
        this.box.setBounce(0);
        this.box.setFriction(0.5);
        this.box.body.label = 'box';
        this.box.body.jump = true;
        this.box.setInteractive();
        this.aGrid.placeAtIndex(103, this.box);
        Align.scaleToGameW(this.box, .065);
        this.box.on('pointerdown', () => this.player.goOn(this.box));

        this.makeGround(110, 120);

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update() {
        if (this.cursors.left.isDown) {
            this.player.runLeft();
        } else if (this.cursors.right.isDown) {
            this.player.runRight();
        }
        if (this.cursors.up.isDown) {
            this.player.jump();
        }
    }
    placeBlock(pos) {
        let block = this.matter.add.sprite(0, 0, 'ground', null, {isStatic: true});
        block.body.label = 'ground';
        block.body.jump = true;
        this.aGrid.placeAtIndex(pos, block);
        Align.scaleToGameW(block, .091)
    }
    makeGround(start, end) {
        for (let i = start; i <= end; i++) {
            this.placeBlock(i);
        }
    }
}
