import * as Phaser from 'phaser';
import SceneMain from './sceneMain';
import './styles/styles.scss';

const isDev = process.env.NODE_ENV === 'development';

window.onload = function () {
  let containerId = 'game-container';
  let container = document.getElementById(containerId);
  let config = {
    type: Phaser.AUTO,
    width: container.clientWidth,
    height: container.clientHeight,
    parent: containerId,
    scene: [SceneMain],
    physics: {
      default: 'matter',
      matter: {
        debug: isDev
      }
    }
  };

  window.game = new Phaser.Game(config);
};
