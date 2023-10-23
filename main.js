// Importa las clases necesarias de la biblioteca Three.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Crea una nueva escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, 1, 1, 1000); // Aspecto inicial 1:1
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Asegúrate de que el renderizador admita transparencia (alpha: true).

// Establece el tamaño del renderizador y el color de fondo transparente
renderer.setClearAlpha(0);
renderer.setSize(600, 650);

// Obtén el contenedor del modelo 3D desde el documento HTML y agrega el elemento del renderizador a él
const container = document.getElementById('Modelo3D');
container.appendChild(renderer.domElement);

// Crea una luz direccional y agrégala a la escena
const light = new THREE.DirectionalLight(0xffffff, 22);
light.position.set(1, 2, 1).normalize();
scene.add(light);

// Establece la posición de la cámara
camera.position.z = 8;

// Función para manejar el tamaño del renderizador y la cámara cuando cambia el tamaño de la ventana
function handleResize() {
    const aspect = container.clientWidth / container.clientHeight;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Llama a la función handleResize cuando se carga la página y cuando cambia el tamaño de la ventana
handleResize();
window.addEventListener('resize', handleResize);

// Variables para el seguimiento del cursor
const mouse = new THREE.Vector2();
const targetRotation = new THREE.Vector2();

function onDocumentMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 15 - 5;
    mouse.y = -(event.clientY / window.innerHeight) * 11 + 2;

    targetRotation.x = -mouse.y;
    targetRotation.y = mouse.x;
}

document.addEventListener('mousemove', onDocumentMouseMove, false);

// Función para animar la escena
function animate() {
    requestAnimationFrame(animate);

    // Interpola entre la rotación actual del modelo y la rotación del cursor para un movimiento suave
    if (gltf && gltf.scene) {
        gltf.scene.rotation.y = Math.PI;
        gltf.scene.rotation.x = 20;

        gltf.scene.rotation.x += (targetRotation.x - gltf.scene.rotation.x) * 0.05;
        gltf.scene.rotation.y += (targetRotation.y - gltf.scene.rotation.y) * 0.05;
        renderer.render(scene, camera);
    }
}

// Crea un cargador de modelos GLTF
const loader = new GLTFLoader();

// Carga el modelo GLTF y realiza acciones cuando la carga está completa
let gltf;
loader.load('./public/oso/scene.gltf', function (loadedGltf) {
    gltf = loadedGltf;

    // Configura el material para que sea transparente
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 1; // Puedes ajustar la opacidad según tus necesidades.
        }
    });

    gltf.scene.rotation.y = Math.PI;
    gltf.scene.position.set(0, 1.1, 0);
    // Agrega el modelo cargado a la escena y comienza la animación
    scene.add(gltf.scene);
    animate();
}, undefined, function (error) {
    console.error(error); // Maneja errores de carga, si los hay
});
