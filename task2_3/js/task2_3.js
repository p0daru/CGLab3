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
const red = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // red
const yellow = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // yellow

// Setting materials for each side of the cube
var material = new THREE.ShaderMaterial({
  uniforms: {
    color1: {
      value: new THREE.Color("red"),
    },
    color2: {
      value: new THREE.Color("yellow"),
    },
  },

  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;

    varying vec2 vUv;

    void main() {

      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
});

// Setting materials for each side of the cube
const cube = new THREE.Mesh(geometry, [
  material, // Left side
  material, // Right side
  yellow, // Top side
  red, // Bottom side
  material, // Front side
  material, // Back side
]);

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
