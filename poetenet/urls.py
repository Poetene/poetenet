# -*- coding: utf8 -*-

from django.conf.urls import patterns, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns(
    'poetenet.htmleditor.views',
    url(r'^(?P<slug>.*)/$', 'htmleditor'),
    url(r'^$', 'htmleditor'),
)
