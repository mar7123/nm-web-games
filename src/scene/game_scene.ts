import {
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  SphereGeometry,
  WebGLRenderer,
  MeshStandardMaterial,
  PointLight,
  Raycaster,
  Object3DEventMap,
  Vector2,
  PCFSoftShadowMap,
  AmbientLight,
  BoxGeometry,
  CylinderGeometry,
  Color,
} from "three";
import { BaseScene } from "./base_scene";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export class GameScene extends BaseScene {
  private _isDragging: boolean = false;
  private _raycaster: Raycaster | null = null;
  private _orbitControls: OrbitControls | null = null;
  private _paddle1: Mesh<
    CylinderGeometry,
    MeshStandardMaterial,
    Object3DEventMap
  > | null = null;
  private _paddle2: Mesh<
    CylinderGeometry,
    MeshStandardMaterial,
    Object3DEventMap
  > | null = null;
  private _puck: Mesh<
    CylinderGeometry,
    MeshStandardMaterial,
    Object3DEventMap
  > | null = null;
  private _table: Mesh<
    BoxGeometry,
    MeshStandardMaterial,
    Object3DEventMap
  > | null = null;

  public constructor(container: HTMLDivElement) {
    super({
      renderer: new WebGLRenderer({
        antialias: true,
      }),
      camera: new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      ),
      container: container,
    });
    this._camera.position.set(0, 4, 5);
    this._camera.lookAt(0, 0, 0);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(container.offsetWidth, container.offsetHeight);
  }

  // public setSecondaryBall = (): void => {
  //   const ballGeometry = new SphereGeometry(1, 32, 32);
  //   const ballMaterial = new MeshStandardMaterial({ color: 0xff5733 });
  //   this._secondayBall = new Mesh(ballGeometry, ballMaterial);
  //   this._secondayBall.position.y = 1;
  //   this._secondayBall.castShadow = true;
  //   this._scene.add(this._secondayBall);
  // };

  // public deleteSecondaryBall = (): void => {
  //   if (this._secondayBall) this._scene.remove(this._secondayBall);
  //   this._secondayBall?.geometry.dispose();
  //   this._secondayBall?.material.dispose();
  //   this._secondayBall = null;
  // };

  protected _loadMesh() {
    const tableGeometry = new BoxGeometry(6, 0.2, 3);
    const tableMaterial = new MeshStandardMaterial({ color: 0x0099ff });
    this._table = new Mesh(tableGeometry, tableMaterial);
    this._table.position.y = -0.1;
    this._scene.add(this._table);

    const paddleGeometry = new CylinderGeometry(0.3, 0.3, 0.1, 32);

    const paddle1Material = new MeshStandardMaterial({ color: 0xff0000 });
    this._paddle1 = new Mesh(paddleGeometry, paddle1Material);
    this._paddle1.position.set(-2, 0.05, 0);
    this._table;
    this._scene.add(this._paddle1);

    const paddle2Material = new MeshStandardMaterial({ color: 0x00ff00 });
    this._paddle2 = new Mesh(paddleGeometry, paddle2Material);
    this._paddle2.position.set(2, 0.05, 0);
    this._scene.add(this._paddle2);

    const puckGeometry = new CylinderGeometry(0.2, 0.2, 0.05, 32);
    const puckMaterial = new MeshStandardMaterial({ color: 0x111111 });
    this._puck = new Mesh(puckGeometry, puckMaterial);
    this._puck.position.set(0, 0.025, 0);
    this._scene.add(this._puck);

    const light = new PointLight(0xffffff, 1.2);
    light.position.set(0, 5, 5);
    this._scene.add(light);

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    this._scene.add(ambientLight);

    this._scene.background = new Color(0x222222);

    this._orbitControls = new OrbitControls(
      this._camera,
      this._renderer.domElement
    );

    this._raycaster = new Raycaster();

    window.addEventListener("pointerdown", this._onPointerDown);
    window.addEventListener("pointerup", this._onPointerUp);
    window.addEventListener("pointermove", this._onPointerMove);
  }

  protected _setAnimationLoop(): void {}

  private _onPointerDown = (event: PointerEvent): void => {
    this._updateRaycaster(event);
    this._isDragging = true;
    if (this._raycaster && this._paddle1 && this._orbitControls) {
      const intersectsBall = this._raycaster.intersectObject(this._paddle1);
      if (intersectsBall.length > 0) {
        this._orbitControls.enabled = false;
      }
    }
  };

  private _onPointerUp = (event: PointerEvent): void => {
    this._updateRaycaster(event);
    this._isDragging = false;
    if (this._orbitControls) this._orbitControls.enabled = true;
  };

  private _onPointerMove = (event: PointerEvent): void => {
    if (
      !this._isDragging ||
      !this._raycaster ||
      !this._orbitControls ||
      !this._paddle1 ||
      !this._table
    )
      return;

    this._updateRaycaster(event);

    if (!this._orbitControls.enabled) {
      const intersectsPlane = this._raycaster.intersectObject(this._table);
      if (intersectsPlane.length > 0) {
        const point = intersectsPlane[0].point;
        this._paddle1.position.set(point.x, 0.05, point.z);
      }
    }
  };

  private _updateRaycaster = (event: PointerEvent): void => {
    if (!this._raycaster) return;
    const mouse = new Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    this._raycaster.setFromCamera(mouse, this._camera);
  };
}
