from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext as _
from django.contrib import admin
from telegram_data import models


@admin.register(models.CustomUser)
class CustomUserModelAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'telegram_id')}),
        ('Пользовательские данные', {
            'fields': (
                ('first_name', 'last_name', )
            )
        }),
        (_('Permissions'), {
            'fields': (('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),),
        }),
        (_('Important dates'), {'fields': (('date_joined', 'last_login',),)}),
    )
    readonly_fields = (
        'date_joined', 'last_login', 'first_name', 'last_name', 'email',
    )
    list_display = (
        'username',
        'telegram_id',
        'first_name',
        'last_name',
        'is_active',
        'last_login',
    )
