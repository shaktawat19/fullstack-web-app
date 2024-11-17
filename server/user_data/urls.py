from django.urls import path
from .views import get_user_data

urlpatterns = [
    path('api/search/', get_user_data, name='get_user_data'),
]
