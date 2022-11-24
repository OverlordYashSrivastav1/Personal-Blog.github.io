import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#AROLL'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30);

renderer.render(scene,camera);


const geometry = new THREE.SphereGeometry(15,22,10)
const material = new THREE.MeshStandardMaterial({color:0xFF6347})
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const Plight = new THREE.PointLight(0x87CEEB)
const ALight = new THREE.AmbientLight(0xffffff)
Plight.position.set(30,30,30)

//const grid = new THREE.GridHelper(200,50);
//scene.add(grid)

scene.add(Plight,ALight)
const controls = new OrbitControls(camera, renderer.domElement);

//rotation for sun

function animate() {
  //for sun
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  //for free movement
  controls.update();
  //for room
  
  //to render
  renderer.render(scene,camera)

}

animate()

//for resizeing fix

function resize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
}
window,addEventListener('resize',resize.bind());
resize()

//loading Room

function Room() {
  const Gltfloader = new GLTFLoader();
  
  
  Gltfloader.load(
    'assets/Roomgltf.gltf',
    (gltfscene) => {      
      scene.add(gltfscene.scene);
      gltfscene.scene.scale.set(5,5,5)
      gltfscene.scene.position.x=(-30);
      gltfscene.scene.position.y=(-30);
      
    }
  )
}
Room()

function Stars(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}
Array(200).fill().forEach(Stars)

//set background

const spacebg = new THREE.TextureLoader().load('assets/space1.jpg');
scene.background = spacebg;