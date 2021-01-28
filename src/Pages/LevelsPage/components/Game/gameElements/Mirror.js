import GameObject from './GameObject';
import GameObjectFabric from './GameObjectFabric';
import SIZES from '../constants/SIZES';

export default class Mirror extends GameObject {
  constructor(scene, x = 0, y = 0, texture = 'char', isSetupOnField) {
    super(scene, x, y, texture, isSetupOnField);
    const mirrorUpType = this.texture.key.replace('down', 'up');
    this.mirrorUp = new GameObjectFabric(scene, x, y - SIZES.blocksInTile, mirrorUpType);
    this._addListenerToWrench();
  }

  _addListenerToWrench() {
    this.on('pointerdown', (pointer) => {
      if (pointer.primaryDown) {
        const actionType = this.scene.activeItem.image.texture.key;
        if (actionType.includes('wrench')) {
          this._toggleType(this);
          this._toggleType(this.mirrorUp);
          this.scene.stock.removeActiveItem();
          this.scene.activeItem.reset();
          this.scene.refreshLasers();
        }
      }
    });
  }

  _toggleType(object) {
    let newTexture = object.texture.key;
    newTexture = newTexture.includes('left')
      ? newTexture.replace('left', 'right')
      : newTexture.replace('right', 'left');
    object.setTexture(newTexture);
  }

  explode() {
    this.scene.removeItem(this.scene.collideObjects, this);
    this.scene.refreshLasers();
    this.mirrorUp.destroy();
    this.destroy();
  }
}
