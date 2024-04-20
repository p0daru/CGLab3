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

// Create the cylinder geometry with smaller dimensions
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 16); // smaller radius and height

// Create a material for the cylinder
const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });

// Create the cylinder mesh
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

// Set position for the cylinder on the left side
cylinder.position.set(-1.5, 0, 0);

// Add the cylinder to the scene
scene.add(cylinder);

// Create the pentagonal prism geometry
const prismGeometry = new THREE.CylinderGeometry(0, 1, 2, 5, 1); // radius at the top is 0, so it forms a pentagonal prism

// Create a material for the prism
const prismMaterial = new THREE.MeshPhongMaterial({ color: 0xff00ff }); // Adjust color as needed

// Create the prism mesh
const prism = new THREE.Mesh(prismGeometry, prismMaterial);

// Set position for the prism on the right side
prism.position.set(1.5, 0, 0);

// Add the prism to the scene
scene.add(prism);

// Setting the initial camera position
camera.position.z = 4;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 50);
scene.add(pointLight);

// Define variables for the circular motion
const radius = 5;
let angle = 0;

// Update function for animation
function animate3DScene() {
  requestAnimationFrame(animate3DScene);

  // Update light position in a circular motion
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  pointLight.position.set(x, 2, z);

  angle += 0.1; // Adjust speed of motion

  // Rotate the cylinder
  cylinder.rotation.x += 0.01;
  cylinder.rotation.y += 0.01;
  cylinder.rotation.z += 0.01;

  // Rotate the prism
  prism.rotation.x += 0.01;
  prism.rotation.y += 0.01;
  prism.rotation.z += 0.01;

  // Render the scene with the camera
  renderer.render(scene, camera);
}

animate3DScene();
