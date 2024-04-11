import * as THREE from "three";

const winW = window.innerWidth;
const winH = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45, // field of view
  winW / winH, // aspect ratio
  0.2, // near clipping plane
  10 // far clipping plane
);
// Setting the initial camera position
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(winW, winH);
renderer.setClearColor(0xffffff, 0); // transparent background
document.getElementById("figure-container").appendChild(renderer.domElement);

const topBaseRadius = 0;
const bottomBaseRadius = 1;
const height = 2;
const numOfSides = 8;

const cylinderGeometry = new THREE.CylinderGeometry(
  topBaseRadius,
  bottomBaseRadius,
  height,
  numOfSides
);

const geometry = new THREE.CylinderGeometry(
  topBaseRadius,
  bottomBaseRadius,
  height,
  numOfSides
);

// Solid model
const solidMaterial = [
  new THREE.MeshBasicMaterial({ color: 0xfc4026 }), // sides-Green
  new THREE.MeshBasicMaterial({ color: 0x26fcc8 }), // top-Purple
  new THREE.MeshBasicMaterial({ color: 0x26fcc8 }), //  bottom-Purple
];
const solidPyramid = new THREE.Mesh(cylinderGeometry, solidMaterial);
scene.add(solidPyramid);

// Adding outlined edges
const wireframeMaterial = new THREE.LineBasicMaterial({
  color: 0xb2a5d3,
  linewidth: 2,
});
const wireframe = new THREE.LineSegments(
  new THREE.EdgesGeometry(geometry),
  wireframeMaterial
);
scene.add(wireframe);

function animate3DScene() {
  requestAnimationFrame(animate3DScene);

  solidPyramid.rotation.x += 0.01;
  solidPyramid.rotation.y += 0.01;

  wireframe.rotation.x += 0.01;
  wireframe.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate3DScene();
