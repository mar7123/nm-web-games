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
} from "three";
import { BaseScene } from "./base_scene";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export class GameScene extends BaseScene {
  private _isDragging: boolean = false;
  private _mouse: Vector2 | null = null;
  private _raycaster: Raycaster | null = null;
  private _orbitControls: OrbitControls | null = null;
  private _primaryBall: Mesh<
    SphereGeometry,
    MeshStandardMaterial,
    Object3DEventMap
  > | null = null;
  private _secondayBall: Mesh<
    SphereGeometry,
    MeshStandardMaterial,
    Object3DEventMap
  > | null = null;
  private _plane: Mesh<
    PlaneGeometry,
    MeshStandardMaterial,
    Object3DEventMap
  > | null = null;

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
    this._renderer.shadowMap.enabled = true; // Enable shadow maps
    this._renderer.shadowMap.type = PCFSoftShadowMap;
  }

  public setSecondaryBall = (): void => {
    const ballGeometry = new SphereGeometry(1, 32, 32);
    const ballMaterial = new MeshStandardMaterial({ color: 0xff5733 });
    this._secondayBall = new Mesh(ballGeometry, ballMaterial);
    this._secondayBall.position.y = 1;
    this._secondayBall.castShadow = true;
    this._scene.add(this._secondayBall);
  };

  public deleteSecondaryBall = (): void => {
    if (this._secondayBall) this._scene.remove(this._secondayBall);
    this._secondayBall?.geometry.dispose();
    this._secondayBall?.material.dispose();
    this._secondayBall = null;
  };

  protected _loadMesh() {
    const planeGeometry = new PlaneGeometry(20, 20);
    const planeMaterial = new MeshStandardMaterial({ color: 0x808080 });
    this._plane = new Mesh(planeGeometry, planeMaterial);
    this._plane.rotation.x = -Math.PI / 2;
    this._plane.receiveShadow = true;
    this._scene.add(this._plane);

    const ballGeometry = new SphereGeometry(1, 32, 32);
    const ballMaterial = new MeshStandardMaterial({ color: 0xff5733 });
    this._primaryBall = new Mesh(ballGeometry, ballMaterial);
    this._primaryBall.position.y = 1;
    this._primaryBall.castShadow = true;
    this._scene.add(this._primaryBall);

    const light = new PointLight(0xffffff, 15, 0);
    light.position.set(5, 10, 5);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    this._scene.add(light);

    const ambientLight = new AmbientLight(0x404040, 3);
    this._scene.add(ambientLight);

    this._orbitControls = new OrbitControls(
      this._camera,
      this._renderer.domElement
    );

    this._raycaster = new Raycaster();
    this._mouse = new Vector2();

    window.addEventListener("pointerdown", this._onPointerDown);
    window.addEventListener("pointerup", this._onPointerUp);
    window.addEventListener("pointermove", this._onPointerMove);
  }

  protected _setAnimationLoop(): void {}

  private _onPointerDown = (event: PointerEvent): void => {
    this._updateRaycaster(event);
    this._isDragging = true;
    if (this._raycaster && this._primaryBall && this._orbitControls) {
      const intersectsBall = this._raycaster.intersectObject(this._primaryBall);
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
      !this._mouse ||
      !this._raycaster ||
      !this._orbitControls ||
      !this._primaryBall ||
      !this._plane
    )
      return;

    this._updateRaycaster(event);

    if (!this._orbitControls.enabled) {
      const intersectsPlane = this._raycaster.intersectObject(this._plane);
      if (intersectsPlane.length > 0) {
        const point = intersectsPlane[0].point;
        this._primaryBall.position.set(point.x, 1, point.z);
      }
    }
  };

  private _updateRaycaster = (event: PointerEvent): void => {
    if (!this._mouse || !this._raycaster) return;
    this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this._mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this._raycaster.setFromCamera(this._mouse, this._camera);
  };
}
