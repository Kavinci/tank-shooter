
$(document).ready(function(){
    if (Detector.webgl){
        start();
    }
    else {
        var warning = Detector.getWrbGLErrorMessage();
        document.getElementById('container').appendChild(warning);
}
});


function start(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById( 'container' ).appendChild(renderer.domElement);

    var radiusTop = 7;
    var radiusBot = radiusTop * radiusTop/1.25;
    var height = radiusTop + radiusTop/2;
    var radiusSeg = 128;
    var geometry = new THREE.CylinderGeometry(radiusTop, radiusBot, height, radiusSeg);
    var material = new THREE.MeshBasicMaterial({ color: 0x4286f4 });
    var cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);

    var color = new THREE.Color('white');
    var intensity = 2;
    var light = new THREE.Light(color, intensity);
    scene.add(light);

    camera.position.z = 100;

    var up = true;
    function render(){
        
        requestAnimationFrame(render);
        if (up){
            cylinder.position.y += 0.2;
            if(cylinder.position.y <= 25){
                up = true;
            }
            else {
                up = false;
            }
        }
        else {
            cylinder.position.y -= 0.2;
            if(cylinder.position.y >= -25){
                up = false;
            }
            else {
                up = true;
            }
        }
        cylinder.rotation.z += 0.01;
        renderer.render(scene, camera);
    }
    render();
}