import LASER_OFFSET from '../constants/LASER_OFFSET';
import mirrorsReflection from './mirrorsReflection';
import FlyWeight from './RaysFabric';

export default class RaysGenerator {
  constructor(scene, x, y, direction) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.rays = [];
    this._drawRays(direction);
  }

  _drawRays(direction) {
    const { mainAxis, increment } = LASER_OFFSET[direction];
    let isLastRay = false;
    let mirrorType = null;

    for (this[mainAxis] = this[mainAxis] + increment; !isLastRay; this[mainAxis] += increment) {
      if (this._isCollisionWithRock(this.x, this.y)) {
        break;
      }

      for (let j = 0; j < this.scene.collideObjects.length; j++) {
        const item = this.scene.collideObjects[j];
        if (this.x === item.x && this.y === item.y) {
          isLastRay = this._playCollision(direction, item);
          if (isLastRay) {
            mirrorType = item.texture.split('-')[2];
          }
        }
      }

      const ray = new FlyWeight(mainAxis, this.scene, this.x, this.y, direction, isLastRay, mirrorType);
      this.rays.push(ray);
    }
  }

  _isCollisionWithRock(x, y) {
    const tile = this.scene.map.getTileAt(x / 10, y / 10);
    return (tile?.properties?.type === 'rock');
  }

  _playCollision(currentDirection, item) {
    if (item.texture.includes('mirror-down-')) {
      const mirrorType = item.texture.split('-')[2];
      const rays = new RaysGenerator(
        this.scene,
        item.x,
        item.y,
        mirrorsReflection(mirrorType, currentDirection),
      );
      this.rays.push(...rays.rays);
      return true;
    }
  }
}
