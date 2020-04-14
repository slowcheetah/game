import * as Phaser from 'phaser';
import Helper from "./utils/helper";
import Align from "./utils/align";

export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture, label = null) {
    super(scene.matter.world, x, y, texture);
    this.label = (label === null) ? texture : label;
    this.canJump = true;
    this.goingOn = null;
    this.goingTo = null;
    scene.add.existing(this);
    Align.scaleToGameW(this, .10);
    this.play('idle');

    scene.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
      let body1 = Helper.getRootBody(bodyA);
      let body2 = Helper.getRootBody(bodyB);
      if (body1.label === this.label || body2.label === this.label) {
        let other = (body1.label === this.label) ? body2 : body1;
        if (other.hasOwnProperty('jump') && other.jump) {
          this.canJump = true;
        }
        /*if (this.goingTo !== null && this.goingTo.object.body.label === other.label) {  // todo
          this.goingTo = null;
          console.log('Target reached');
        }*/
        if (this.goingOn !== null && this.goingOn.destination.body.label === other.label) {
          if (typeof this.goingOn.callback === 'function') {
            this.goingOn.callback();
          }
        }
      }
    });

    scene.time.addEvent({delay: 50, callback: this.delayDone, callbackScope: this, loop: false});
    scene.time.addEvent({delay: 16.6, callback: this.customUpdate, callbackScope: this, loop: true});
  }
  delayDone() {
    this.setRectangle(this.displayWidth, this.displayHeight);
    this.body.label = this.label;
    this.setFixedRotation().setFriction(0.05).setBounce(0);
    this.emit('created');
  }
  jump() {
    if (this.canJump) {
      this.setVelocityY(-9);
      this.canJump = false;
    }
  }
  runLeft() {
    (this.canJump) ? this.setVelocityX(-4) : this.setVelocityX(-3);
  }
  runRight() {
    (this.canJump) ? this.setVelocityX(4) : this.setVelocityX(3);
  }
  goOn(obj) {
    let goingOn = {
      destination: obj,
      direction: (obj.x < this.x) ? -1 : 1,
      callback: () => {
        let direction = this.goingOn.direction;
        this.goingOn = null;
        this.jump();
        setTimeout(() => {
          this.setVelocityX(2 * direction);
          console.log('Target reached');
        }, 150);
      }
    };
    let destBounds = obj.getBounds();
    let thisBounds = this.getBounds();
    if (obj.x < this.x && destBounds.right >= thisBounds.left && Math.abs(thisBounds.bottom - destBounds.top) > 1) {
      this.goingOn = goingOn;
      this.goingOn.callback();
    } else if (obj.x > this.x && destBounds.left <= thisBounds.right && Math.abs(thisBounds.bottom - destBounds.top) > 1) {
      this.goingOn = goingOn;
      this.goingOn.callback();
    } else if (thisBounds.right < destBounds.left || thisBounds.left > destBounds.right) {
      this.goingOn = goingOn;
    }
  }
  goTo(obj) {
    // todo
  }
  customUpdate() {
    if (this.goingOn !== null) {
      (this.goingOn.direction < 0) ? this.runLeft() : this.runRight();
    }

    let anim = this.anims.currentAnim.key;
    if (this.body.velocity.x > 2) {
      this.flipX = false;
      if (anim !== 'run' && (anim !== 'jump' || this.body.velocity.y >= 5)) {
        this.play('run');
      }
    } else if (this.body.velocity.x < -2) {
      this.flipX = true;
      if (anim !== 'run' && (anim !== 'jump' || this.body.velocity.y >= 5)) {
        this.play('run');
      }
    }
    if (this.body.velocity.y < -2 && anim !== 'jump') {
      this.play('jump');
    }
    if (this.body.velocity.x > -2 && this.body.velocity.x < 2 && this.body.velocity.y >= -2 && anim !== 'idle') {
      this.play('idle');
    }
  }
}
