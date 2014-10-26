from django.conf.urls import patterns, url, include
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns(
    '',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^effect/', include('poetenet.htmleditor.urls')),
    url(r'^shaders/', include('poetenet.shaders.urls')),
    url(r'^skyboxes/', include('poetenet.skyboxes.urls')),
    url(r'', include('poetenet.frontpage.urls')),
)
