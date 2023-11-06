# from django.http import JsonResponse
# from .models import Item
# from .serializers import ItemSerializer, OrderDetailsSerializer, OrderSerializer
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status

# @api_view(['GET', 'POST'])
# def item_list(request, format=None):
#     if request.method == 'GET':
#         items = Item.objects.all()
#         serializer = ItemSerializer(items, many=True)
#         return Response(serializer.data)
#     if request.method == 'POST':
#         serializer = ItemSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
        
# @api_view(['GET', 'PUT', 'DELETE'])
# def item_detail(request, id, format=None):

#     try:
#         item = Item.objects.get(pk=id)
#     except Item.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = ItemSerializer(item)
#         return Response(serializer.data)
#     elif request.method == 'PUT':
#         serializer = ItemSerializer(item, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == 'DELETE':
#         item.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# @api_view(['POST'])
# def create_order_details(request, format=None):
#     if request.method == 'POST':
#         serializer = OrderDetailsSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# def create_order(request):
#     if request.method == 'POST':
#         serializer = OrderSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



from rest_framework import status
from rest_framework.response import Response
from .models import Item, Order, OrderItem
from .serializers import ItemSerializer, OrderSerializer
from rest_framework.generics import ListCreateAPIView
from rest_framework.decorators import api_view

class ItemListCreateView(ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class OrderListCreateView(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        order_data = request.data
        items_data = order_data.pop('items', [])

        serializer = self.get_serializer(data=order_data)
        if serializer.is_valid():
            order = serializer.save()

            for item_data in items_data:
                item_id = item_data['item_id']
                quantity = item_data['quantity']
                try:
                    item = Item.objects.get(id=item_id)
                    OrderItem.objects.create(order=order, item=item, quantity=quantity)
                except Item.DoesNotExist:
                    return Response(f"Item with ID {item_id} does not exist.", status=status.HTTP_BAD_REQUEST)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'POST'])
def item_list(request, format=None):
    if request.method == 'GET':
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def item_detail(request, id, format=None):

    try:
        item = Item.objects.get(pk=id)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ItemSerializer(item)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)