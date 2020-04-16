export default class Grid {
  constructor(scene, cols, rows) {
    this.scene = scene;
    this.rows = rows;
    this.cols = cols;
    this.container = {id: null, width: null, height: null};
    this.cellWidth = null;
    this.cellHeight = null;
    this.calculate();
  }
  calculate() {
    this.container = {
      width: this.scene.game.config.width,
      height: this.scene.game.config.height
    };
    this.cellWidth = this.container.width / this.cols;
    this.cellHeight = this.container.height / this.rows;
  }
  showGrid(numbers = false) {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(1, 0xff0000);
    for (let i = 0; i < this.container.width; i += this.cellWidth) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.container.height).setDepth(99);
    }
    for (let i = 0; i < this.container.height; i += this.cellHeight) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.container.width, i).setDepth(99);
    }
    this.graphics.strokePath();
    if (numbers) {
      let count = 0;
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          let text = this.scene.add.text(0, 0, count, {color: '#ffffff'});
          this.placeAt(count, text);
          count++;
        }
      }
    }
  }
  placeAt(index, obj, alignX = 'center', alignY = 'center') {
    let coords = this.getCoords(index);
    obj.setOrigin(0.5, 0.5);
    if (alignX === 'left') {
      coords.x += obj.displayWidth / 2;
    } else if (alignX === 'right') {
      coords.x += this.cellWidth - (obj.displayWidth / 2);
    } else {
      coords.x += this.cellWidth / 2;
    }
    if (alignY === 'top') {
      coords.y += obj.displayHeight / 2;
    } else if (alignY === 'bottom') {
      coords.y += this.cellHeight - (obj.displayHeight / 2);
    } else {
      coords.y += this.cellHeight / 2;
    }
    obj.setPosition(coords.x, coords.y);
  }
  getCoords(index) {
    let row = Math.floor(index / this.cols);
    let col = index - (row * this.cols);
    return {
      x: this.cellWidth * col,
      y: this.cellHeight * row
    }
  }
  scale(obj, ratio = 1) {
    let delta = this.cellWidth / obj.displayWidth;
    obj.displayWidth = obj.displayWidth * delta * ratio;
    obj.scaleY = obj.scaleX;
  }
};
