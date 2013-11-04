from django.conf.urls import patterns, url

urlpatterns = patterns(
    'poetenet.htmleditor.views',
    url(r'^(?P<id>\d+)(?P<slug>[^/]*)/$', 'htmleditor'),
    url(r'^all/$', 'all'),
)
