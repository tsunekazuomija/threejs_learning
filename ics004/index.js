import * as THREE from 'three';

const width = 960;
const height = 540;
let rot = 0;
let mouseX = 0;

// create renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#myCanvas')
});
renderer.setSize(width, height);

// create scene
const scene = new THREE.Scene();

// create camera
const camera = new THREE.PerspectiveCamera(45, width / height);

// create light
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const texture = new THREE.TextureLoader().load('imgs/earthmap1k.jpg');
texture.colorSpace = THREE.SRGBColorSpace;

// create earth mesh
const material = new THREE.MeshStandardMaterial({
  map: texture,
  side: THREE.DoubleSide,
});

const geometry = new THREE.SphereGeometry(300, 30, 30);
const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);

// create star mesh
createStarField();

function createStarField() {
  const vertices = [];
  for (let i= 0; i < 1000; i++) {
    const x = 3000 * (Math.random() - 0.5);
    const y = 3000 * (Math.random() - 0.5);
    const z = 3000 * (Math.random() - 0.5);
    vertices.push(x, y, z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

  const material = new THREE.PointsMaterial({
    size: 10,
    color: 0xffffff,
  });

  const mesh = new THREE.Points(geometry, material);
  scene.add(mesh);
}

document.addEventListener("mousemove", (event) => {
  mouseX = event.pageX;
})

tick();

function tick() {

  const mousePos = mouseX / window.innerWidth - 0.5;
  if (mousePos > 0.1 || mousePos < -0.1) {
  const targetVelocity = (mouseX / window.innerWidth - 0.5) * 1.0;
  rot += targetVelocity
  }

  const radian = (rot * Math.PI) / 180;

  camera.position.x = 1000 * Math.sin(radian);
  camera.position.z = 1000 * Math.cos(radian);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 地球も回ってると酔うので、止める
  // earthMesh.rotation.y += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}