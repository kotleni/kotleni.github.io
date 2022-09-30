import * as THREE from './three.module.js';
import * as UTILS from './utils.js';
import * as LEVEL from './level.js';
import { GLTFLoader } from './three/loaders/GLTFLoader.js';

const loader = new GLTFLoader()

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x87CEEB);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.rotation.order = "YXZ";

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

var weapon
var emitter
var slTarget
var sl
var slShot

loader.load(
	'models/weapon1/scene.gltf',
	function(gltf) {
		scene.add(gltf.scene)
        weapon = gltf.scene
        weapon.scale.set(0.6, 0.6, 0.6)
        weapon.rotation.order = "YXZ";

        emitter = new THREE.Object3D()
        emitter.position.set(0.01, 0.07, -0.5)
        weapon.add(emitter)

        slTarget = new THREE.Object3D() // debug: new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), new THREE.MeshBasicMaterial({color: 0xff0000}))
        slTarget.position.set(0.0, 0.0, -1.0)
        weapon.add(slTarget)

        sl = new THREE.SpotLight(0xffffff, 0.6, 4, Math.PI / 4, 0);
        sl.target = slTarget
        sl.position.set(0, 0, 0)
        const slHelper = new THREE.SpotLightHelper(sl);
        weapon.add(sl, slHelper);

        slShot = new THREE.SpotLight(0xae0000, 0.8, 99, Math.PI / 3, 0);
        slShot.target = slTarget
        slShot.visible = false
        slShot.position.set(0, 0, 0)
        const slHelper2 = new THREE.SpotLightHelper(slShot);
        weapon.add(slShot, slHelper2);

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
    () => {},
    () => {}
)

loader.load(
	'models/bed1/scene.gltf',
	function(gltf) {
        scene.add(gltf.scene)
        gltf.scene.scale.set(0.08, 0.08, 0.08)
        gltf.scene.position.set(1, -0.06, 0.75)
    },
    () => {},
    () => {}
)

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
directionalLight.position.set(0, 4, 0);
directionalLight.castShadow = true
scene.add(directionalLight);


const textureGround = new THREE.TextureLoader().load("ground.png");
textureGround.wrapS = THREE.RepeatWrapping;
textureGround.wrapT = THREE.RepeatWrapping;
textureGround.repeat.set(50, 50);

const textureBricks = new THREE.TextureLoader().load("bricks.jpeg");
textureBricks.wrapS = THREE.RepeatWrapping;
textureBricks.wrapT = THREE.RepeatWrapping;
textureBricks.repeat.set(2, 2);

const textureBricks2 = new THREE.TextureLoader().load("bricks.jpeg");
textureBricks2.wrapS = THREE.RepeatWrapping;
textureBricks2.wrapT = THREE.RepeatWrapping;
textureBricks2.repeat.set(5, 2);

// ground
const groundgeom = new THREE.BoxGeometry(22, 0.1, 22)
const groundmat = new THREE.MeshPhongMaterial({ map: textureGround })
const cubet = new THREE.Mesh( groundgeom, groundmat )
cubet.position.y = -0.1
cubet.receiveShadow = true
scene.add(cubet)

let player = {
    x: 3,
    y: 0.45,
    z: 5,
    angle: 0,
    angle2: 0,

    makeShot: () => {
        const geometryhand = new THREE.SphereGeometry(0.005, 8, 8)
        const materialhand = new THREE.MeshBasicMaterial({color: 0xa0f00f })
        const cube = new THREE.Mesh(geometryhand, materialhand)
        scene.add(cube)

        var emitterPosition = new THREE.Vector3()
        emitter.getWorldPosition(emitterPosition)

        var offset = -0.0
        let xx = emitterPosition.x
        let zz = emitterPosition.z
        let yy = emitterPosition.y + (Math.sin(animOffsetWeapon) / 200)
        let aa = camera.rotation.y

        animOffsetWeapon += 0.6
        if(slShot.visible)
            slShot.visible = false
        else
            slShot.visible = true
        lastShotTime = new Date().valueOf()

        setInterval(()=>{
            if(offset < 5) {
                var rayX3 = xx + Math.sin(aa) * offset
                var rayZ3 = zz + Math.cos(aa) * offset
                cube.position.set(rayX3, yy, rayZ3)
                offset += -(0.4 + (Math.random() / 8))
            }
        }, 1000/60)
    }
}

let keyBuffer = []
var offsetHand = 0

var animOffsetWeapon = 0

document.addEventListener("keydown", (event)=>{
    if (!keyBuffer.includes(event.key)){
        keyBuffer.push(event.key)    
    }
})
document.addEventListener("keyup", (event)=>{
    if (keyBuffer.includes(event.key)){
        keyBuffer.splice(keyBuffer.indexOf(event.key))
    }
})


var lastShotTime = 0
setInterval(()=>{
    if(new Date().valueOf() - lastShotTime > 600) {
        animOffsetWeapon = 0
    }
}, 800)

setInterval(()=>{
    slShot.visible = false
}, 60)

const updateInput = () => {
    for(var i = 0; i < keyBuffer.length; i += 1) {
        let key = keyBuffer[i]
        switch (key) {
            case 'v':
                player.makeShot()
                break
            case 'ArrowUp':
                player.angle2 += 3
                break
            case 'ArrowDown':
                player.angle2 -= 3
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
                animOffsetWeapon += 0.08
                let rayX = player.x + Math.sin(UTILS.degrees_to_radians(player.angle)) * -0.05
                let rayZ = player.z + Math.cos(UTILS.degrees_to_radians(player.angle)) * -0.05
                player.x = rayX
                player.z = rayZ
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

const updateScene = () => {
    camera.rotation.y = UTILS.degrees_to_radians(player.angle) 
    camera.rotation.x = UTILS.degrees_to_radians(player.angle2)
    camera.position.set(
        player.x,
        player.y + (offsetHand /2),
        player.z
    )

    if(weapon != undefined) {
        weapon.position.copy(camera.position);
        weapon.rotation.y = UTILS.degrees_to_radians(player.angle)
        weapon.rotation.x = UTILS.degrees_to_radians(player.angle2)

        weapon.updateMatrix();
        weapon.translateZ(-0.2);
        weapon.translateX(0.1);
        weapon.translateY(-0.1 + (Math.sin(animOffsetWeapon) / 400));
    }
}

function animate() {
    updateInput()
    updateScene()
    
	renderer.render( scene, camera );
    requestAnimationFrame( animate );
}

LEVEL.generateLevel(scene, {
    bricks: textureBricks,
    bricks2: textureBricks2
})
animate()