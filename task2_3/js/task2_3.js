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
const geometry = new THREE.BoxGeometry();

// Creating materials for each side of the cube
const vertexShader = `
  varying vec3 vColor;

  void main() {
    vColor = position * 0.5 + 0.5; // Mapping position to color range [0, 1]
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

// Setting materials for each side of the cube
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

// Setting materials for each side of the cube
const cube = new THREE.Mesh(geometry, material);

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
