from mongoengine import Document, StringField

class User(Document):
    first_name = StringField(max_length=100, required=True)
    last_name = StringField(max_length=100, required=True)
    city = StringField(max_length=100, required=True)
    contact_number = StringField(max_length=15, required=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
