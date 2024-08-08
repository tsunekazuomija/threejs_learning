import * as THREE from 'three';

const width = 960;
const height = 540;

// create renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#myCanvas'),
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

// create scene
const scene = new THREE.Scene();

// create camera
const camera = new THREE.PerspectiveCamera(45, width / height);
camera.position.set(0, 0, +1000);

// create Mesh
const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
const material = new THREE.MeshBasicMaterial(
  { color: 0x6699FF}
);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// create light
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
directionalLight.intensity = 2;
scene.add(directionalLight);

tick();

function tick() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
}

document.getElementById('meshBasicMaterial').addEventListener('click', () => {
  mesh.material = new THREE.MeshBasicMaterial({ color: 0x6699FF });
});

document.getElementById('meshNormalMaterial').addEventListener('click', () => {
  mesh.material = new THREE.MeshNormalMaterial();
});

document.getElementById('meshLambertMaterial').addEventListener('click', () => {
  mesh.material = new THREE.MeshLambertMaterial({ color: 0x6699FF });
});

document.getElementById('meshPhongMaterial').addEventListener('click', () => {
  mesh.material = new THREE.MeshPhongMaterial({ color: 0x6699FF });
});

document.getElementById('meshToonMaterial').addEventListener('click', () => {
  mesh.material = new THREE.MeshToonMaterial({ color: 0x6699FF });
});

document.getElementById('meshStandardMaterial').addEventListener('click', () => {
  mesh.material = new THREE.MeshStandardMaterial({ 
    color: 0x6699FF,
    roughness: 0.1,
  });
});
