from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path, include
from .views import me, users

urlpatterns = format_suffix_patterns([
    path("me/", me.CustomUserRetrieveUpdateAPIView.as_view()),

    path("users/", users.CustomUserReadOnlyModelViewSet.as_view({'get': 'list'})),
    path("users/<str:username>/", users.CustomUserReadOnlyModelViewSet.as_view({'get': 'retrieve'})),
])
