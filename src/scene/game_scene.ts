import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, SRGBColorSpace, TextureLoader, WebGLRenderer } from "three";

export class GameScene {
    private static instance: GameScene;

    private _renderer: WebGLRenderer;
    private _camera: PerspectiveCamera;
    private _mesh: Mesh | null;
    private readonly _scene;

    private constructor() {
        this._renderer = new WebGLRenderer({
            antialias: true,
        });
        this._camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
        this._camera.position.z = 2;
        this._scene = new Scene();
        this._mesh = null;
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new GameScene();
        return this.instance;
    }

    public load = () => {
        const geometry = new BoxGeometry();
        const texture = new TextureLoader().load('textures/crate.gif');
        texture.colorSpace = SRGBColorSpace;

        const material = new MeshBasicMaterial({ map: texture });

        this._mesh = new Mesh(geometry, material);
        this._scene.add(this._mesh);
    };

    public render = () => {
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.render(this._scene, this._camera);
        this._renderer.setAnimationLoop(this.animate);
    };

    public getDOMElement() {
        return this._renderer.domElement;
    }

    private animate = () => {
        if (this._mesh) {
            this._mesh.rotation.x += 0.005;
            this._mesh.rotation.y += 0.01;
        }
        this._renderer.render(this._scene, this._camera);
    }
}