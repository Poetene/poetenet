from django.db import models


class Effect(models.Model):
    slug = models.CharField(max_length=200, default="", unique=True)
    name = models.CharField(max_length=200, default="")
    author = models.CharField(max_length=200, default="")
    code = models.TextField(default="")
