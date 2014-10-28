SHADERS={};SHADERS.colorgrading = {uniforms: {
    "tDiffuse": { "type": 't', "value": null },
    "red": { "type": 'f', "value": 1},
    "green": { "type": 'f', "value": 1},
    "blue": { "type": 'f', "value": 1}
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "varying mediump vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform float red;\nuniform float green;\nuniform float blue;\n\nvoid main() {\n    vec4 color = texture2D(tDiffuse, vUv);\n    gl_FragColor = vec4(color.r * red, color.g * green, color.b * blue , 1.);\n}\n"};
SHADERS.dotscreen = {uniforms: {
    "tDiffuse": { type: "t", value: null },
        "tSize":    { type: "v2", value: null },
        "center":   { type: "v2", value: null },
        "angle":    { type: "f", value: 1.57 },
        "scale":    { type: "f", value: 1.0 }
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n",fragmentShader: "uniform vec2 center;\nuniform float angle;\nuniform float scale;\nuniform vec2 tSize;\nuniform sampler2D tDiffuse;\n\nvarying vec2 vUv;\n\nfloat pattern() {\n\n    float s = sin( angle ), c = cos(angle);\n    vec2 tex = vUv * tSize - center;\n    vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;\n\n    return ( sin( point.x ) * sin( point.y ) ) * 4.0;\n\n}\n\nvoid main() {\n    vec4 color = texture2D( tDiffuse, vUv );\n    float average = ( color.r + color.g + color.b ) / 3.0;\n    gl_FragColor = vec4( vec3( average * 10.0 - 5.0 + pattern() ), color.a );\n}\n"};
SHADERS.example = {uniforms: {
    tDiffuse: { "type": "t", "value": null }
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "void main() {\n    gl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5);\n}\n"};
SHADERS.glitch = {uniforms: {
    tDiffuse: { type: 't', value: null },
    time: { type: 'f', value: null },
    amount: { type: 'f', value: 0}
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform float time;\nuniform float amount;\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\n\nfloat ranieyy(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main(void) {\n    float size = 8.;\n    vec2 pos = vec2(floor(size * 2. * vUv.x + vUv.y * vUv.y * amount * cos(vUv.x * time)) / 2. / size,\n                    floor(size * 18. * vUv.y * sin(time)) / 18. / size);\n    float random = ranieyy(pos + time);\n    vec4 img = texture2D(tDiffuse, vUv);\n    vec4 left = texture2D(tDiffuse, vUv - 0.1);\n    vec4 right = texture2D(tDiffuse, vUv + 0.1);\n    vec4 sine = texture2D(tDiffuse, vec2(sin(vUv.x * 37.), sin(vUv.y * 23.)));\n    vec4 color = vec4(1.);\n    if(random < 0.333) {\n        color = vec4(left.r, img.g, img.b, 1.) + sine;\n    } else if(random < 0.666) {\n        color = vec4(img.b, right.r, img.g, 1.) * sine;\n    } else {\n        color = vec4(img.r, img.g / 2., right.b + sine.b, 1.);\n    }\n    gl_FragColor = (1. - amount) * img + amount * color;\n}\n"};
SHADERS.glowParticle = {uniforms: {"texture":   { "type": "t", "value": null }},vertexShader: "attribute float size;\nattribute vec3 pcolor;\n\nvarying vec3 vColor;\n\nvoid main() {\n    vColor = pcolor;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    gl_PointSize = size * ( 200.0 / length( mvPosition.xyz ) );\n    gl_Position = projectionMatrix * mvPosition;\n}",fragmentShader: "uniform sampler2D texture;\n\nvarying vec3 vColor;\n\nvoid main() {\n  vec4 outColor = texture2D( texture, gl_PointCoord );\n  gl_FragColor = outColor * vec4( vColor, 1.0 );\n}\n"};
SHADERS.lensflare = {uniforms: {
    "tDiffuse": { "type": 't', "value": null },
    "time": { "type": 'f', "value": null },
    "amount": { "type": 'f', "value": 1},
    "sunX": { "type": 'f', "value": 0},
    "sunY": { "type": 'f', "value": 1},
    "width": { "type": 'f', "value": 16},
    "height": { "type": 'f', "value": 9}
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform float time;\nuniform float amount;\nuniform float sunX;\nuniform float sunY;\nuniform sampler2D tDiffuse;\nuniform float width;\nuniform float height;\nvarying vec2 vUv;\n\n/*by musk License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.\n\n  Trying to get some interesting looking lens flares.\n\n  13/08/13: \n  published\n\n  muuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuusk!*/\n\nfloat noise(float t)\n{\n    //return texture2D(iChannel0,vec2(t,.0)/iChannelResolution[0].xy).x;\n    return 0.;\n}\nfloat noise(vec2 t)\n{\n    //return texture2D(iChannel0,t/iChannelResolution[0].xy).x;\n    return 0.;\n}\n\nvec3 lensflare(vec2 uv,vec2 pos)\n{\n    vec2 main = uv-pos;\n    vec2 uvd = uv*(length(uv));\n\n    float ang = atan(main.x,main.y);\n    float dist=length(main); dist = pow(dist,.1);\n    float n = noise(vec2(ang*16.0,dist*32.0));\n\n    float f0 = 1.0/(length(uv-pos)*16.0+1.0);\n\n    f0 = f0+f0*(sin(noise((pos.x+pos.y)*2.2+ang*4.0+5.954)*16.0)*.1+dist*.1+.8);\n\n    float f1 = max(0.01-pow(length(uv+1.2*pos),1.9),.0)*7.0;\n\n    float f2 = max(1.0/(1.0+32.0*pow(length(uvd+0.8*pos),2.0)),.0)*00.25;\n    float f22 = max(1.0/(1.0+32.0*pow(length(uvd+0.85*pos),2.0)),.0)*00.23;\n    float f23 = max(1.0/(1.0+32.0*pow(length(uvd+0.9*pos),2.0)),.0)*00.21;\n\n    vec2 uvx = mix(uv,uvd,-0.5);\n\n    float f4 = max(0.01-pow(length(uvx+0.4*pos),2.4),.0)*6.0;\n    float f42 = max(0.01-pow(length(uvx+0.45*pos),2.4),.0)*5.0;\n    float f43 = max(0.01-pow(length(uvx+0.5*pos),2.4),.0)*3.0;\n\n    uvx = mix(uv,uvd,-.4);\n\n    float f5 = max(0.01-pow(length(uvx+0.2*pos),5.5),.0)*2.0;\n    float f52 = max(0.01-pow(length(uvx+0.4*pos),5.5),.0)*2.0;\n    float f53 = max(0.01-pow(length(uvx+0.6*pos),5.5),.0)*2.0;\n\n    uvx = mix(uv,uvd,-0.5);\n\n    float f6 = max(0.01-pow(length(uvx-0.3*pos),1.6),.0)*6.0;\n    float f62 = max(0.01-pow(length(uvx-0.325*pos),1.6),.0)*3.0;\n    float f63 = max(0.01-pow(length(uvx-0.35*pos),1.6),.0)*5.0;\n\n    vec3 c = vec3(.0);\n\n    c.r+=f2+f4+f5+f6; c.g+=f22+f42+f52+f62; c.b+=f23+f43+f53+f63;\n    c = c*1.3 - vec3(length(uvd)*.05);\n    c+=vec3(f0);\n\n    return c;\n}\n\nvec3 cc(vec3 color, float factor,float factor2) // color modifier\n{\n    float w = color.x+color.y+color.z;\n    return mix(color,vec3(w)*factor,w*factor2);\n}\n\nvoid main(void)\n{\n    //vec2 uv = gl_FragCoord.xy / vec2(width,height) - 0.5;\n    vec2 uv = vec2(vUv)-.5;\n    //vec2 uv = gl_FragCoord.xy / iResolution.xy - 0.5;\n    uv.x *= width/height; //fix aspect ratio\n    vec3 mouse = vec3(.5,.5,.5);\n    //vec3 mouse = vec3(iMouse.xy/iResolution.xy - 0.5,iMouse.z-.5);\n    //mouse.x *= iResolution.x/iResolution.y; //fix aspect ratio\n    //if (iMouse.z<.5)\n    //{\n    mouse.x=sunX-.5;\n    mouse.y=sunY-.5;\n    //}\n\n    vec3 color = vec3(1.4,1.2,1.0)*lensflare(uv,mouse.xy);\n    color -= noise(gl_FragCoord.xy)*.015;\n    color = cc(color,.5,.1);\n    //gl_FragColor = vec4(color,1.0);\n    vec4 img = texture2D(tDiffuse, vec2(vUv.x, vUv.y))*(1.-amount*.5) + vec4(color,1.0)*amount;\n    gl_FragColor = img;\n}\n"};
SHADERS.letterbox = {uniforms: {
    tDiffuse: { type: "t", value: null },
    ratio: { type: "f", value: 0.35 }
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform sampler2D tDiffuse;\nuniform float ratio;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec2 imageCoord = vUv;\n\n    float h = .5-((16./9.)*ratio/2.);\n    if(vUv.y > h && vUv.y <= 1.-h) {\n        gl_FragColor = texture2D(tDiffuse, vUv);\n    } else {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n    }\n}\n"};
SHADERS.mountain = {uniforms: {
    tDiffuse: { type: 't', value: null },
}
,vertexShader: "uniform float time;\nvarying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    gl_Position = projectionMatrix * mvPosition;\n}\n",fragmentShader: "uniform float time;\nuniform float party;\nuniform sampler2D gravel;\nuniform sampler2D grass;\nuniform sampler2D height;\nvarying vec2 vUv;\n\nvoid main(void) {\n    vec4 height = texture2D(height, vUv);\n    vec4 color = vec4(1.);\n    if(height.x < .03){\n        color = texture2D(gravel, vUv);\n    } else if(height.x < .8){\n        color = 0.1 + 0.8 * texture2D(grass, vUv*5.);\n    }\n\n    if(party > 0.){\n        color = texture2D(gravel, vUv * 5. + .1 * sin(time/500.));\n        color *= 0.2;\n        color += cos(3.141592 * time / 500.) * sin(3.141592 * time * vUv.y / 697. / 1.5) * sin(3.141592 * time * vUv.x / 887. / 1.5) * vec4(.6, 0., .2, .1);\n    }\n    gl_FragColor = color;\n}\n"};
SHADERS.noise = {uniforms: {
    tDiffuse: { "type": "t", "value": null },
    time: { "type": "f", "value": null },
    amount: { "type": "f", "value": 0.5},
    width: { "type": "f", "value": 16*8},
    height: { "type": "f", "value": 9*8}
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform float time;\nuniform float amount;\nuniform sampler2D tDiffuse;\nuniform float width;\nuniform float height;\nvarying vec2 vUv;\n\nfloat ranieyy(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main() {\n    vec4 colorInput = texture2D( tDiffuse, vUv );\n    vec2 pozz = vec2(floor(width*vUv.x)/width, floor(height*vUv.y)/height);\n    vec3 color = vec3(.1, 0.1, 0.1) + vec3(ranieyy(vec2(pozz+time/1009.0)));\n    gl_FragColor = colorInput*(1.0-amount)+amount*vec4(color, 0.1);\n}\n"};
SHADERS.planetGlow = {uniforms: { 
  "c": {type: "f", value: 1.0},
  "p": {type: "f", value: 1.4},
  "glowColor": {type: "c", value: null},
  "viewVector": {type: "v3", value: null}
}
,vertexShader: "uniform vec3 viewVector;\nuniform float c;\nuniform float p;\nvarying float intensity;\n\nvoid main() {\n    vec3 vNormal = normalize(normalMatrix * normal);\n    vec3 vNormel = normalize(normalMatrix * viewVector);\n    intensity = pow(c - dot(vNormal, vNormel), p);\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform vec3 glowColor;\nvarying float intensity;\n\nvoid main() {\n    vec3 glow = glowColor * intensity;\n    gl_FragColor = vec4(glow, 1.0);\n}\n"};
SHADERS.scanline = {uniforms: {
    tDiffuse: { type: 't', value: null },
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "varying mediump vec2 vUv;\nuniform sampler2D tDiffuse;\n\nvoid main() {\n    vec4 color = texture2D(tDiffuse, vUv);\n    float s = sin(vUv.y * 160. * .8 * 3.14159265);\n    color *= 1. - (1. + s) * 0.01;\n    gl_FragColor = color;\n}\n"};
SHADERS.water = {uniforms: {
    tDiffuse: { type: 't', value: null },
}
,vertexShader: "const float pi = 3.141592;\nconst int numWaves = 8;\nuniform float waterHeight;\nuniform float time;\nuniform float amplitude[8];\nuniform float wavelength[8];\nuniform float speed[8];\nuniform vec2 direction[8];\nvarying vec2 vUv;\n\nfloat wave(int i, float x, float y) {\n    float frequency = 2.0*pi/wavelength[i];\n    float phase = speed[i] * frequency;\n    float theta = dot(direction[i], vec2(x, y));\n    return amplitude[i] * sin(theta * frequency + time * phase);\n}\n    float waveHeight(float x, float y) {\n    float height = 0.0;\n    for (int i=0; i < numWaves; ++i)\n    height += 10.0*wave(i, x, y);\n    return height;\n}\n\nfloat dWavedx(int i, float x, float y) {\n    float frequency = 2.0*pi/wavelength[i];\n    float phase = speed[i] * frequency;\n    float theta = dot(direction[i], vec2(x, y));\n    float A = amplitude[i] * direction[i].x * frequency;\n    return A * cos(theta * frequency + time * phase);\n}\n\nfloat dWavedy(int i, float x, float y) {\n    float frequency = 2.0*pi/wavelength[i];\n    float phase = speed[i] * frequency;\n    float theta = dot(direction[i], vec2(x, y));\n    float A = amplitude[i] * direction[i].y * frequency;\n    return A * cos(theta * frequency + time * phase);\n}\n\nvec3 waveNormal(float x, float y) {\n    float dx = 0.0;\n    float dy = 0.0;\n    for (int i=0; i < numWaves; ++i) {\n        dx += dWavedx(i, x, y);\n        dy += dWavedy(i, x, y);\n    }\n    vec3 n = vec3(-dx, -dy, 1.0);\n    return normalize(n);\n}\n\nvoid main() {\n    vUv = vec2( 2.0, 2.0 ) * uv;\n    vec4 pos = vec4(position, 1.0);\n    pos.z = waterHeight * waveHeight(pos.x, pos.y);\n    vec4 mvPosition = modelViewMatrix * pos;\n    gl_Position = projectionMatrix * mvPosition;\n}\n",fragmentShader: "varying vec2 vUv;\nuniform sampler2D texture2;\nuniform float time2;\n\nvoid main() {\n    vec2 position = -1.0 + 2.0 * vUv;\n    vec4 noise = texture2D(texture2, vUv);\n    vec2 T = vUv + vec2(-2.5, 10.0) * time2 * 0.01;\n\n    T.x -= noise.y * 0.2;\n    T.y += noise.z * 0.2;\n\n    vec4 color = texture2D(texture2, T * 1.5);\n    gl_FragColor = color;\n}\n"};
SHADERS.default = {uniforms: {
    tDiffuse: { type: 't', value: null },
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform sampler2D tDiffuse;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec4 colorInput = texture2D( tDiffuse, vUv );\n    gl_FragColor = colorInput;\n}\n"};
SHADERS.multiply = {uniforms: {
    tDiffuse: { type: 't', value: null },
    amount: { type: 'f', value: 0},
    r: { type: 'f', value: 0},
    g: { type: 'f', value: 0},
    b: { type: 'f', value: 0}
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform float amount;\nuniform float r;\nuniform float g;\nuniform float b;\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\n\nvoid main() {\n    vec4 fragColor = texture2D(tDiffuse, vUv);\n    gl_FragColor = vec4(mix(fragColor.r, fragColor.r * r, amount),\n                        mix(fragColor.g, fragColor.g * g, amount),\n                        mix(fragColor.b, fragColor.b * b, amount),\n                        1.);\n}\n"};
SHADERS.vignette = {uniforms: {
    tDiffuse: { type: 't', value: null },
    amount: { type: 'f', value: 0}
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform sampler2D tDiffuse;\nuniform float amount;\nvarying vec2 vUv;\n\nvoid main() {\n    vec4 original = texture2D(tDiffuse, vUv);\n    float dist = length(vUv - vec2(0.5, 0.5));\n    dist = dist / 0.707;\n    if(dist < 0.) dist = 0.;\n    if(dist > 1.) dist = 1.;\n    dist = dist * dist * dist;\n    gl_FragColor = vec4(original.xyz * (1. - dist * amount), 1.);\n}\n"};
