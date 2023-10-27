from django.db import models

class Item(models.Model):
    # id skapas automatiskt
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    price =  models.IntegerField()

    def __str__(self):
        return self.name

class Order(models.Model):
    name = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    adress = models.CharField(max_length=50)
    phonenumber = models.CharField(max_length=50)

    def __str__(self):
        return f'Order for {self.name}'
    
class OrderDetails(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField()
