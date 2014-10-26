from django.conf.urls import patterns, url

urlpatterns = patterns(
    'poetenet.skyboxes.views',
    url(r'^$', 'all'),
)
