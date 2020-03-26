class SceneMain extends Phaser.Scene
{
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.animation('ninjaData', 'data/ninja/animations.json');
        this.load.atlas("ninja", "data/ninja/ninja.png", "data/ninja/atlas.json");
    }
    create() {
        this.aGrid = new AlignGrid({scene: this, rows: 11, cols: 11});
        this.aGrid.showNumbers();

        this.ninja = this.add.sprite(200, 200, 'ninja');
        this.ninja.play("idle");
        window.ninja = this.ninja;
    }
    update() {

    }
}