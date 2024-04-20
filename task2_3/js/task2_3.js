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

// Custom vertex shader
const vertexShader = `
  varying vec3 vUv;

  void main() {
    vUv = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Custom fragment shader
const fragmentShader = `
  varying vec3 vUv;
  uniform float angle;

  void main() {
    // Calculate the gradient from top to bottom
    float gradient = vUv.y;

    // Adjusting the color transition using smoothstep
    float angleColor = smoothstep(-0.5, 0.5, sin(angle));
    vec3 color = mix(vec3(0.8, 0.8, 1.0), vec3(1.0, 1.0, 0.8), gradient);
    color = mix(color, vec3(1.0, 0.8, 0.8), angleColor);

    gl_FragColor = vec4(color, 1.0);
  }
`;

// Creating the cube geometry
const myCubeGeometry = new THREE.BoxGeometry();

// Creating a shader material with vertex and fragment shaders
const myMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: { angle: { value: 3.14 } }
});

// Creating the cube mesh with custom geometry and material
const myCube = new THREE.Mesh(myCubeGeometry, myMaterial);

// Adding the cube to the scene
scene.add(myCube);

// Setting the initial camera position
camera.position.z = 3;

// Animation function
function animate3DScene() {
  // Requesting the next frame of animation
  requestAnimationFrame(animate3DScene);

  // Rotating the cube
  myCube.rotation.x += 0.01;
  myCube.rotation.y += 0.01;
  myCube.rotation.z += 0.01;

  // Setting the speed of changing angle
  myMaterial.uniforms.angle.value += 0.014;

  // Rendering the scene with the camera
  renderer.render(scene, camera);
}

animate3DScene();
