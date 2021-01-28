import Phaser from 'phaser';
import visibilityPriority from '../utils/visibilityPriority';

class Rays extends Phaser.Physics.Arcade.Sprite {
  constructor(...props) {
    super(...props);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setInteractive({ cursor: 'pointer' });
    this.setDepth(visibilityPriority('ray'));

    this._setCollisionWithChar();
    this._setCollisionWithBombs();
    this._setCollisionWithLasers();
  }

  _setCollisionWithChar() {
    this.scene.physics.add.collider(this, this.scene.char, this.scene.interactionWithChar);
  }

  _setCollisionWithBombs() {
    this.scene.collideObjects.forEach((item) => {
      if (item.texture.key === 'bomb') {
        this.scene.physics.add.collider(item, this, this._collideWithBombs);
      }
    });
  }

  _collideWithBombs(item) {
    item.detonate();
  }

  _setCollisionWithLasers() {
    this.scene.collideObjects.forEach((item) => {
      if (item.texture.key.includes('laser')) {
        this.scene.physics.add.collider(item, this, this._collideWithLasers);
      }
    });
  }

  _collideWithLasers(item) {
    item.detonate();
  }
}

class RayHor extends Rays {
  constructor(scene, x, y, direction, isLastRay, mirrorType) {
    super(scene, x, y, 'rayHor');

    if (isLastRay) {
      this._setLastTexture(direction, mirrorType);
    }
    else {
      this._setOffset();
    }
  }

  _setLastTexture(direction, mirrorType) {
    if (direction === mirrorType) {
      this.setTexture(`ray-short-${mirrorType}`);
    }
    else {
      this.setTexture(`ray-angle-from-${mirrorType}`);
      this.setDepth(visibilityPriority('ray-priority'));
    }
  }

  _setOffset() {
    this.setPosition(this.x, this.y - 10);
  }
}

class RayVert extends Rays {
  constructor(scene, x, y, direction, isLastRay, mirrorType) {
    super(scene, x, y, 'rayVert');

    if (isLastRay) {
      this._setLastTexture(direction, mirrorType);
    }
  }

  _setLastTexture(direction, mirrorType) {
    if (direction === 'bottom') {
      this.setTexture(`ray-short-${mirrorType}`);
    }
    else if (direction === 'top') {
      this.setTexture(`ray-angle-from-${mirrorType}`);
      this.setDepth(visibilityPriority('ray-priority'));
    }
  }
}

export default class RaysFabric {
  constructor(primAxis, ...props) {
    if (primAxis === 'x') {
      return new RayHor(...props);
    }
    if (primAxis === 'y') {
      return new RayVert(...props);
    }
  }
}
