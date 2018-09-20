from django.conf.urls import patterns, url

urlpatterns = patterns(
    'poetenet.music_files.views',
    url(r'^$', 'all'),
)
