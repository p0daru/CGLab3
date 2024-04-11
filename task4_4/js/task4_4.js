import * as THREE from 'three';

const winW = window.innerWidth;
const winH = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45, // field of view
  winW / winH, // aspect ratio
  0.2, // near clipping plane
  10 // far clipping plane
);

// creating renderer
const container = document.getElementById("container");
document.body.appendChild(container);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(winW, winH);
renderer.setClearColor(0xffffff, 0); // transparent background
document.getElementById("figure-container").appendChild(renderer.domElement);

// Setting the initial camera position
camera.position.z = 8;

const topBaseRadius = 0;
const bottomBaseRadius = 1.5;
const height = 2.5;
const numOfSides = 8;

const cylinderGeometry = new THREE.CylinderGeometry(
  topBaseRadius,
  bottomBaseRadius,
  height,
  numOfSides
);

// Point model
const pointModelMaterial = new THREE.PointsMaterial({ color: 0x280083, size: 0.1 });
const pointModel = new THREE.Points(new THREE.EdgesGeometry(cylinderGeometry), pointModelMaterial);
//Виклик точкової моделів
scene.add(pointModel);

// Wireframe model
const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x0012AC });
const wireframeModel = new THREE.LineSegments(new THREE.EdgesGeometry(cylinderGeometry), wireframeMaterial);
//Виклик каркасної моделі
scene.add(wireframeModel);

function animate3DScene() {
  requestAnimationFrame(animate3DScene);

  wireframeModel.rotation.x += 0.015;
  wireframeModel.rotation.y += 0.01;

  pointModel.rotation.x += 0.015;
  pointModel.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate3DScene();