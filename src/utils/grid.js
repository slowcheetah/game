export default class Grid {
  constructor(scene, cols) {
    this.scene = scene;
    this.cols = cols;
    this.rows = null;
    this.container = {id: null, width: null, height: null};
    this.cellSize = null;
    this.delta = null;
    this.calculate();
  }
  calculate() {
    this.container = {
      width: this.scene.game.config.width,
      height: this.scene.game.config.height
    };
    this.cellSize = this.container.width / this.cols;
    this.rows = Math.ceil(this.container.height / this.cellSize);
    this.delta = 1280 / this.container.width;  // todo delta
    //this.scene.matter.world.setGravity(0, this.gravityDelta);
  }
  showGrid(numbers = false) {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(1, 0xff0000);
    // vertical
    for (let x = this.container.width; x > 0; x -= this.cellSize) {
      this.graphics.moveTo(x, 0);
      this.graphics.lineTo(x, this.container.height).setDepth(99);
    }
    // horizontal
    for (let y = this.container.height; y > 0 ; y -= this.cellSize) {
      this.graphics.moveTo(0, y);
      this.graphics.lineTo(this.container.width, y).setDepth(99);
    }
    this.graphics.strokePath();
    if (numbers) {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          let text = this.scene.add.text(0, 0, `${col}:${row}`, {color: '#ffffff'});
          this.placeAt(col, row, text);
        }
      }
    }
  }
  placeAt(col, row, obj, alignX = 'center', alignY = 'center') {
    let coords = this.getCoords(col, row);
    obj.setOrigin(0.5, 0.5);
    if (alignX === 'left') {
      coords.x += obj.displayWidth / 2;
    } else if (alignX === 'right') {
      coords.x += this.cellSize - (obj.displayWidth / 2);
    } else {
      coords.x += this.cellSize / 2;
    }
    if (alignY === 'top') {
      coords.y += obj.displayHeight / 2;
    } else if (alignY === 'bottom') {
      coords.y += this.cellSize - (obj.displayHeight / 2);
    } else {
      coords.y += this.cellSize / 2;
    }
    obj.setPosition(coords.x, coords.y);
  }
  getCoords(col, row) {
    return {
      x: this.cellSize * col,
      y: this.container.height - (this.cellSize * (row + 1))
    }
  }
  scale(obj, ratio = 1) {
    let delta = this.cellSize / obj.displayWidth;
    obj.displayWidth = obj.displayWidth * delta * ratio;
    obj.scaleY = obj.scaleX;
  }
};
