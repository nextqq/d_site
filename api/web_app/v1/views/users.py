from api.web_app.v1.serializers import user_serializers
from django.contrib.auth import get_user_model
from rest_framework import viewsets


class CustomUserReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'username'
    queryset = get_user_model().objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return user_serializers.UserListSerializer
        elif self.action == "retrieve":
            return user_serializers.UserDetailSerializer
