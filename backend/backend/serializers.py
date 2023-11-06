# from rest_framework import serializers
# from .models import Item, Order, OrderDetails

# class ItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Item
#         fields = ['id', 'name', 'description', 'price']


# class OrderDetailsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OrderDetails
#         fields = ['order', 'item', 'quantity']

# class OrderSerializer(serializers.ModelSerializer):
#     order_details = serializers.RelatedField(many = True)
#     class Meta:
#         model = Order
#         fields = ['name', 'city', 'adress', 'phonenumber']
# ##separera alla serializers

from rest_framework import serializers
from .models import Item, Order, OrderItem

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
