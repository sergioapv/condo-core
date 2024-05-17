from django.shortcuts import render

# Create your views here.
def condos(request):
    return render(request, 'condos.html')
