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

camera.position.z = 8;
// Creating a renderer
const container = document.getElementById("container");
document.body.appendChild(container);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(winW, winH);
renderer.setClearColor(0xffffff, 0); // transparent background
document.getElementById("figure-container").appendChild(renderer.domElement);

// Creating pyramid geometry
const topBaseRadius = 0;
const bottomBaseRadius = 1.5;
const height = 2;
const numOfSides = 8;

const geometry = new THREE.CylinderGeometry(
  topBaseRadius,
  bottomBaseRadius,
  height,
  numOfSides
);

// Wireframe model
const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xb2a5d3, linewidth: 2});
const wireframe = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), wireframeMaterial);
scene.add(wireframe);

function animate3DScene() {
  requestAnimationFrame(animate3DScene);

   // Rotating the cube
   wireframe.rotation.x += 0.015;
   wireframe.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate3DScene();
