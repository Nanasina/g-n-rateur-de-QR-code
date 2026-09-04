from django.urls import path
from . import views

urlpatterns = [
    path('api/generation/', views.generation_qrcode, name='generation_qrcode'),
]