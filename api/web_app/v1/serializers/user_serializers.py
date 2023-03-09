from telegram_data.models import CustomUser
from rest_framework import serializers


class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('username', 'first_name', 'last_name', 'date_joined', 'email')


class UserDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id', '__str__', )


class MeUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = (
            'pk',
            'is_superuser',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_staff',
            'is_active',
            'email',
        )
