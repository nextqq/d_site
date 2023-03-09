from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    telegram_id = models.PositiveBigIntegerField(
        verbose_name='Telegram ID',
        null=True,
        blank=True,
        unique=True,
    )
    pass
