from django.shortcuts import render


def all(request):
    music_files = [
        {
            'url': 'http://iver.io/stuff/loopable_music1.ogg',
            'tempo': 130
        },
        {
            'url': 'http://iver.io/stuff/loopable_music2.ogg',
            'tempo': 130
        },
        {
            'url': 'http://iver.io/stuff/loopable_music3.ogg',
            'tempo': 130
        },
        {
            'url': 'http://iver.io/stuff/loopable_music4.ogg',
            'tempo': 200
        },
        {
            'url': 'http://iver.io/stuff/loopable_music5.ogg',
            'tempo': 130
        },
        {
            'url': 'http://iver.io/stuff/loopable_music6.ogg',
            'tempo': 60
        },
        {
            'url': 'http://iver.io/stuff/loopable_music7.ogg',
            'tempo': 150
        },
        {
            'url': 'http://iver.io/stuff/loopable_music8.ogg',
            'tempo': 56
        },
    ]
    return render(request, 'music_files/all.html', {'music_files': music_files})
