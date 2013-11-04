from django.conf.urls import patterns, url, include
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns(
    '',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^effect/', include('poetenet.htmleditor.urls')),
    url(r'^', include('poetenet.frontpage.urls')),
)
