// Importing necessary modules from three.js
import * as THREE from "three";

// Getting the width and height of the window
const winW = window.innerWidth;
const winH = window.innerHeight;

// Creating a scene
const scene = new THREE.Scene();

// Creating a camera
const camera = new THREE.PerspectiveCamera(
  50, // field of view
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

// Creating prism geometry
const topBaseRadius = 1;
const bottomBaseRadius = 1;
const height = 1.8;
const numOfSides = 7;

const geometry = new THREE.CylinderGeometry(
  topBaseRadius,
  bottomBaseRadius,
  height,
  numOfSides
);

// Creating and setting materials for each side of the prism
const materials = [
  new THREE.MeshBasicMaterial({ color: 0xb2a5d3 }), // sides - purple
  new THREE.MeshBasicMaterial({ color: 0xffccda }), // top - pink
  new THREE.MeshBasicMaterial({ color: 0xc1dbea }), // bottom - blue
];
const prism = new THREE.Mesh(geometry, materials);

// Adding the prism to the scene
scene.add(prism);

// Setting the initial camera position
camera.position.z = 5;

// Animation function
function animate3DScene() {
  // Requesting the next frame of animation
  requestAnimationFrame(animate3DScene);

  // Rotating the prism
  prism.rotation.x += 0.015;
  prism.rotation.y += 0.01;

  // Rendering the scene with the camera
  renderer.render(scene, camera);
}

// Starting the animation
animate3DScene();
