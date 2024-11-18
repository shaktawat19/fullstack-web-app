import json
from django.core.management.base import BaseCommand
from user_data.models import User  # Assuming your model is named User

class Command(BaseCommand):
    help = 'Load data from data.json into MongoDB'

    def handle(self, *args, **kwargs):
        # Path to the data.json file
        file_path = file_path = "C:/Users/admin/Desktop/fullstack-app/server/user_data/data.json" 

        # Load the JSON data from the file
        with open(file_path, 'r') as file:
            data = json.load(file)

        # Migrate data to MongoDB
        for user_data in data:
            User.objects.create(
                first_name=user_data['first_name'],
                last_name=user_data['last_name'],
                city=user_data['city'],
                contact_number=user_data['contact_number']
            )

        self.stdout.write(self.style.SUCCESS('Successfully migrated data to MongoDB'))
