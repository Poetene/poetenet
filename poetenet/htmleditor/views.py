#-*- encoding: utf8 -*-

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.contrib import messages
from django.db import IntegrityError
from poetenet.htmleditor.models import Effect
from poetenet.htmleditor.forms import EffectForm


def htmleditor(request, id='', slug=''):

    effect = get_object_or_404(Effect, pk=id)
    new_effect = Effect(code=effect.code)
    form = EffectForm(instance=new_effect)

    if request.path != effect.get_absolute_url():
        return HttpResponseRedirect(effect.get_absolute_url())

    if request.method == "POST":
        form = EffectForm(request.POST)
        if form.is_valid():
            try:
                new_effect = form.save()
                messages.add_message(
                    request, messages.SUCCESS, 'Code was shared to ' +
                    'http://poetene.net' + new_effect.get_absolute_url())
                return HttpResponseRedirect(new_effect.get_absolute_url())
            except IntegrityError, e:
                if 'column slug is not unique' == str(e):
                    messages.error(
                        request,
                        'That name is taken. Please try another name.')
            except:
                messages.error(request, 'Code was not shared!')
        new_effect = Effect(code=form.cleaned_data['code'])

    return render(request, 'htmleditor/htmleditor.html', {
        'effect': effect,
        'new_effect': new_effect,
        'form': form,
    })
