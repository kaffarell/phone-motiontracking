import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js'

let scene, camera, renderer, phone;
let coordinates;

function init(){
    scene = new THREE.Scene();
    // Arguments: field of view, screen ration, distance to near plane, distance to far place
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    var loader = new GLTFLoader().setPath('js/phone/');
    loader.load('scene.gltf', (gltf) => {
        phone = gltf.scene;
        scene.add(gltf.scene);
    }, undefined, (err) => console.log(err));

    document.body.appendChild(renderer.domElement);
    /*
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    //const material = new THREE.MeshBasicMaterial({color: 0x0000ff});
    const texture = new THREE.TextureLoader().load('js/textures/create.gif');
    const material = new THREE.MeshBasicMaterial({map: texture});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    */
    camera.position.z = 200;
}


function animate(){
    requestAnimationFrame(animate);
    setTimeout(() => {
        updateData();
        if(coordinates !== undefined){
            phone.rotation.x = coordinates.alpha.toFixed(2) * 2;
            phone.rotation.y = coordinates.gamma.toFixed(2) * 2;
            phone.rotation.z = coordinates.beta.toFixed(2) * (-1) * 2;
        }
        renderer.render(scene, camera);
    }, 800);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


window.addEventListener('resize', onWindowResize, false);


init();
animate();

function updateData(){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
            coordinates = JSON.parse(this.responseText);
		    document.getElementById('demo').innerHTML = this.responseText;
		}
	};
	xhttp.open('GET', 'get');
	xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xhttp.send();
}

