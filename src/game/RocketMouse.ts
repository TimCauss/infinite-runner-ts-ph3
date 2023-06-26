import Phaser from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class RocketMouse extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Create a rocketmouse Sprite:
    const mouse = scene.add
      .sprite(0, 0, TextureKeys.RocketMouse)
      .setOrigin(0.5, 1)
      .play(AnimationKeys.RocketMouseRun);

    //create the flmes and play the aimation:
    const flames = scene.add
      .sprite(0, 0, TextureKeys.RocketMouse)
      .play(AnimationKeys.RocketFlamesOn);

    // Add the RocketMosue and flames as childs of Container:
    this.add(mouse);
    this.add(flames);

    // Add a physics body:
    scene.physics.add.existing(this);

    // adjust physics body size and offset:
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(mouse.width - 29, mouse.height);
    body.setOffset(mouse.width * -0.5, -mouse.height);
  }
}
