import { Renderer, Program, Mesh, Triangle } from 'ogl';
import { useRef, useEffect } from 'react';
import './Lightning.css';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision mediump float;

uniform vec2 iResolution;
uniform float iTime;
uniform float uHue;
uniform float uXOffset;
uniform float uSpeed;
uniform float uIntensity;
uniform float uSize;

out vec4 fragColor;

#define OCTAVE_COUNT 10

vec3 hsv2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(vec3(c.x * 6.0) + vec3(0.0,4.0,2.0), vec3(6.0)) - vec3(3.0)) - vec3(1.0), vec3(0.0), vec3(1.0));
    return c.z * mix(vec3(1.0), rgb, c.y);
}

float hash11(float p) {
    p = fract(p * .1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * .1031);
    p3 += vec3(dot(p3, p3.yzx + vec3(33.33)));
    return fract((p3.x + p3.y) * p3.z);
}

mat2 rotate2d(float theta) {
    float c = cos(theta);
    float s = sin(theta);
    return mat2(c, -s, s, c);
}

float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 fp = fract(p);
    float a = hash12(ip);
    float b = hash12(ip + vec2(1.0, 0.0));
    float c = hash12(ip + vec2(0.0, 1.0));
    float d = hash12(ip + vec2(1.0, 1.0));
    
    vec2 t = smoothstep(0.0, 1.0, fp);
    return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < OCTAVE_COUNT; ++i) {
        value += amplitude * noise(p);
        p *= rotate2d(0.45);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv = 2.0 * uv - vec2(1.0);
    uv.x *= iResolution.x / iResolution.y;
    uv.x += uXOffset;
    
    uv += vec2(2.0 * fbm(uv * uSize + vec2(0.8 * iTime * uSpeed)) - 1.0);
    
    float dist = abs(uv.x);
    vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
    vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
    col = pow(col, vec3(1.0));
    float a = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);
    fragColor = vec4(col, a);
}
`;

const Lightning = ({ hue = 230, xOffset = 0, speed = 1, intensity = 1, size = 1 }) => {
  const containerRef = useRef(null);
  const propsRef = useRef({});
  propsRef.current = { hue, xOffset, speed, intensity, size };

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        iResolution: { value: [ctn.offsetWidth || 300, ctn.offsetHeight || 600] },
        iTime: { value: 0 },
        uHue: { value: hue },
        uXOffset: { value: xOffset },
        uSpeed: { value: speed },
        uIntensity: { value: intensity },
        uSize: { value: size }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    const resize = () => {
      if (!ctn) return;
      const w = ctn.offsetWidth || 300;
      const h = ctn.offsetHeight || 600;
      renderer.setSize(w, h);
      program.uniforms.iResolution.value = [w, h];
    };
    window.addEventListener('resize', resize);
    resize();

    const startTime = performance.now();
    let animFrameId = 0;
    let isIntersecting = true;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isIntersecting = entry.isIntersecting;
      });
    }, { threshold: 0.01 });

    observer.observe(ctn);

    const update = () => {
      animFrameId = requestAnimationFrame(update);
      if (!isIntersecting) return; // Pause rendering loop if out of view

      const props = propsRef.current;
      program.uniforms.iTime.value = (performance.now() - startTime) / 1000.0;
      program.uniforms.uHue.value = props.hue;
      program.uniforms.uXOffset.value = props.xOffset;
      program.uniforms.uSpeed.value = props.speed;
      program.uniforms.uIntensity.value = props.intensity;
      program.uniforms.uSize.value = props.size;
      renderer.render({ scene: mesh });
    };
    animFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <div ref={containerRef} className="lightning-container" />;
};

export default Lightning;
