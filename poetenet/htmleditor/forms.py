from django.forms import ModelForm
from django.utils.text import slugify
from poetenet.htmleditor.models import Effect


class EffectForm(ModelForm):

    class Meta:
        model = Effect
        fields = ('name', 'author', 'code')

    def save(self, force_insert=False, force_update=False, commit=True):
        m = super(EffectForm, self).save(commit=False)
        m.slug = slugify(m.name)
        if commit:
            m.save()
        return m
