from django.conf.urls import patterns, url

urlpatterns = patterns(
    'poetenet.shaders.views',
    url(r'^$', 'all'),
)
