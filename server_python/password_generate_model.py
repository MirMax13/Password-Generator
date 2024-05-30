from mongoengine import Document, BooleanField, IntField, StringField

class PasswordGenerateModel(Document):
    include_latin_uppercase = BooleanField(default=False)
    include_latin_lowercase = BooleanField(default=False)
    include_cyrillic_uppercase = BooleanField(default=False)
    include_cyrillic_lowercase = BooleanField(default=False)
    include_numbers = BooleanField(default=False)
    include_symbols = BooleanField(default=False)
    length = IntField()
    letters = StringField()