import {
  BoxGeometry,
  Color,
  Fog,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { BaseScene } from "./base_scene";

export class GameScene extends BaseScene {
  private _mesh: Mesh | null = null;

  public constructor(container: HTMLDivElement) {
    super({
      renderer: new WebGLRenderer({
        antialias: true,
      }),
      camera: new PerspectiveCamera(
        70,
        container.offsetWidth / container.offsetHeight,
        0.1,
        100
      ),
      container: container,
    });
  }

  public load() {
    this._camera.position.z = 2;
    this._scene.background = new Color(0x88ccee);
    this._scene.fog = new Fog(0x88ccee, 0, 50);

    const geometry = new BoxGeometry();
    const texture = new TextureLoader().load("textures/crate.gif");
    texture.colorSpace = SRGBColorSpace;

    const material = new MeshBasicMaterial({ map: texture });

    this._mesh = new Mesh(geometry, material);
    this._scene.add(this._mesh);

    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(
      this._container.offsetWidth,
      this._container.offsetHeight
    );
    this._renderer.render(this._scene, this._camera);
    this._renderer.setAnimationLoop(this._animate);
    window.addEventListener("resize", this._onWindowResize);
  }

  private _onWindowResize = () => {
    debugger;
    this._camera.aspect =
      this._container.offsetWidth / this._container.offsetHeight;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(
      this._container.offsetWidth,
      this._container.offsetHeight
    );
  };

  private _animate = () => {
    if (this._mesh) {
      this._mesh.rotation.x += 0.005;
      this._mesh.rotation.y += 0.01;
    }
    this._renderer.render(this._scene, this._camera);
  };
}
