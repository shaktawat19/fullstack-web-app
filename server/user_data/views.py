from django.http import JsonResponse
from mongoengine import Q
from user_data.models import User

def get_user_data(request):
    query = request.GET.get('q', '')
    if query:
        filtered_data = User.objects.filter(
            Q(first_name__icontains=query) | 
            Q(last_name__icontains=query) |
            Q(city__icontains=query) |
            Q(contact_number__icontains=query)
        )
    else:
        filtered_data = User.objects.all()
    
    # Manually create a list of dictionaries with desired fields
    user_data = []
    for user in filtered_data:
        user_data.append({
            'id': str(user.id),  # Convert ObjectId to string
            'first_name': user.first_name,
            'last_name': user.last_name,
            'city': user.city,
            'contact_number': user.contact_number,
        })
    
    # Return filtered data as JSON response
    return JsonResponse({'data': user_data})
