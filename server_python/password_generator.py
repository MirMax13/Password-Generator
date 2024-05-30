import random

def generate_password(length,options):
    charset = ''
    password = ''
    if (options.letters):
        charset+=options.letters
    elif (options.include_latin_uppercase or options.include_latin_lowercase or options.include_cyrillic_uppercase or options.include_cyrillic_lowercase or options.include_numbers or options.include_symbols):
        if (options.include_latin_uppercase):
            charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if (options.include_latin_lowercase):
            charset += 'abcdefghijklmnopqrstuvwxyz'
        if (options.include_cyrillic_uppercase):
            charset += 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'
        if (options.include_cyrillic_lowercase):
            charset += 'абвгдежзийклмнопрстуфхцчшщъыьэюя'
        if (options.include_numbers):
            charset += '0123456789'
        if (options.include_symbols):
            charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    for _ in range(length):
        password += random.choice(charset)
    return password