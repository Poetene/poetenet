import base64
from django.db import models


class Effect(models.Model):
    slug = models.CharField(max_length=200, default="", unique=True)
    name = models.CharField(max_length=200, default="")
    author = models.CharField(max_length=200, default="")
    code = models.TextField(default="")

    def get_code_in_base64(self):
        return base64.b64encode(self.code)

    def __unicode__(self):
        return self.name

    def get_absolute_url(self):
        return '/effect/' + str(self.pk) + \
            (('-' + self.slug) if self.slug else '') + '/'
