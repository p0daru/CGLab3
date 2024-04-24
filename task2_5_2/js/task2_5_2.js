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

camera.position.z = 4;
// Creating a renderer
const container = document.getElementById("container");
document.body.appendChild(container);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(winW, winH);
renderer.setClearColor(0xffffff, 0); // transparent background
document.getElementById("figure-container").appendChild(renderer.domElement);


// Creating first cone
const Cone_1_Geometry = new THREE.ConeGeometry(0.5, 1, 16);
const Cone_1_Material = new THREE.ShaderMaterial({
    vertexShader: `
    varying vec2 vUv;
  
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    varying vec2 vUv;
    uniform vec3 color1;
    uniform vec3 color2;
  
    void main() {
      float gradient = vUv.y;
      vec3 color = mix(color1, color2, gradient);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
    uniforms: {
        color1: { value: new THREE.Color(0x000000) }, // White
        color2: { value: new THREE.Color(0xff0000) }, // Red
    },
});
const Cone_1 = new THREE.Mesh(Cone_1_Geometry, Cone_1_Material);
scene.add(Cone_1);
Cone_1.position.y = 0.5;

// Creating second cone
const Cone_2_Geometry = new THREE.ConeGeometry(0.5, 1, 16);
const Cone_2_Material = new THREE.ShaderMaterial({
    vertexShader: `
    varying vec2 vUv;
  
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    varying vec2 vUv;
    uniform vec3 color1;
    uniform vec3 color2;
  
    void main() {
      float gradient = vUv.y;
      vec3 color = mix(color1, color2, gradient);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
    uniforms: {
        color1: { value: new THREE.Color(0xff0000) }, // Red
        color2: { value: new THREE.Color(0xffffff) }, // RED
    },
});
const Cone_2 = new THREE.Mesh(Cone_2_Geometry, Cone_2_Material);
Cone_2.rotation.x = Math.PI; //rotate 180
Cone_2.position.y = -0.5;
scene.add(Cone_2);


function animate3DScene() {
    requestAnimationFrame(animate3DScene);
    renderer.render(scene, camera);
    // Оновлення кута обертання
    const time = Date.now() * 0.0005;
    const angle = time * Math.PI; // Швидкість обертання

    // Радіус кола обертання
    const radius = 1;

    // Координати центра обертання
    const centerX = 0;
    const centerY = 0;
    const centerZ = 0;

    Cone_1.position.x = centerX + radius * Math.cos(angle);
    Cone_1.position.z = centerZ + radius * Math.sin(angle);

    Cone_2.position.x = centerX + radius * Math.cos(angle);
    Cone_2.position.z = centerZ + radius * Math.sin(angle);

}

animate3DScene();

function updateColors() {
    const time = Date.now() * 0.001;
    const color1 = new THREE.Color(
        Math.sin(time * 0.2),
        Math.cos(time * 0.9),
        Math.sin(time * 0.7)
    );
    const color2 = new THREE.Color(
        Math.cos(time * 0.2),
        Math.sin(time * 0.4),
        Math.cos(time * 0.5)
    );

    Cone_1.material.uniforms.color1.value = color1;
    Cone_1.material.uniforms.color2.value = color2;
    Cone_2.material.uniforms.color1.value = color1;
    Cone_2.material.uniforms.color2.value = color2;

    requestAnimationFrame(updateColors);
}

updateColors();