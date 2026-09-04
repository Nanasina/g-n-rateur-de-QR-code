from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import qrcode
import base64
from io import BytesIO

@api_view(['POST'])
def generation_qrcode(request):
    content = request.data.get('content')

    if not content:
        return Response({'error': 'Le contenu est onligatoire.'}, status=400)

    qr = qrcode.make(content)
    buffer = BytesIO()
    qr.save(buffer, format='PNG')

    qr_base64 = base64.b64encode(buffer.getvalue()).decode()

    return Response({
        'message': 'QR Code généré avec succès',
        'qr_code': f'data:image/png;base64,{qr_base64}'
    })
