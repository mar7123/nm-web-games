import {
  AmbientLight,
  DirectionalLight,
  DoubleSide,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Plane,
  PlaneGeometry,
  Raycaster,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { BaseScene } from "./base_scene";

export class GameScene extends BaseScene {
  private _ball: Mesh | null = null;
  private _mouse: Vector2 | null = null;
  private _planeNormal: Vector3 | null = null;
  private _planePoint: Vector3 | null = null;
  private _rayCaster: Raycaster | null = null;

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
    this._camera.position.set(5, 5, 5);
    this._camera.lookAt(0, 0, 0);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(container.offsetWidth, container.offsetHeight);
  }

  protected _loadMesh() {
    const planeGeometry = new PlaneGeometry(10, 10);
    const planeMaterial = new MeshBasicMaterial({
      color: 0x007700,
      side: DoubleSide,
    });
    const plane = new Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);

    const ballGeometry = new SphereGeometry(0.5, 32, 32);
    const ballMaterial = new MeshBasicMaterial({ color: 0xff0000 });
    this._ball = new Mesh(ballGeometry, ballMaterial);
    this._ball.position.set(0, 0.5, 0);
    this._scene.add(this._ball);

    const ambientLight = new AmbientLight(0xffffff, 0.7);
    this._scene.add(ambientLight);
    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    this._scene.add(directionalLight);

    this._mouse = new Vector2();
    this._planeNormal = new Vector3(0, 1, 0);
    this._planePoint = new Vector3(0, 0, 0);
    this._rayCaster = new Raycaster();

    window.addEventListener("mousemove", this._onMouseMove);
  }

  protected _setAnimationLoop(): void {}

  private _onMouseMove = (event: MouseEvent): void => {
    event.preventDefault();
    if (
      !this._ball ||
      !this._mouse ||
      !this._rayCaster ||
      !this._planeNormal ||
      !this._planePoint
    )
      return;

    this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this._mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this._rayCaster.setFromCamera(this._mouse, this._camera);

    const planeIntersect = new Plane(
      this._planeNormal,
      -this._planePoint.dot(this._planeNormal)
    );
    const intersectionPoint = new Vector3();

    if (this._rayCaster.ray.intersectPlane(planeIntersect, intersectionPoint)) {
      this._ball.position.x = MathUtils.clamp(intersectionPoint.x, -5, 5);
      this._ball.position.z = MathUtils.clamp(intersectionPoint.z, -5, 5);
    }
  };
}
