import * as THREE from 'three';

const width = 960;
const height = 540;

// create renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#myCanvas')
});
renderer.setSize(width, height);

// create scene
const scene = new THREE.Scene();

// create camera
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
camera.position.set(0, 0, +1000);

// create mesh
const geometry = new THREE.SphereGeometry(300, 30, 30);
// const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const loader = new THREE.TextureLoader();
const texture = loader.load('imgs/earthmap1k.jpg');
texture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshStandardMaterial({
  map: texture
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// create light
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

tick();

function tick() {
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);

  requestAnimationFrame(tick);
}