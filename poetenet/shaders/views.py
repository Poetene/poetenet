from django.shortcuts import render


def all(request):
    shaders = [
        {
            'title': 'Lens flare',
            'id': 'lensflare',
            'description': 'A Lens Flare effect',
            'example': '/effect/47-lens-flare/'
        },
        {
            'title': 'Vignette',
            'id': 'vignette',
            'description': 'A vignette effect',
            'example': '/effect/50-vignette/'
        },
        {
            'title': 'Multiply',
            'id': 'multiply',
            'description': 'Can be used for fading, and adjusting brightness',
            'example': '/effect/45-multiply-shader/'
        },
        {
            'title': 'Glitch',
            'id': 'glitch',
            'description': 'Fancy glitch effects',
            'example': '/effect/48-glitch-shader-effect/'
        },
        {
            'title': 'Noise',
            'id': 'noise',
            'description': 'Noise',
            'example': '/effect/49-noise-effect/'
        },
        {
            'title': 'Letterbox',
            'id': 'letterbox',
            'description': 'Create slick widescreen effects',
            'example': '/effect/46-letterbox-effect/'
        },
        {
            'title': 'Dot Screen',
            'id': 'dotscreen',
            'description': 'Render the screen as lots of dots',
            'example': '/effect/10-dot-screen-shader/'
        }
    ]
    return render(request, 'shaders/all.html', {'shaders': shaders})
