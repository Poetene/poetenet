SHADERS={};SHADERS.example = {uniforms: {
    tDiffuse: { "type": "t", "value": null }
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "void main() {\n    gl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5);\n}\n"};
SHADERS.glowParticle = {uniforms: {"texture":   { "type": "t", "value": null }},vertexShader: "attribute float size;\nattribute vec3 pcolor;\n\nvarying vec3 vColor;\n\nvoid main() {\n    vColor = pcolor;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    gl_PointSize = size * ( 200.0 / length( mvPosition.xyz ) );\n    gl_Position = projectionMatrix * mvPosition;\n}",fragmentShader: "uniform sampler2D texture;\n\nvarying vec3 vColor;\n\nvoid main() {\n  vec4 outColor = texture2D( texture, gl_PointCoord );\n  gl_FragColor = outColor * vec4( vColor, 1.0 );\n}\n"};
SHADERS.mountain = {uniforms: {
    tDiffuse: { type: 't', value: null },
}
,vertexShader: "uniform float time;\nvarying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    gl_Position = projectionMatrix * mvPosition;\n}\n",fragmentShader: "uniform float time;\nuniform float party;\nuniform sampler2D gravel;\nuniform sampler2D grass;\nuniform sampler2D height;\nvarying vec2 vUv;\n\nvoid main(void) {\n    vec4 height = texture2D(height, vUv);\n    vec4 color = vec4(1.);\n    if(height.x < .03){\n        color = texture2D(gravel, vUv);\n    } else if(height.x < .8){\n        color = 0.1 + 0.8 * texture2D(grass, vUv*5.);\n    }\n\n    if(party > 0.){\n        color = texture2D(gravel, vUv * 5. + .1 * sin(time/500.));\n        color *= 0.2;\n        color += cos(3.141592 * time / 500.) * sin(3.141592 * time * vUv.y / 697. / 1.5) * sin(3.141592 * time * vUv.x / 887. / 1.5) * vec4(.6, 0., .2, .1);\n    }\n    gl_FragColor = color;\n}\n"};
SHADERS.noise = {uniforms: {
    tDiffuse: { "type": "t", "value": null },
    time: { "type": "f", "value": null },
    amount: { "type": "f", "value": 0},
    width: { "type": "f", "value": null},
    height: { "type": "f", "value": null}
}
,vertexShader: "varying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform float time;\nuniform float amount;\nuniform sampler2D tDiffuse;\nuniform float width;\nuniform float height;\nvarying vec2 vUv;\n\nfloat ranieyy(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main() {\n    vec4 colorInput = texture2D( tDiffuse, vUv );\n    vec2 pozz = vec2(floor(width*vUv.x)/width, floor(height*vUv.y)/height);\n    vec3 color = vec3(.1, 0.1, 0.1) + vec3(ranieyy(vec2(pozz+time/1009.0)));\n    gl_FragColor = colorInput*(1.0-amount)+amount*vec4(color, 0.1);\n}\n"};
SHADERS.planetGlow = {uniforms: { 
  "c": {type: "f", value: 1.0},
  "p": {type: "f", value: 1.4},
  "glowColor": {type: "c", value: null},
  "viewVector": {type: "v3", value: null}
}
,vertexShader: "uniform vec3 viewVector;\nuniform float c;\nuniform float p;\nvarying float intensity;\n\nvoid main() {\n    vec3 vNormal = normalize(normalMatrix * normal);\n    vec3 vNormel = normalize(normalMatrix * viewVector);\n    intensity = pow(c - dot(vNormal, vNormel), p);\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",fragmentShader: "uniform vec3 glowColor;\nvarying float intensity;\n\nvoid main() {\n    vec3 glow = glowColor * intensity;\n    gl_FragColor = vec4(glow, 1.0);\n}\n"};
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
