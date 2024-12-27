from django.contrib import admin
from core import models
# Register your models here.
@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'role']
    list_display_links = ['id', 'username', 'role']

@admin.register(models.Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'type','expiration_date','serial']
    list_display_links = ['id', 'name', 'type','expiration_date','serial']

@admin.register(models.Stage)
class StageAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description']
    list_display_links = ['id', 'name', 'description']

@admin.register(models.Traceability)
class TraceabilityAdmin(admin.ModelAdmin):
    list_display = ['id', 'material', 'stage', 'performed_by', 'timestamp','failure']
    list_display_links = ['id', 'material', 'stage', 'performed_by', 'timestamp','failure']


