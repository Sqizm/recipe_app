from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'Категория: {self.name} Описание: {self.description[:20]}'


class Recipe(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.ForeignKey(Category, related_name='recipes', on_delete=models.CASCADE)

    def __str__(self):
        return f'Название: {self.title} Описание: {self.description[:20]}'
