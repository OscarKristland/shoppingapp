from django.db import models

# class Item(models.Model):
#     # id skapas automatiskt
#     name = models.CharField(max_length=50)
#     description = models.CharField(max_length=200)
#     price =  models.IntegerField()

#     def __str__(self):
#         return self.name

# class Order(models.Model):
#     name = models.CharField(max_length=50)
#     city = models.CharField(max_length=50)
#     adress = models.CharField(max_length=50)
#     phonenumber = models.CharField(max_length=50)

#     def __str__(self):
#         return f'Order for {self.name}'
    
# class OrderDetails(models.Model):
#     order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_details")
#     item = models.ForeignKey(Item, on_delete=models.CASCADE)
#     quantity = models.PositiveSmallIntegerField()
# ##separera models#####

from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

class Order(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=200, default="Unknown")
    phonenumber = models.CharField(max_length=20)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
