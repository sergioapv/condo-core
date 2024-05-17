
from django.urls import path
from . import views

urlpatterns = [
    path('', views.condos, name='condos'),
]