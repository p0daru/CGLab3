// Importing necessary modules from three.js
import * as THREE from "three";

// Getting the width and height of the window
const winW = window.innerWidth;
const winH = window.innerHeight;

// Creating a scene
const scene = new THREE.Scene();

// Creating a camera
const camera = new THREE.PerspectiveCamera(
  45, // field of view
  winW / winH, // aspect ratio
  0.2, // near clipping plane
  10 // far clipping plane
);

// Creating a renderer
const container = document.getElementById("container");
document.body.appendChild(container);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(winW, winH);
renderer.setClearColor(0xffffff, 0); // transparent background
document.getElementById("figure-container").appendChild(renderer.domElement);

// Creating pyramid geometry
const topBaseRadius = 0;
const bottomBaseRadius = 1.5;
const height = 2.5;
const numOfSides = 8;

const geometry = new THREE.CylinderGeometry(
  topBaseRadius,
  bottomBaseRadius,
  height,
  numOfSides
);

// Creating materials for each side of the pyramid

const material = [
  new THREE.MeshBasicMaterial({ color: 0xFF19F5, opacity: 0, transparent: true }), // Purpule
  new THREE.MeshBasicMaterial({ color: 0x27FF19 }), // Green
];

const pyramid = new THREE.Mesh(geometry, material);
// const material = new THREE.MeshNormalMaterial(); /// colors for all sides and bottom

// Adding the pyramid to the scene
scene.add(pyramid);

const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, opacity: 0.01, transparent: true });
const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
scene.add(wireframe);

// Creating edges for the pyramid
// const edges = new THREE.EdgesGeometry(geometry);
// const lineMaterial = new THREE.LineBasicMaterial({ color: 0xb2a5d3, linewidth: 3 });
// const lines = new THREE.LineSegments(edges, lineMaterial);
// scene.add(lines);

// Creating points for the edges
const pointsMaterial = new THREE.PointsMaterial({ color: 0xFFC900, size: 0.2 });
const points = new THREE.Points(geometry, pointsMaterial);
scene.add(points);

// Setting the initial camera position
camera.position.z = 8;

// Animation function
function animate3DScene() {
  // Requesting the next frame of animation
  requestAnimationFrame(animate3DScene);

  pyramid.rotation.x += 0.015;
  pyramid.rotation.y += 0.01;

  points.rotation.x += 0.015;
  points.rotation.y += 0.01;

  wireframe.rotation.x += 0.015;
  wireframe.rotation.y += 0.01;

  // Rendering the scene with the camera
  renderer.render(scene, camera);
}

// Starting the animation
animate3DScene();