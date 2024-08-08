import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

window.addEventListener("DOMContentLoaded", init);

function init() {

  const width = 960;
  const height = 540;

  const canvasElement = document.querySelector('#myCanvas');
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement
  });
  renderer.setSize(width, height);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, 1000);

  const controls = new OrbitControls(camera, canvasElement);

  // カメラコントローラを滑らかに制御
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const texture = new THREE.TextureLoader().load('../imgs/earthmap1k.jpg');
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const geometry = new THREE.SphereGeometry(300, 30, 30);
  const earthMesh = new THREE.Mesh(geometry, material);
  scene.add(earthMesh);

  createStarField();

  function createStarField() {
    const vertices = [];
    for (let i = 0; i < 1000; i++) {
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

  tick();

  function tick() {
    earthMesh.rotation.y += 0.00001;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}