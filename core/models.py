from django.db import models


class Article(models.Model):
    title = models.CharField('Title', max_length=50)
    content = models.TextField('Content')

    def __str__(self):
        return self.title