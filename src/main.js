import * as Phaser from 'phaser';
import SceneMain from './sceneMain';
import './styles/styles.css';

window.onload = function () {
  let containerId = 'game-container';
  let container = document.getElementById(containerId);
  let config = {
    type: Phaser.AUTO,
    width: container.clientWidth,
    height: container.clientHeight,
    parent: 'game-container',
    scene: [SceneMain],
    physics: {
      default: 'matter',
      matter: {
        gravity: {
          y: 1
        },
        debug: true
      }
    }
  };

  window.game = new Phaser.Game(config);
};
