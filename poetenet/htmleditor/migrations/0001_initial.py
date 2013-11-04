# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Effect'
        db.create_table(u'htmleditor_effect', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('slug', self.gf('django.db.models.fields.CharField')(default='', unique=True, max_length=200)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=200)),
            ('author', self.gf('django.db.models.fields.CharField')(default='', max_length=200)),
            ('code', self.gf('django.db.models.fields.TextField')(default='')),
        ))
        db.send_create_signal(u'htmleditor', ['Effect'])


    def backwards(self, orm):
        # Deleting model 'Effect'
        db.delete_table(u'htmleditor_effect')


    models = {
        u'htmleditor.effect': {
            'Meta': {'object_name': 'Effect'},
            'author': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '200'}),
            'code': ('django.db.models.fields.TextField', [], {'default': "''"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '200'}),
            'slug': ('django.db.models.fields.CharField', [], {'default': "''", 'unique': 'True', 'max_length': '200'})
        }
    }

    complete_apps = ['htmleditor']