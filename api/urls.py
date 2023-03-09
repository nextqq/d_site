from django.urls import path, include

urlpatterns = [
    path('web-app/v1/', include('api.web_app.v1.urls')),
]
