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

// Creating cube geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Creating materials for each side of the cube
const materialTopBottom = new THREE.MeshBasicMaterial({ color: 0xb2a5d3 }); // purple
const materialLeftRightSides = new THREE.MeshBasicMaterial({ color: 0xffccda }); // pink
const materialSides = new THREE.MeshBasicMaterial({ color: 0xc1dbea }); // blue

// Setting materials for each side of the cube
const materials = [
  materialLeftRightSides, // left side
  materialLeftRightSides, // right side
  materialTopBottom, // top
  materialTopBottom, // bottom
  materialSides, // front side
  materialSides, // back side
];
const cube = new THREE.Mesh(geometry, materials);

// Adding the cube to the scene
scene.add(cube);

// Setting the initial camera position
camera.position.z = 3;

// Animation function
function animate3DScene() {
  // Requesting the next frame of animation
  requestAnimationFrame(animate3DScene);

  // Rotating the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Rendering the scene with the camera
  renderer.render(scene, camera);
}

animate3DScene();
