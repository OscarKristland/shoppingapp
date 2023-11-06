"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns
from .views import OrderListCreateView, ItemListCreateView
from backend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('items/', views.item_list),
    #man kan sätta den till att antingen gå genom Id som det gör nu eller så gör man det med PK
    path('items/<int:id>', views.item_detail),
    # path('create_order_details/', views.create_order_details, name='create_order_details'),
    # path('orders/', views.create_order, name='create_order'),
    path('orders/', OrderListCreateView.as_view(), name='order-list-create'),
    path('items/', ItemListCreateView.as_view(), name='item-list-create'),
]

urlpatterns = format_suffix_patterns(urlpatterns)