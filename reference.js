const preload = () => {
    let manager  = new THREE.LoadingManager();
    manager.onLoad = function() {
        const environment = new Environment(typo, particle)
    }
 
    var typo = null;
    const loader = new THREE.FontLoader( manager );
    const font = loader.load('./Oswald_Regular.js', function ( font ) { typo = font; });
    const particle = new THREE.TextureLoader( manager ).load( './static/textures/3.jpg');
}

if ( document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll))
preload ();
else
document.addEventListener("DOMContentLoaded", preload ); 

class Environment {
    constructor(font, particle){
        this.font = font;
        this.particle = particle;
        this.container = document.querySelector('.webgl')
        this.scene = new THREE.Scene();

        this.createCamera();
        this.createRenderer();
        this.setup();
        this.bindEvents();

        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        
    }
    

    bindEvents(){
  
        window.addEventListener( 'resize', this.onWindowResize.bind( this ));
        
    }

    setup(){
        this.createParticles = new CreateParticles( 
            this.scene, 
            this.font, 
            this.particle, 
            this.camera, 
            this.render
        )
        
    }

    createCamera() {
        this.cameraGroup = new THREE.Group()
        
        // Base camera
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 130)
        this.camera.position.z = 6
        this.cameraGroup.add(this.camera)
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true
        })
        this.renderer.setSize( this.container.clientWidth, this.container.clientHeight )
        this.renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2))    
    }

    onWindowResize() {
        

        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
    }
}

class myText {
    constructor( scene, font, particleImg, camera, renderer) {
        this.scene = scene;
        this.font - font;
        this.camera = camera;
        this.renderer = renderer;
    }
}

class CreateParticles {
    constructor( scene, font, particleImg, camera, renderer ){
        this.scene = scene;
        this.font = font;
        this.particleImg = particleImg;
        this.camera = camera;
        this.renderer = renderer;

        this.data = {
  
            text: 'Cosmic Calendar\n      Calculator. \n',
            amount: 1500,
            particleSize: 1,
            particleColor: 0xffffff,
            textSize: 10,
            area: 250,
            ease: .05,
        }

        this.setup();
        // this.bindEvents();
    }

    setup(){
        const gradientTexture = this.particle
        // Material
        const material = new THREE.MeshToonMaterial({ 
            color: "#00000",
            gradientMap: gradientTexture
        })
        // Meshes
        const mesh1 = new THREE.Mesh(
            new THREE.TorusGeometry(1, 0.4, 16, 60),
            material
        )
        const mesh2 = new THREE.Mesh(
            new THREE.ConeGeometry(1, 2, 32),
            material
        )
        const mesh3 = new THREE.Mesh(
            new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
            material
        )

        mesh1.position.x = 2
        mesh2.position.x = - 2
        mesh3.position.x = 2
        const objectsDistance = 4
        mesh1.position.y = - objectsDistance * 0
        mesh2.position.y = - objectsDistance * 1
        mesh3.position.y = - objectsDistance * 2
        mesh1.position.z = -5;

        this.scene.add(mesh1, mesh2, mesh3)
        
        this.createText();
    }

    render( level ){

    }

    createText(){

    }

    

}