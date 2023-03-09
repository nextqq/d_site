from api.web_app.v1.serializers import user_serializers
from django.contrib.auth import get_user_model
from telegram_data.models import CustomUser
from rest_framework import generics


class CustomUserRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = user_serializers.MeUserSerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(id=self.request.user.id)
        self.check_object_permissions(self.request, obj)
        return obj

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
