from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return HttpResponse("Bienvenu dans mon générateur de QR Code !")
