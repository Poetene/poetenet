# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Removing unique constraint on 'Effect', fields ['slug']
        db.delete_unique(u'htmleditor_effect', ['slug'])


    def backwards(self, orm):
        # Adding unique constraint on 'Effect', fields ['slug']
        db.create_unique(u'htmleditor_effect', ['slug'])


    models = {
        u'htmleditor.effect': {
            'Meta': {'object_name': 'Effect'},
            'author': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '200'}),
            'code': ('django.db.models.fields.TextField', [], {'default': "''"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '200'}),
            'slug': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '200'})
        }
    }

    complete_apps = ['htmleditor']