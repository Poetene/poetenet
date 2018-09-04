from django.shortcuts import render


def all(request):
    shaders = [
        {
            'title': 'Lens flare',
            'id': 'lensflare',
            'description': 'A Lens Flare effect',
            'example': '/threejs/effect/47-lens-flare/',
            'properties': [
                ('sunY', 'The \'sun\' Y position'),
                ('sunX', 'The \'sun\' X position'),
                ('amount', 'The intensity of the effect')
            ]
        },
        {
            'title': 'Vignette',
            'id': 'vignette',
            'description': 'A vignette effect',
            'example': '/threejs/effect/50-vignette/',
            'properties': [
                ('amount', 'How large is the vignette'),
            ]
        },
        {
            'title': 'Multiply',
            'id': 'multiply',
            'description': 'Can be used for fading, and adjusting brightness',
            'example': '/threejs/effect/45-multiply-shader/',
            'properties': [
                ('amount', '0 means no multiply, and 1 is completely black')
            ]
        },
        {
            'title': 'Glitch',
            'id': 'glitch',
            'description': 'Fancy glitch effects',
            'example': '/threejs/effect/48-glitch-shader-effect/',
            'properties': [
                ('time', 'Incrementing this value keeps varying the glitches'),
                ('amount', 'How much glitch to apply'),
            ]
        },
        {
            'title': 'Noise',
            'id': 'noise',
            'description': 'Noise',
            'example': '/threejs/effect/49-noise-effect/',
            'properties': [
                ('time', 'Incrementing this value keeps varying the noise'),
                ('amount', 'How much noise to apply'),
            ]
        },
        {
            'title': 'Letterbox',
            'id': 'letterbox',
            'description': 'Create slick widescreen effects',
            'example': '/threejs/effect/46-letterbox-effect/',
            'properties': [
                ('ratio', 'Lower number means wider screen')
            ]
        },
        {
            'title': 'Dot Screen',
            'id': 'dotscreen',
            'description': 'Render the screen as lots of dots',
            'example': '/threejs/effect/10-dot-screen-shader/',
            'properties': [
                ('size', 'Size of the dots'),
            ]
        },
        {
            'title': 'Mandelbrot',
            'id': 'mandelbrot',
            'description': 'Mandelbrot fractal',
            'example': '/threejs/effect/55-mandelbrot-fractal/',
            'properties': [
                ('time', 'Defines the zoom level'),
                ('resolution', 'Resolution of the screen, THREE.Vector2()'),
                ('zoomCoordinate', 'Center of screen. THREE.Vector2()'),
                ('tExplosion', 'Texture used for coloring'),
            ]
        }
    ]
    return render(request, 'shaders/all.html', {'shaders': shaders})
