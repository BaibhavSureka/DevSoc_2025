from django.urls import path
from . import views

urlpatterns=[
    path("predict/",views.predict_crypto_price,name="predict"),
    path("optimize/",views.optimize_portfolio,name="optimize"),
]