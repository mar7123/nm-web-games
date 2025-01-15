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

  public abstract load(): void;

  public render(div: HTMLDivElement): void {
    div.appendChild(this._renderer.domElement);
  }
}
