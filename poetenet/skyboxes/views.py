from django.shortcuts import render


def all(request):
    skyboxes = [
        {
            'prefix': 'CloudyLightRays',
        },
        {
            'prefix': 'DarkStormy',
        },
        {
            'prefix': 'FullMoon',
        },
        {
            'prefix': 'SunSet',
        },
        {
            'prefix': 'ThickCloudsWater',
        },
        {
            'prefix': 'TropicalSunnyDay',
        },
    ]
    return render(request, 'skyboxes/all.html', {'skyboxes': skyboxes})
