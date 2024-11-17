from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

import json
import os

def get_user_data(request):
    # Path to the JSON data file
    file_path = os.path.join(os.path.dirname(__file__), 'data.json')
    with open(file_path, 'r') as file:
        data = json.load(file)
    
    # Retrieve query from request parameters (if any)
    query = request.GET.get('q', '').lower()
    
    # Filter the data based on the query
    if query:
        filtered_data = [item for item in data if query in item['first_name'].lower() or query in item['last_name'].lower()]
        return JsonResponse(filtered_data, safe=False)
    
    # Return all data if no query is provided
    return JsonResponse(data, safe=False)
