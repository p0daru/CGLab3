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
const bottomBaseRadius = 2;
const height = 3;
const numOfSides = 8;

const geometry = new THREE.CylinderGeometry(
  topBaseRadius,
  bottomBaseRadius,
  height,
  numOfSides
);

// Creating materials for each side of the pyramid

const material = [
  new THREE.MeshBasicMaterial({ color: 0xb2a5d3 }), // sides - purple
  new THREE.MeshBasicMaterial({ color: 0xc1dbea }), // top
  new THREE.MeshBasicMaterial({ color: 0xc1dbea }), // bottom
];
const pyramid = new THREE.Mesh(geometry, material);
// const material = new THREE.MeshNormalMaterial(); /// colors for all sides and bottom

// Adding the pyramid to the scene
scene.add(pyramid);

// Setting the initial camera position
camera.position.z = 8;

// Animation function
function animate3DScene() {
  // Requesting the next frame of animation
  requestAnimationFrame(animate3DScene);

  // Rotating the cube
  pyramid.rotation.x += 0.015;
  pyramid.rotation.y += 0.01;

  // Rendering the scene with the camera
  renderer.render(scene, camera);
}

// Starting the animation
animate3DScene();
