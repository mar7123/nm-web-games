import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

export abstract class BaseScene {
  protected _container: HTMLDivElement;
  protected _renderer: WebGLRenderer;
  protected _camera: PerspectiveCamera;
  protected readonly _scene: Scene;

  public constructor({
    container,
    renderer,
    camera,
  }: {
    container: HTMLDivElement;
    renderer: WebGLRenderer;
    camera: PerspectiveCamera;
  }) {
    this._container = container;
    this._renderer = renderer;
    this._camera = camera;
    this._scene = new Scene();
  }

  private _setWindowResizeListener = (): void => {
    window.removeEventListener("resize", this._onWindowResize);
    window.addEventListener("resize", this._onWindowResize);
  };

  private _onWindowResize = (): void => {
    this._camera.aspect =
      this._container.offsetWidth / this._container.offsetHeight;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(
      this._container.offsetWidth,
      this._container.offsetHeight
    );
  };

  private _animate = (): void => {
    this._setAnimationLoop();
    this._renderer.render(this._scene, this._camera);
  };

  protected abstract _loadMesh(): void;

  protected abstract _setAnimationLoop(): void;

  public render = (div: HTMLDivElement): void => {
    this._loadMesh();
    this._renderer.setAnimationLoop(this._animate);
    this._setWindowResizeListener();
    div.appendChild(this._renderer.domElement);
  };
}
