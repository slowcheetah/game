window.onload = function () {
  let containerId = 'game-container';
  let container = document.getElementById(containerId);
  let config = {
    type: Phaser.AUTO,
    width: container.clientWidth,
    height: container.clientHeight,
    parent: 'game-container',
    scene: [SceneMain]
  };

  window.game = new Phaser.Game(config);
};