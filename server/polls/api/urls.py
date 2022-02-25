from django.urls import path, include
from .models.choice import ChoiceViewSet, router
up_vote = ChoiceViewSet.as_view({
    'post': 'up_vote'
})

down_vote = ChoiceViewSet.as_view({
    'post': 'down_vote'
})
urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>/upvote/', up_vote),
    path('<int:pk>/downvote/', down_vote)
]