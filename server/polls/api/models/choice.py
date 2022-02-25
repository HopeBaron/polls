from django.db import models
from rest_framework import (
    serializers, viewsets, mixins, 
    response,
routers, decorators, pagination)

class Choice(models.Model):
    proposal = models.TextField()
    up_vote = models.IntegerField(default=0)
    down_vote = models.IntegerField(default=0)
def __str__(self):
    return self.proposal

class ChoiceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Choice
        fields = '__all__'
        
        




class ChoiceViewSet(viewsets.GenericViewSet,mixins.ListModelMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin):
    pagination_class = pagination.LimitOffsetPagination
    serializer_class = ChoiceSerializer
    queryset = Choice.objects.all()

    def up_vote(self, request, *args,**kwargs):
        instance = self.get_object()
        instance.up_vote += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return response.Response(serializer.data)

    def down_vote(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.down_vote += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return response.Response(serializer.data)


router = routers.DefaultRouter()
router.register(r'',ChoiceViewSet)
