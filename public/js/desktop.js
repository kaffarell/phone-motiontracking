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
    camera.position.z = 200;
}

export function getCoordinates(){
    return coordinates;
}


function animate(){
    requestAnimationFrame(animate);
    setTimeout(() => {
        updateData();
        if(coordinates !== undefined){
            phone.rotation.x = coordinates.alpha.toFixed(4) * 2;
            phone.rotation.y = coordinates.gamma.toFixed(4) * 2;
            phone.rotation.z = coordinates.beta.toFixed(4) * (-1) * 2;

            /*
            phone.rotation.x = coordinates.beta.toFixed(4) / 180;
            phone.rotation.y = coordinates.alpha.toFixed(6) / 90;
            phone.rotation.z = coordinates.gamma.toFixed(6) / 360;
            */
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



function updateData(){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
            coordinates = JSON.parse(this.responseText);
            let outputString = 
                "<br> alpha: " + coordinates.alpha.toFixed(4) * 2 + 
                "<br> beta: " + coordinates.beta.toFixed(4) * 2 + 
                "<br> gamma: " + coordinates.gamma.toFixed(4) * (-1) * 2;
		    document.getElementById('numbers').innerHTML = outputString + "<br><br>" + this.responseText;
		}
	};
	xhttp.open('GET', 'get');
	xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xhttp.send();
}

init();
animate();
