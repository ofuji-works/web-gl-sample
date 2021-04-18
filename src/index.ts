import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  PlaneGeometry,
  MeshStandardMaterial,
  TextureLoader,
  Mesh,
  PointLight,
  PointLightHelper,
  RepeatWrapping,
  NearestFilter,
  Vector3,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

window.addEventListener("DOMContentLoaded", () => {
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(0xfafafa, 0.1);
  document.body.appendChild(renderer.domElement);

  // シーン作成
  const scene = new Scene();

  // カメラ作成
  const camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  camera.position.set(0, 5.239, 16.479);

  /* 効いてない 理由:domが表示される前に起動している。
  const target = document.getElementById("#body");
  if (target) {
    const controls = new OrbitControls(camera, target!);
  }
  **/

  // Box
  const geometry = new BoxGeometry(2, 2, 2);
  const boxTexture = new TextureLoader().load("texture/wood-texture.jpeg");
  const material = new MeshStandardMaterial({
    map: boxTexture,
  });
  for (let i = 0; 5 > i; i++) {
    const box = new Mesh(geometry, material);
    box.position.set(
      Math.round(Math.random() - 0.4 * 10) * i + 2,
      1,
      Math.round(Math.random() - 0.4 * 10) * i + 2
    );
    box.castShadow = true;
    scene.add(box);
  }

  // 床
  const planeGeometry = new PlaneGeometry(30, 30);
  const texture = new TextureLoader().load("texture/mokume.jpeg");
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(10, 10);
  texture.magFilter = NearestFilter;
  const planeMaterial = new MeshStandardMaterial({
    map: texture,
  });
  const planeMesh = new Mesh(planeGeometry, planeMaterial);
  planeMesh.rotation.x = -Math.PI / 2;
  planeMesh.receiveShadow = true;
  planeMesh.position.set(0, 0, 0);
  scene.add(planeMesh);

  // ライト
  const light = new PointLight(0xffffff, 1, 0, 1);
  light.position.set(5, 6, 10);
  const helper = new PointLightHelper(light);
  scene.add(helper);
  scene.add(light);

  let mouseX = 0;
  let rot = 0;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.pageX;
  });

  const tick: () => void = () => {
    const targetRot = (mouseX / window.innerWidth) * 360;

    rot += targetRot - rot;

    const radian = (rot * Math.PI) / 180;
    camera.position.x = 30 * Math.sin(radian);
    camera.position.z = 30 * Math.cos(radian);
    camera.lookAt(new Vector3(0, 0, 0));

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };
  tick();
});
