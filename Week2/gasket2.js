"use strict";

var canvas;
var gl;

var points = [];

var index = 0;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if (!gl) { alert("WebGL isn't available"); }


    
    for (var i = 0; i < 360; i += 1) {
        var x = 80*Math.cos(i * Math.PI / 180)  ;
        var y = 180+80*Math.sin(i * Math.PI / 180);
        points.push(vec2(x / 512.0, y / 512.0));
    }
    
    for (var i = 0; i < 360; i += 1) {
        var x = -60 + 30 * Math.cos(i * Math.PI / 180);
        var y = -160 + 80 * Math.sin(i * Math.PI / 180);
        points.push(vec2(x / 512.0, y / 512.0));
        x = 60 + 30 * Math.cos(i * Math.PI / 180);
        points.push(vec2(x / 512.0, y / 512.0));
    }
    
     

    for (var i = 0; i < 360; i += 1) {
        var x = 100 * Math.cos(i * Math.PI / 180) ;
        var y = 140 * Math.sin(i * Math.PI / 180) ;
        points.push(vec2(x / 512.0, y / 512.0));
      
    }
   
    for (var i = 0; i < 360; i += 1) {
        var x = -120 + 80 * Math.cos(i * Math.PI / 180);
        var y = 80 + 30 * Math.sin(i * Math.PI / 180);
        points.push(vec2(x / 512.0, y / 512.0));
        x = 120 + 80 * Math.cos(i * Math.PI / 180);
        points.push(vec2(x / 512.0, y / 512.0));
      
    }
    
    for (var i = 0; i < 360; i += 1) {
        var x = -80 + 30 * Math.cos(i * Math.PI / 180);
        var y = 250 + 30 * Math.sin(i * Math.PI / 180);
        points.push(vec2(x / 512.0, y / 512.0));
        x = 80 + 30 * Math.cos(i * Math.PI / 180);
        points.push(vec2(x / 512.0, y / 512.0));
        
    }
   
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};



function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays(gl.points, 0, points.length );
}
