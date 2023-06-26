import Phaser, { Scene } from "phaser";

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class RocketMouse extends Phaser.GameObjects.Container {
  private flames: Phaser.GameObjects.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private mouse: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    //Get CursorKeys Instance
    this.cursors = scene.input.keyboard.createCursorKeys();

    // Create a rocketmouse Sprite:
    this.mouse = scene.add
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
    this.add(this.mouse);

    // Add a physics body:
    scene.physics.add.existing(this);

    // adjust physics body size and offset:
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.mouse.width - 29, this.mouse.height);
    body.setOffset(this.mouse.width * -0.5, -this.mouse.height);
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    //check if Space bar is down:
    if (this.cursors.space?.isDown) {
      //set y acceleration
      body.setAccelerationY(-900);
      //change enableJetpack Status:
      this.enableJetpack(true);
      //play the flying animation
      this.mouse.play(AnimationKeys.RocketMouseFly);
    } else {
      //turn off acceleration otherwise:
      body.setAccelerationY(0);
      this.enableJetpack(false);
    }

    if (body.blocked.down) {
      //play run when touching the ground:
      this.mouse.play(AnimationKeys.RocketMouseRun, true);
    } else if (body.velocity.y > 0) {
      //play fall animation when y valocity is positive
      this.mouse.play(AnimationKeys.RocketMouseFall, true);
    }
  }

  enableJetpack(enabled: boolean) {
    this.flames.setVisible(enabled);
  }
}
