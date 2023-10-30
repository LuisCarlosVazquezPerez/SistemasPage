// Importa las clases necesarias de la biblioteca Three.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Crea una nueva escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, 1, 1, 1000); // Aspecto inicial 1:1
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Asegúrate de que el renderizador admita transparencia (alpha: true).

// Establece el tamaño del renderizador y el color de fondo transparente
renderer.setClearAlpha(0);
renderer.setSize(600, 600);

// Obtén el contenedor del modelo 3D desde el documento HTML y agrega el elemento del renderizador a él
const container = document.getElementById('Modelo3D');
container.appendChild(renderer.domElement);

// Crea una luz direccional y agrégala a la escena
const light = new THREE.DirectionalLight(0xffffff, 22);
light.position.set(1, 2, 2).normalize();
scene.add(light);

// Establece la posición de la cámara
camera.position.z = 7;

// Variables para el seguimiento del cursor y la inactividad del cursor
const mouse = new THREE.Vector2();
const targetRotation = new THREE.Vector2();
let cursorInactiveTime = 0;
const cursorInactiveThreshold = 11000; // Tiempo en milisegundos antes de que el modelo comience a moverse automáticamente

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

function onDocumentMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 15 - 5;
    mouse.y = -(event.clientY / window.innerHeight) * 11 + 2;

    targetRotation.x = -mouse.y;
    targetRotation.y = mouse.x;

    cursorInactiveTime = 0; // Reinicia el temporizador cuando el cursor se mueve
}

document.addEventListener('mousemove', onDocumentMouseMove, false);

// Variable para controlar el ángulo de rotación acumulado
let totalRotation = 0;
// Variable para controlar la dirección de la rotación
let rotationDirection = 1; // 1 para la derecha, -1 para la izquierda

function animate() {
    requestAnimationFrame(animate);

    // Verifica el tiempo de inactividad del cursor
    if (cursorInactiveTime >= cursorInactiveThreshold) {
        // Mueve el modelo automáticamente
        if (gltf && gltf.scene) {
            // Gira el modelo en el eje Y
            gltf.scene.rotation.x -= 0.00055 * rotationDirection; // Ajusta la velocidad de rotación según tus necesidades
            gltf.scene.rotation.y -= 0.00011 * rotationDirection; // Ajusta la velocidad de rotación según tus necesidades

            // Actualiza el ángulo total de rotación
            totalRotation += 0.011 * rotationDirection;

            // Verifica si el modelo ha girado aproximadamente 180 grados (pi radianes)
            if (Math.abs(totalRotation) >= Math.PI) {
                // Cambia la dirección de la rotación
                rotationDirection *= -1;
            }

            renderer.render(scene, camera);
        }
    } else {
        // Interpola entre la rotación actual del modelo y la rotación del cursor para un movimiento suave
        if (gltf && gltf.scene) {
            gltf.scene.rotation.y = Math.PI;
            gltf.scene.rotation.x = 20;

            gltf.scene.rotation.x += (targetRotation.x - gltf.scene.rotation.x) * 0.05;
            gltf.scene.rotation.y += (targetRotation.y - gltf.scene.rotation.y) * 0.05;
            renderer.render(scene, camera);
        }

        // Incrementa el tiempo de inactividad del cursor
        cursorInactiveTime += 1000 / 60; // Suponiendo una tasa de actualización de 60 FPS
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
