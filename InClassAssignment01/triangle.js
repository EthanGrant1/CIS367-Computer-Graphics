/*
 * trangle.js
 *
 * CIS367
 * Ethan Grant
 */

// Important global variables for WebGL canvas
var gl;
var points;

// Exectutes WebGL code after webpage is loaded, so we can
// execute this code anywhere in our webpage and wait until
// the canvas is ready.
window.onload = function init() { 
    // Setup out canvas and WebGL
    var canvas = document.getElementById('gl-canvas');
    gl = WebGLUtils.setupWebGL(canvas);
    
    // If WebGL fails and doesn't initialize
    if (!gl) {
        alert('WebGL unavailable');
    }

    // An array of verts that create an equilateral triangle
    var vertices = [
        vec2(-1, -1),
        vec2(0, 1),
        vec2(1, -1)
    ];
    
    // Configuring core WebGL components

    // Set viewport origin (x, y), and size of the viewport (height, width)
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Specify the color used when clearing color buffers
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Load in the shaders
    var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
    gl.useProgram(program);

    // Load data into GPU
    var bufferID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Set position and render
    var vPosition = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    render();
};

// Render what we have stored in the gl variable
function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
