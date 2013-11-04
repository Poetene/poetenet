from django.shortcuts import render
from poetenet.htmleditor.models import Effect


def htmleditor(request, slug=''):
    effect = Effect()
    try:
        effect = Effect.objects.get(slug=slug)
    except Effect.DoesNotExist:
        pass

    return render(request, 'htmleditor/htmleditor.html', {
        'effect': effect,
    })
