from django.shortcuts import render, redirect
from poetenet.htmleditor.models import Effect
from poetenet.htmleditor.forms import EffectForm


def htmleditor(request, slug=''):

    if request.method == "POST":
        effect_form = EffectForm(request.POST)
        if(effect_form.is_valid()):
            effect = effect_form.save()
            return redirect(effect.slug)
        else:
            return redirect('/')

    effect = None
    if slug:
        try:
            effect = Effect.objects.get(slug=slug)
        except Effect.DoesNotExist:
            return redirect('/')
            pass

    return render(request, 'htmleditor/htmleditor.html', {
        'effect': effect,
        'effect_form': EffectForm(),
    })
