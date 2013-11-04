from django.conf.urls import patterns, url

urlpatterns = patterns(
    'poetenet.frontpage.views',
    url(r'^/$', 'frontpage'),
)
