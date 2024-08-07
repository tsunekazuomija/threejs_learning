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
camera.position.set(0, 0, +10);

// create mesh
const geometry = PlaneStarGeometry(0, 0, 2, 5);
// const material = new THREE.MeshBasicMaterial({ color: 0x11cccc });
const material = new THREE.MeshNormalMaterial();
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


function PlaneStarGeometry(x, y, r, prikleNum) {
  let vNum = prikleNum * 2;
  let R; // distance from center to prikle

  const vertices = new Float32Array(vNum * 3);
  for (let i=0; i < vNum; i++) {
    R = (i % 2 === 0) ? r/2 : r;
    vertices[i * 3] = x + R * Math.cos(2 * Math.PI * i / vNum);
    vertices[i * 3 + 1] = y + R * Math.sin(2 * Math.PI * i / vNum);
    vertices[i * 3 + 2] = 0;
  }
  console.log(vertices);

  const indices = [];
  for (let i=0; i < vNum/2 - 2; i++) {
    indices.push(0);
    indices.push(2*i + 2);
    indices.push(2*i + 4);
  }
  for (let i=0; i < vNum/2; i++) {
    indices.push(2*i % vNum);
    indices.push((2*i + 1) % vNum);
    indices.push((2*i + 2) % vNum);
  }
  console.log(indices);

  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();
  return geometry;
}