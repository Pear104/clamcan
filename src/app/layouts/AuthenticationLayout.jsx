import React, { useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { MoveLeft } from "lucide-react";
import webglUtils from "app/modules/webgl-utils";
import ToggleLanguage from "app/components/ToggleLanguage";

export const Back = () => {
  return (
    <Link
      to="/"
      className="group absolute top-4 left-4 hover:bg-emerald-600 p-4 rounded-xl z-30 bg-emerald-500"
    >
      <MoveLeft size={24} className="text-white" />
    </Link>
  );
};

export const CanvasBackground = ({ isWorker = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl2");
    if (!gl) {
      return;
    }

    const vs = `#version 300 es
      // an attribute is an input (in) to a vertex shader.
      // It will receive data from a buffer
      in vec4 a_position;
  
      // all shaders have a main function
      void main() {
  
        // gl_Position is a special variable a vertex shader
        // is responsible for setting
        gl_Position = a_position;
      }
    `;

    let fs = `#version 300 es
      precision highp float;
      
      uniform vec2 iResolution;
      uniform float iTime;
      
      //  ----- SHADERTOY START -----

/** 

    License: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
    
    Corne Keyboard Test Shader
    11/26/2024  @byt3_m3chanic
    
    Got this tiny Corne knock-off type keyboard from Amazon - 36 key
    So this is me trying to code a shader, and memorize the key 
    combos for the special/math chars.
    
    see keyboard here:
    https://bsky.app/profile/byt3m3chanic.bsky.social/post/3lbsqbatwjc2q
    
*/

#define R           iResolution
#define T           iTime
#define M           iMouse

#define PI         3.14159265359
#define PI2        6.28318530718

mat2 rot(float a) {return mat2(cos(a),sin(a),-sin(a),cos(a));}
vec3 hue(float t, float f) { return f+f*cos(PI2*t*(vec3(1,.75,.75)+vec3(.96,.57,.12)));}
float hash21(vec2 a) {return fract(sin(dot(a,vec2(27.69,32.58)))*43758.53);}
float box(vec2 p, vec2 b) {vec2 d = abs(p)-b; return length(max(d,0.)) + min(max(d.x,d.y),0.);}
mat2 r90;
vec2 pattern(vec2 p, float sc) {
    vec2 uv = p;
    vec2 id = floor(p*sc);
          p = fract(p*sc)-.5;

    float rnd = hash21(id);
    
    // turn tiles
    if(rnd>.5) p *= r90;
    rnd=fract(rnd*32.54);
    if(rnd>.4) p *= r90;
    if(rnd>.8) p *= r90;
    
    // randomize hash for type
    rnd=fract(rnd*47.13);

    float tk = .075;
    // kind of messy and long winded
    float d = box(p-vec2(.6,.7),vec2(.25,.75))-.15;
    float l = box(p-vec2(.7,.5),vec2(.75,.15))-.15;
    float b = box(p+vec2(0,.7),vec2(.05,.25))-.15;
    float r = box(p+vec2(.6,0),vec2(.15,.05))-.15;
    d = abs(d)-tk; 
    
    if(rnd>.92) {
        d = box(p-vec2(-.6,.5),vec2(.25,.15))-.15;
        l = box(p-vec2(.6,.6),vec2(.25))-.15;
        b = box(p+vec2(.6,.6),vec2(.25))-.15;
        r = box(p-vec2(.6,-.6),vec2(.25))-.15;
        d = abs(d)-tk; 
        
    } else if(rnd>.6) {
        d = length(p.x-.2)-tk;
        l = box(p-vec2(-.6,.5),vec2(.25,.15))-.15;
        b = box(p+vec2(.6,.6),vec2(.25))-.15;
        r = box(p-vec2(.3,0),vec2(.25,.05))-.15;
    }
    
    l = abs(l)-tk; b = abs(b)-tk; r = abs(r)-tk;

    float e = min(d,min(l,min(b,r)));
    
    if(rnd>.6) {
        r = max(r,-box(p-vec2(.2,.2),vec2(tk*1.3)));
        d = max(d,-box(p+vec2(-.2,.2),vec2(tk*1.3)));
    } else {
        l = max(l,-box(p-vec2(.2,.2),vec2(tk*1.3)));
    }
    
    d = min(d,min(l,min(b,r)));

    return vec2(d,e);
}
void mainImage( out vec4 O, in vec2 F )
{
    vec3 C = vec3(.0);
    vec2 uv = (2.*F-R.xy)/max(R.x,R.y);
    r90 = rot(1.5707);
    
    uv *= rot(T*.095);
    uv = vec2(log(length(uv)), atan(uv.y, uv.x))*1.272;

    float scale = 8.;
    for(float i=0.;i<4.;i++){  
        float ff=(i*.05)+.2;

        uv.x+=T*ff;

        float px = fwidth(uv.x*scale);
        vec2 d = pattern(uv,scale);
        vec3 clr = hue(sin(uv.x+(i*8.))*.2+.4,(.5+i)*.15);
        C = mix(C,vec3(.001),smoothstep(px,-px,d.y-.04));
        C = mix(C,clr,smoothstep(px,-px,d.x));
        scale *=.5;
    }

    // Output to screen
    C = pow(C,vec3(.4545));
    O = vec4(C,1.0);
}


      //----- SHADERTOY END -----
      
      out vec4 outColor;
      
      void main() {
        mainImage(outColor, gl_FragCoord.xy);
      }
    `;

    if (true) {
      fs = `#version 300 es
      precision highp float;
      
      uniform vec2 iResolution;
      uniform float iTime;
      
      //  ----- SHADERTOY START -----

// Author: bitless
// Title: Coastal Landscape

// Thanks to Patricio Gonzalez Vivo & Jen Lowe for "The Book of Shaders"
// and Fabrice Neyret (FabriceNeyret2) for https://shadertoyunofficial.wordpress.com/
// and Inigo Quilez (iq) for  https://iquilezles.org/www/index.htm
// and whole Shadertoy community for inspiration.

#define p(t, a, b, c, d) ( a + b*cos( 6.28318*(c*t+d) ) ) //IQ's palette function (https://www.iquilezles.org/www/articles/palettes/palettes.htm)
#define sp(t) p(t,vec3(.26,.76,.77),vec3(1,.3,1),vec3(.8,.4,.7),vec3(0,.12,.54)) //sky palette
#define hue(v) ( .6 + .76 * cos(6.3*(v) + vec4(0,23,21,0) ) ) //hue

// "Hash without Sine" by Dave_Hoskins.
// https://www.shadertoy.com/view/4djSRW
float hash12(vec2 p)
{
  vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p)
{
  vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx+33.33);
    return fract((p3.xx+p3.yz)*p3.zy);
}
////////////////////////

vec2 rotate2D (vec2 st, float a){
    return  mat2(cos(a),-sin(a),sin(a),cos(a))*st;
}

float st(float a, float b, float s) //AA bar
{
    return smoothstep (a-s, a+s, b);
}

float noise( in vec2 p ) //gradient noise
{
    vec2 i = floor( p );
    vec2 f = fract( p );
    
    vec2 u = f*f*(3.-2.*f);

    return mix( mix( dot( hash22( i+vec2(0,0) ), f-vec2(0,0) ), 
                     dot( hash22( i+vec2(1,0) ), f-vec2(1,0) ), u.x),
                mix( dot( hash22( i+vec2(0,1) ), f-vec2(0,1) ), 
                     dot( hash22( i+vec2(1,1) ), f-vec2(1,1) ), u.x), u.y);
}

void mainImage( out vec4 O, in vec2 g)
{
    vec2 r = iResolution.xy
        ,uv = (g+g-r)/r.y
        ,sun_pos = vec2(r.x/r.y*.42,-.53) //sun position 
        ,tree_pos = vec2(-r.x/r.y*.42,-.2) //tree position 
        ,sh, u, id, lc, t;

    vec3 f, c;
    float xd, yd, h, a, l;
    vec4 C;
    
    float sm = 3./r.y; //smoothness factor for AA

    sh = rotate2D(sun_pos, noise(uv+iTime*.25)*.3); //big noise on the sky
     
    if (uv.y > -.4) //drawing the sky
    {
        u = uv + sh;
        
        yd = 60.; //number of rings 
        
        id =  vec2((length(u)+.01)*yd,0); //segment id: x - ring number, y - segment number in the ring  
        xd = floor(id.x)*.09; //number of ring segments
        h = (hash12(floor(id.xx))*.5+.25)*(iTime+10.)*.25; //ring shift
        t = rotate2D (u,h); //rotate the ring to the desired angle
    
        id.y = atan(t.y,t.x)*xd;
        lc = fract(id); //segment local coordinates
        id -= lc;
    
        // determining the coordinates of the center of the segment in uv space
        t = vec2(cos((id.y+.5)/xd)*(id.x+.5)/yd,sin((id.y+.5)/xd)*(id.x+.5)/yd); 
        t = rotate2D(t,-h) - sh;
    
        h = noise(t*vec2(.5,1)-vec2(iTime*.2,0)) //clouds
            * step(-.25,t.y); //do not draw clouds below -.25
        h = smoothstep (.052,.055, h);
        
        
        lc += (noise(lc*vec2(1,4)+id))*vec2(.7,.2); //add fine noise
        
        f = mix (sp(sin(length(u)-.1))*.35, //sky background
                mix(sp(sin(length(u)-.1)+(hash12(id)-.5)*.15),vec3(1),h), //mix sky color and clouds
                st(abs(lc.x-.5),.4,sm*yd)*st(abs(lc.y-.5),.48,sm*xd));
    };

    if (uv.y < -.35) //drawing water
    {

        float cld = noise(-sh*vec2(.5,1)  - vec2(iTime*.2,0)); //cloud density opposite the center of the sun
        cld = 1.- smoothstep(.0,.15,cld)*.5;

        u = uv*vec2(1,15);
        id = floor(u);

        for (float i = 1.; i > -1.; i--) //drawing a wave and its neighbors from above and below
        {
            if (id.y+i < -5.)
            {
                lc = fract(u)-.5;
                lc.y = (lc.y+(sin(uv.x*12.-iTime*3.+id.y+i))*.25-i)*4.; //set the waveform and divide it into four strips
                h = hash12(vec2(id.y+i,floor(lc.y))); //the number of segments in the strip and its horizontal offset
                
                xd = 6.+h*4.;
                yd = 30.;
                lc.x = uv.x*xd+sh.x*9.; //divide the strip into segments
                lc.x += sin(iTime * (.5 + h*2.))*.5; //add a cyclic shift of the strips horizontally
                h = .8*smoothstep(5.,.0,abs(floor(lc.x)))*cld+.1; //determine brightness of the sun track 
                f = mix(f,mix(vec3(0,.1,.5),vec3(.35,.35,0),h),st(lc.y,0.,sm*yd)); //mix the color of the water and the color of the track for the background of the water 
                lc += noise(lc*vec2(3,.5))*vec2(.1,.6); //add fine noise to the segment
                
                f = mix(f,                                                                         //mix the background color 
                    mix(hue(hash12(floor(lc))*.1+.56).rgb*(1.2+floor(lc.y)*.17),vec3(1,1,0),h)     //and the stroke color
                    ,st(lc.y,0.,sm*xd)
                    *st(abs(fract(lc.x)-.5),.48,sm*xd)*st(abs(fract(lc.y)-.5),.3,sm*yd)
                    );
            }
        }
    }
    
    O = vec4(f,1);

    ////////////////////// drawing the grass
    a = 0.;
    u = uv+noise(uv*2.)*.1 + vec2(0,sin(uv.x*1.+3.)*.4+.8);
    
    f = mix(vec3(.7,.6,.2),vec3(0,1,0),sin(iTime*.2)*.5+.5); //color of the grass, changing from green to yellow and back again
    O = mix(O,vec4(f*.4,1),step(u.y,.0)); //draw grass background

    xd = 60.;  //grass size
    u = u*vec2(xd,xd/3.5); 
    

    if (u.y < 1.2)
    {
        for (float y = 0.; y > -3.; y--)
          {
            for (float x = -2.; x <3.; x++)
            {
                id = floor(u) + vec2(x,y);
                lc = (fract(u) + vec2(1.-x,-y))/vec2(5,3);
                h = (hash12(id)-.5)*.25+.5; //shade and length for an individual blade of grass

                lc-= vec2(.3,.5-h*.4);
                lc.x += sin(((iTime*1.7+h*2.-id.x*.05-id.y*.05)*1.1+id.y*.5)*2.)*(lc.y+.5)*.5;
                t = abs(lc)-vec2(.02,.5-h*.5);
                l =  length(max(t,0.)) + min(max(t.x,t.y),0.); //distance to the segment (blade of grass)

                l -= noise (lc*7.+id)*.1; //add fine noise
                C = vec4(f*.25,st(l,.1,sm*xd*.09)); //grass outline                
                C = mix(C,vec4(f                  //grass foregroud
                            *(1.2+lc.y*2.)  //the grass is a little darker at the root
                            *(1.8-h*2.5),1.)    //brightness variations for individual blades of grass
                            ,st(l,.04,sm*xd*.09));
                
                O = mix (O,C,C.a*step (id.y,-1.));
                a = max (a, C.a*step (id.y,-5.));  //a mask to cover the trunk of the tree with grasses in the foreground
            }
        }
    }

    float T = sin(iTime*.5); //tree swing cycle
 
    if (abs(uv.x+tree_pos.x-.1-T*.1) < .6) // drawing the tree
    {
        u = uv + tree_pos;
        // draw the trunk of the tree first
        u.x -= sin(u.y+1.)*.2*(T+.75); //the trunk bends in the wind
        u += noise(u*4.5-7.)*.25; //trunk curvature
        
        xd = 10., yd = 60.; 
        t = u * vec2(1,yd); //divide the trunk into segments
        h = hash12(floor(t.yy)); //horizontal shift of the segments and the color tint of the segment  
        t.x += h*.01;
        t.x *= xd;
        
        lc = fract(t); //segment local coordinates
        
        float m = st(abs(t.x-.5),.5,sm*xd)*step(abs(t.y+20.),45.); //trunk mask
        C = mix(vec4(.07) //outline color
                ,vec4(.5,.3,0,1)*(.4+h*.4) //foreground color 
                ,st(abs(lc.y-.5),.4,sm*yd)*st(abs(lc.x-.5),.45,sm*xd));
        C.a = m;
        
        xd = 30., yd = 15.;
        
        for (float xs =0.;xs<4.;xs++) //drawing four layers of foliage
        {
            u = uv + tree_pos + vec2 (xs/xd*.5 -(T +.75)*.15,-.7); //crown position
            u += noise(u*vec2(2,1)+vec2(-iTime+xs*.05,0))*vec2(-.25,.1)*smoothstep (.5,-1.,u.y+.7)*.75; //leaves rippling in the wind
    
            t = u * vec2(xd,1.);
            h = hash12(floor(t.xx)+xs*1.4); //number of segments for the row
            
            yd = 5.+ h*7.;
            t.y *= yd;
    
            sh = t;
            lc = fract(t);
            h = hash12(t-lc); //segment color shade
    
            
            t = (t-lc)/vec2(xd,yd)+vec2(0,.7);
            
            m = (step(0.,t.y)*step (length(t),.45) //the shape of the crown - the top 
                + step (t.y,0.)*step (-0.7+sin((floor(u.x)+xs*.5)*15.)*.2,t.y)) //the bottom
                *step (abs(t.x),.5) //crown size horizontally
                *st(abs(lc.x-.5),.35,sm*xd*.5); 
    
            lc += noise((sh)*vec2(1.,3.))*vec2(.3,.3); //add fine noise
            
            f = hue((h+(sin(iTime*.2)*.5+.5))*.2).rgb-t.x; //color of the segment changes cyclically
    
            C = mix(C,
                    vec4(mix(f*.15,f*.6*(.7+xs*.2), //mix outline and foreground color
                        st(abs(lc.y-.5),.47,sm*yd)*st(abs(lc.x-.5),.2,sm*xd)),m)
                    ,m);
        }

        O = mix (O,C,C.a*(1.-a));
    }
}
  

      //----- SHADERTOY END -----
      
      out vec4 outColor;
      
      void main() {
        mainImage(outColor, gl_FragCoord.xy);
      }
    `;
    }

    // setup GLSL program
    const program = webglUtils.createProgramFromSources(gl, [vs, fs]);

    // look up where the vertex data needs to go.
    const positionAttributeLocation = gl.getAttribLocation(
      program,
      "a_position"
    );

    // look up uniform locations
    const resolutionLocation = gl.getUniformLocation(program, "iResolution");
    const timeLocation = gl.getUniformLocation(program, "iTime");

    // Create a vertex array object (attribute state)
    const vao = gl.createVertexArray();

    // and make it the one we're currently working with
    gl.bindVertexArray(vao);

    // Create a buffer to put three 2d clip space points in
    const positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // fill it with a 2 triangles that cover clip space
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1,
        -1, // first triangle
        1,
        -1,
        -1,
        1,
        -1,
        1, // second triangle
        1,
        -1,
        1,
        1,
      ]),
      gl.STATIC_DRAW
    );

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    gl.vertexAttribPointer(
      positionAttributeLocation,
      2, // 2 components per iteration
      gl.FLOAT, // the data is 32bit floats
      false, // don't normalize the data
      0, // 0 = move forward size * sizeof(type) each iteration to get the next position
      0 // start at the beginning of the buffer
    );

    function render(time) {
      time *= 0.001; // convert to seconds

      webglUtils.resizeCanvasToDisplaySize(gl.canvas);

      // Tell WebGL how to convert from clip space to pixels
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      // Tell it to use our program (pair of shaders)
      gl.useProgram(program);

      // Bind the attribute/buffer set we want.
      gl.bindVertexArray(vao);

      gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
      gl.uniform1f(timeLocation, time);

      gl.drawArrays(
        gl.TRIANGLES,
        0, // offset
        6 // num vertices to process
      );

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 right-0 bottom-0  w-screen h-screen"
    />
  );
};

export default function AuthenticationLayout() {
  return (
    <>
      <div className="h-screen flex bg-emerald-200">
        <div className="z-10 fixed top-4 right-4 bg-secondary rounded-md px-3 py-1 flex justify-center">
          <ToggleLanguage />
        </div>
        <Back />
        <CanvasBackground />
        {/* <div className="w-4/12 relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col items-center justify-center gap-6 text-white p-12">
            <Logo size="big" />
            <div className="text-xl font-bold">
              Connecting Talent to Opportunity!
            </div>
          </div>
          <div className="relative z-10 p-4">
            <p className="italic font-semibold tracking-widest">
              © 2023 Headhunter. All Rights Reserved.
            </p>
          </div>
        </div> */}

        <div className="w-full p-12 flex flex-col justify-center items-center -translate-y-4 text-primary">
          <Outlet />
        </div>
      </div>
    </>
  );
}
