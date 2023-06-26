import Phaser, { Scene } from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class RocketMouse extends Phaser.GameObjects.Container {
  private flames: Phaser.GameObjects.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    //Get CursorKeys Instance
    this.cursors = scene.input.keyboard.createCursorKeys();

    // Create a rocketmouse Sprite:
    const mouse = scene.add
      .sprite(0, 0, TextureKeys.RocketMouse)
      .setOrigin(0.5, 1)
      .play(AnimationKeys.RocketMouseRun);

    //create the flames and play the aimation:
    this.flames = scene.add
      .sprite(-63, -15, TextureKeys.RocketMouse)
      .play(AnimationKeys.RocketFlamesOn);

    this.enableJetpack(false);

    // Add the RocketMosue and flames as childs of Container:
    this.add(this.flames); //Flame first  = behind the mouse
    this.add(mouse);

    // Add a physics body:
    scene.physics.add.existing(this);

    // adjust physics body size and offset:
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(mouse.width - 29, mouse.height);
    body.setOffset(mouse.width * -0.5, -mouse.height);
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    //check if Space bar is down:
    if (this.cursors.space?.isDown) {
      //set y acceleration to -600
      body.setAccelerationY(-900);
      this.enableJetpack(true);
    } else {
      //turn off acceleration otherwise:
      body.setAccelerationY(0);
      this.enableJetpack(false);
    }
  }

  enableJetpack(enabled: boolean) {
    this.flames.setVisible(enabled);
  }
}
