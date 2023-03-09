from django.shortcuts import render


def main(request):
    return render(request, "front/main.html")
