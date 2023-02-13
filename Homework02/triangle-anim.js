/*
 * trangle-anim.js
 *
 * CIS367
 * Ethan Grant
 */

// Important global variables for WebGL canvas
var gl;
var points;

// Triangle variables
var x = 0.0;
var y = 0.0;
var xLoc, yLoc;
var xDir = 1.0;
var yDir = 1.0;


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
        vec2(-0.25, -0.25),
        vec2(0, 0.25),
        vec2(0.25, -0.25)
    ];
    
    // Configuring core WebGL components

    // Set viewport origin (x, y), and size of the viewport (height, width)
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Specify the color used when clearing color buffers
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Load in the shaders
    var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
    gl.useProgram(program);
    
    xLoc = gl.getUniformLocation(program, "x");
    yLoc = gl.getUniformLocation(program, "y");


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

// Function to get random numbers within a range
function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
}

// Render what we have stored in the gl variable
function render() {

    setTimeout(
        function() {
            requestAnimFrame(render);

            x += 0.05 * xDir;
            y += 0.1 * yDir;

            if (y > 0.9) { // top hit -- reverse y but keep x
    	        y = 0.9;
    	        yDir *= -1.0;
	        }

	        if (x > 0.9) { // right hit -- reverse x but keep y
    	        x = 0.9;
    	        xDir *= -1.0;
	        }

	        if (y < -0.9) { // bottom hit -- reverse y but keep x
    	        y = -0.9;
    	        yDir *= -1.0;
	        }

	        if (x < -0.9) { // left hit -- reverse x but keep y
    	        x = -0.9;
    	        xDir *= -1.0;
	        } 

            gl.uniform1f(xLoc, x);
            gl.uniform1f(yLoc, y);

            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
    
        } ,100
    );

}
