from django.conf.urls import patterns, url, include
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns(
    'poetenet.htmleditor.views',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^(?P<slug>.*)/$', 'htmleditor'),
    url(r'^$', 'htmleditor'),
)
