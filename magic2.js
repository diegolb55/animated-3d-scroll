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
}

class createMeshes {
    constructor(scene, font)
}