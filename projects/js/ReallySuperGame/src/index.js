import * as THREE from './three.module.js';
import * as UTILS from './utils.js';
import * as LEVEL from './level.js';
import { GLTFLoader } from './three/loaders/GLTFLoader.js';
import { PointerLockControls } from './three/controls/PointerLockControls.js';

// debug: new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), new THREE.MeshBasicMaterial({color: 0xff0000}))

const loader = new GLTFLoader()

const scene = new THREE.Scene()
scene.fog = new THREE.Fog(0xffffff, 0, 750)
scene.background = new THREE.Color(0x87CEEB) // sky color: 0x87CEEB

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.rotation.order = "YXZ";

const listener = new THREE.AudioListener();
camera.add(listener)
const sound = new THREE.Audio( listener );
const sound2 = new THREE.Audio( listener );
const audioLoader = new THREE.AudioLoader();
audioLoader.load('sounds/shot3.mp3', function(buffer) {
    sound.setBuffer(buffer); 
    sound.setLoop(true); 
    sound.setVolume(0.2);
    //sound.play()
});

audioLoader.load('sounds/step.wav', function(buffer) {
    sound2.setBuffer(buffer); 
    sound2.setLoop(false); 
    sound2.setVolume(0.4);
    //sound.play()
});

let controls = new PointerLockControls(camera, document.body);
controls.connect()

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

var weapon   // player weapon
var emitter  // emitter for bullets
var slTarget // target for spotlights
var sl       // white spotlight for flashlight
var slShot   // red spotlight for shot

// load weapon
loader.load(
	'models/weapon1/scene.gltf',
	function(gltf) {
        weapon = gltf.scene
        weapon.scale.set(0.6, 0.6, 0.6)
        weapon.rotation.order = "YXZ";
		scene.add(weapon)

        // bullets emitter
        emitter = new THREE.Object3D()
        emitter.position.set(0.01, 0.07, -0.5)
        weapon.add(emitter)

        // spotlight target
        slTarget = new THREE.Object3D()
        slTarget.position.set(0.0, 0.0, -1.0)
        weapon.add(slTarget)

        // spotlight
        sl = new THREE.SpotLight(0xffffff, 0.9, 4, Math.PI / 4, 0);
        sl.target = slTarget
        sl.position.set(0, 0, 0)
        weapon.add(sl);

        // red spotlight for shot
        slShot = new THREE.SpotLight(0xae0000, 0.8, 99, Math.PI / 3, 0);
        slShot.target = slTarget
        slShot.visible = false
        slShot.position.set(0, 0, 0)
        weapon.add(slShot)

	}
)

// load bed
loader.load(
	'models/bed1/scene.gltf',
	function(gltf) {
        scene.add(gltf.scene)
        gltf.scene.scale.set(0.08, 0.08, 0.08)
        gltf.scene.position.set(1, -0.06, 0.75)
    }
)

var score = 0
let shoot=false
let run=false
let timer 
let player = {
    x: 3,
    y: 0.45,
    z: 5,
    angle: 0,  // x angle
    angle2: 0, // y angle 
    makeShot: () => { 
        clearTimeout(timer) 
        shoot=true 
        timer =setTimeout(()=>{
            shoot=false
        },30)       

        if(!sound.isPlaying) {
            sound.play()
        }

        // blink shot light
        if(slShot.visible)
            slShot.visible = false
        else
            slShot.visible = true
    }
}

let keyBuffer = []
var animOffsetWeapon = 0

var isCtrlKey = true
var isShiftKey = false
document.addEventListener("keydown", (event)=>{
    isCtrlKey = event.ctrlKey

    if(event.code == "ShiftLeft") {
        isShiftKey = true
    }
    
    if (!keyBuffer.includes(event.key)){
        keyBuffer.push(event.key)    
    }
})
document.addEventListener("keyup", (event)=>{
    if(event.code == "ShiftLeft") {
        isShiftKey = false
    }

    if (keyBuffer.includes(event.key)){
        keyBuffer.splice(keyBuffer.indexOf(event.key))
    }
    
    isCtrlKey = false
})
// document.addEventListener('pointerlockchange', () => {
//     if (document.pointerLockElement === renderer.domElement) {
//         this.dispatchEvent(_lockEvents);
//         this.isLocked = true;
//     } else {
//         this.dispatchEvent(_unlockEvent);
//         this.isLocked = false;
//     }
// });

var isMouseDown = false

setInterval(() => {
    if(isMouseDown) {
        test=200
        player.makeShot()
        weaponAnimate()
    } else {
        if(sound.isPlaying)
            sound.stop()
    }
}, 1000 / 60)

document.addEventListener("mousedown", (event) => {
    isMouseDown = true
    controls.lock()
})

document.addEventListener("mouseup", (event) => {
    isMouseDown = false
    controls.lock()
    test=200
    player.makeShot()
    weaponAnimate()
})

var lastMouseX = 0
var lastMouseY = 0
controls.setMouseHandler((event) => {
    const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
	const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0
    player.angle -= movementX / 2.2
    let test= player.angle2 - movementY / 2.2
    if (test < 90 && test>-90) {
        player.angle2 -= movementY / 2.2
    }
    

    lastMouseX = event.x
    lastMouseY = event.y
})

setInterval(()=>{
    if(slShot != undefined)
        slShot.visible = false
}, 60)

// update all input logic
let animOffsetWeapon2 = 0;
var test=200
const updateInput = (weapon) => {
    for(var i = 0; i < keyBuffer.length; i += 1) {
        let key = keyBuffer[i]
        switch (key) {
            case 't':
                //renderer.domElement.requestPointerLock = renderer.domElement.requestPointerLock || renderer.domElement.mozRequestPointerLock;
                //renderer.domElement.requestPointerLock()
                controls.lock()
                break
            /*case 'v':
                test=100
                player.makeShot()
                weaponAnimate()
                break*/
            case 'ArrowUp':
                if(player.angle2<90){
                    player.angle2 += 3
                }
                break
            case 'ArrowDown':
                if(player.angle2>-90){
                    player.angle2 -= 3
                }
                break
            case 'ArrowLeft':
                player.angle += 3
                break
            case 'ArrowRight':
                player.angle -= 3
                break
            case "a":
                player.angle += 3
                break
            case "d":
                player.angle -= 3
                break
            case "w":
                if(!sound2.isPlaying) {
                    sound2.play()
                }

                var speed = -0.04
                if(isCtrlKey)
                    speed = -0.09

                test=600
                //animOffsetWeapon += 0.08
                let rayX = player.x + Math.sin(UTILS.degrees_to_radians(player.angle)) * speed
                let rayZ = player.z + Math.cos(UTILS.degrees_to_radians(player.angle)) * speed
                player.x = rayX
                player.z = rayZ
                if(!shoot){
                if (!animStart) {
                    animStart=true
                    weaponAnimate(animOffsetWeapon2)
                    animOffsetWeapon2=0
                }}
                break
            case "s":
                let rayX2 = player.x + Math.sin(UTILS.degrees_to_radians(player.angle)) * 0.05
                let rayZ2 = player.z + Math.cos(UTILS.degrees_to_radians(player.angle)) * 0.05
                player.x = rayX2
                player.z = rayZ2
                break
        }
    }
}

// update all scene logic
var create=false
const updateScene = () => {
    camera.rotation.y = UTILS.degrees_to_radians(player.angle) 
    camera.rotation.x = UTILS.degrees_to_radians(player.angle2)
    camera.position.set(
        player.x,
        (isShiftKey) ? player.y - 0.3 : player.y,
        player.z
    )

    if(weapon != undefined) {
        weapon.position.copy(camera.position);
        weapon.rotation.y = UTILS.degrees_to_radians(player.angle)
        weapon.rotation.x = UTILS.degrees_to_radians(player.angle2)
        weapon.rotation.z = Math.sin(animOffsetWeapon2) / 40

        weapon.updateMatrix();
        weapon.translateY(-0.01)
        weapon.translateZ(-0.35);
        weapon.translateX(0.15)
        weapon.translateY(-0.1 + Math.sin(animOffsetWeapon2) / test);

        create=true
    }
}

function animate() {
    updateInput(weapon)
    updateScene()
    
	renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

LEVEL.generateLevel(scene)
animate()

let  animStart= false
const weaponAnimate = () => {
    animOffsetWeapon2+=0.1
    if(animOffsetWeapon2 <3) {
        requestAnimationFrame( weaponAnimate );
    }else{
        animStart=false
    }
}