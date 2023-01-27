/*
 * face.js
 *
 * Draws circles and triangles to create a simple face design.
 *
 * CIS367
 * Ethan Grant
 */

// Circle variables
var centerx;
var centery;
var center;
var radius;
var attr = 1;
var fans = 360;
var fanangle;
var vertdata = [];

// Important global variables for WebGL canvas
var canvas;
var gl;

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

    // Configuring core WebGL components

    // Set viewport origin (x, y), and size of the viewport (height, width)
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Specify the color used when clearing color buffers
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    
    var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
    gl.useProgram(program);
    
    // Location of color var
    var u_Color = gl.getUniformLocation(program, "u_Color");

    // console.log(vertdata);
    
    // Set color to green
    gl.uniform4f(u_Color, 0, 1, 0, 1);

    // Draw face
    drawCircle(0.5, 0.5, 0.5); 
    load_and_set(gl, vertdata, program);
    render_circle();

    // Set color to white
    gl.uniform4f(u_Color, 1, 1, 1, 1);
    
    // Draw right eye
    vertdata = [];
    drawCircle(0.25, 0.70, 0.1);
    load_and_set(gl, vertdata, program);
    render_circle();

    // Draw left eye
    vertdata = [];
    drawCircle(0.75, 0.70, 0.1);
    load_and_set(gl, vertdata, program);
    render_circle();

    // Draw mouth
    vertdata = [vec2(0.25, 0.25), vec2(0.75, 0.25), vec2(0.25, 0.30)];
    load_and_set(gl, vertdata, program);
    render_tri();
        
    vertdata = [vec2(0.25, 0.30), vec2(0.75, 0.25), vec2(0.75, 0.30)];
    load_and_set(gl, vertdata, program);
    render_tri();
};

// Load buffers and get ready to render
function load_and_set(gl, vertdata, program) {
     // Load data into GPU
    var bufferID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertdata), gl.STATIC_DRAW);

    // Set position and render
    var vPosition = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition); 
}

// Render a circle from triangle fan
function render_circle() {
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertdata.length);
}

// Render a triangle
function render_tri() {
    gl.drawArrays(gl.TRIANGLES, 0, vertdata.length);
}

// Draw a circle given center points, and radius
function drawCircle(x, y, r) {

    // origin x, y, radius r
    centerx = x;
    centery = y;
    radius = r;

    // All verts fan out from the origin
    center = vec2(centerx, centery);
    vertdata.push(center);

    // Evenly distribute fans across 2pi radians
    fanangle = (2 * Math.PI) / fans

    // For each fan...
    for (var i = 0; i <= fans; i++) {

        // Calculate the angle and find the x, y coordinates (with a distance of r) away from the center of the circle
        var angle = 2 * Math.PI * i / fans
        var x = centerx + radius * Math.cos(angle);
        var y = centery + radius * Math.sin(angle);

        // Place each vertex pair in our vector
        vertdata.push(vec2(x,y));
    }
}
