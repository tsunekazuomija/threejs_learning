import * as THREE from 'three';

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#myCanvas')
});

const width = 960;
const height = 540;

renderer.setSize(width, height);
renderer.setPixelRatio(devicePixelRatio);

// シーンを作成
const scene = new THREE.Scene();

// カメラを作成
const camera = new THREE.PerspectiveCamera(
  45,
  width / height,
  1,
  10000
);

camera.position.set(0, 0, 1000);

// 立方体を作成
const geometry = new THREE.BoxGeometry(300, 300, 300); // 500だと大きすぎる
// const material = new THREE.MeshStandardMaterial({
//   color: 0x0000ff
// });
const material = new THREE.MeshNormalMaterial();

const box = new THREE.Mesh(geometry, material);
scene.add(box);

// ライトを作る
const light = new THREE.DirectionalLight(0xffffff);
light.intensity = 1;
light.position.set(1, 1, 1);

scene.add(light);

tick();

function tick() {
  requestAnimationFrame(tick);

  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  renderer.render(scene, camera);
}