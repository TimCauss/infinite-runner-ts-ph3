import Phaser from "phaser";
import SceneKeys from "./consts/SceneKeys";
import AnimationKeys from "./consts/AnimationKeys";
import TextureKeys from "./consts/TextureKeys";
import RocketMouse from "./game/RocketMouse";
import LaserObstacle from "./game/LaserObstacle";

export default class Game extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Game);
  }

  private background!: Phaser.GameObjects.TileSprite;
  private mouseHole!: Phaser.GameObjects.Image;
  private window1!: Phaser.GameObjects.Image;
  private window2!: Phaser.GameObjects.Image;
  private bookcase1!: Phaser.GameObjects.Image;
  private bookcase2!: Phaser.GameObjects.Image;
  private laserObstacle!: LaserObstacle;

  private bookcases: Phaser.GameObjects.Image[] = [];
  private windows: Phaser.GameObjects.Image[] = [];

  create() {
    //store the width and height of the game screen:
    const width = this.scale.width;
    const height = this.scale.height;

    //add background, setting it to the size of the game screen and fixed to the camera:
    this.background = this.add
      .tileSprite(0, 0, width, height, TextureKeys.Background)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);

    //add mouse hole:
    this.mouseHole = this.add.image(
      Phaser.Math.Between(900, 1500),
      503,
      TextureKeys.MouseHole
    );

    //add windows:
    this.window1 = this.add.image(
      Phaser.Math.Between(900, 1300),
      200,
      TextureKeys.Window1
    );
    this.window2 = this.add.image(
      Phaser.Math.Between(1600, 2000),
      200,
      TextureKeys.Window2
    );

    //Create a new array with the 2 widows:
    this.windows = [this.window1, this.window2];

    this.bookcase1 = this.add
      .image(Phaser.Math.Between(2200, 2700), 580, TextureKeys.Bookcase1)
      .setOrigin(0.5, 1);

    this.bookcase2 = this.add
      .image(Phaser.Math.Between(2900, 3400), 580, TextureKeys.Bookcase2)
      .setOrigin(0.5, 1);

    this.bookcases = [this.bookcase1, this.bookcase2];

    this.laserObstacle = new LaserObstacle(this, 900, 100);
    this.add.existing(this.laserObstacle);

    const mouse = new RocketMouse(this, width * 0.5, height - 30);
    this.add.existing(mouse);

    const body = mouse.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);

    //Set mouse x velocity:
    body.setVelocityX(200);

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30);

    this.cameras.main.startFollow(mouse);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);
  }

  update() {
    this.background.setTilePosition(this.cameras.main.scrollX);
    this.wrapMouseHole();
    this.wrapWindow();
    this.wrapBookcases();
    this.wrapLaserObstacle();
  }

  private wrapMouseHole() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    if (this.mouseHole.x + this.mouseHole.width < scrollX) {
      this.mouseHole.x = Phaser.Math.Between(rightEdge + 100, rightEdge + 1000);
    }

    const overlap = this.bookcases.find((bc) => {
      return Math.abs(this.mouseHole.x - bc.x) <= bc.width;
    });

    this.mouseHole.visible = !overlap;
  }

  private wrapWindow() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    let width = this.window1.width * 2;
    if (this.window1.x + width < scrollX) {
      this.window1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 800
      );

      //use find() to look for a bookcase that overlaps with the new window position
      const overlap = this.bookcases.find((bc) => {
        return Math.abs(this.window1.x - bc.x) <= this.window1.width;
      });

      //then set visible to true if there is no overlap
      // false if ther is an overlap
      this.window1.visible = !overlap;
    }

    width = this.window2.width;
    if (this.window2.x + width < scrollX) {
      this.window2.x = Phaser.Math.Between(
        this.window1.x + width,
        this.window1.x + width + 800
      );

      const overlap = this.bookcases.find((bc) => {
        return Math.abs(this.window2.x - bc.x) <= this.window2.width;
      });

      this.window2.visible = !overlap;
    }
  }

  private wrapBookcases() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    let width = this.bookcase1.width * 2;
    if (this.bookcase1.x + width < scrollX) {
      this.bookcase1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 800
      );

      const overlap = this.windows.find((win) => {
        return Math.abs(this.bookcase1.x - win.x) <= win.width;
      });

      this.bookcase1.visible = !overlap;
    }

    width = this.bookcase2.width * 2;
    if (this.bookcase2.x + width < scrollX) {
      this.bookcase2.x = Phaser.Math.Between(
        this.bookcase1.x + width,
        this.bookcase1.x + width + 800
      );

      const overlap = this.windows.find((win) => {
        return Math.abs(this.bookcase2.x - win.x) <= win.width;
      });

      this.bookcase2.visible = !overlap;
    }
  }

  private wrapLaserObstacle() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    const width = this.laserObstacle.width;

    if (this.laserObstacle.x + width < scrollX) {
      this.laserObstacle.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 1000
      );

      this.laserObstacle.y = Phaser.Math.Between(0, 300);
    }
  }
}
