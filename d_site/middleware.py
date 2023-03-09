from django.contrib.auth.models import AnonymousUser, update_last_login
from urllib.parse import unquote, urlparse, parse_qs
from telegram_data.models import CustomUser
from rest_framework import authentication
import hashlib
import hmac
import uuid
import ast


def validate(hash_str, init_data, token, c_str="WebAppData"):
    init_data = sorted([chunk.split("=")
                        for chunk in unquote(init_data).split("&")
                        if chunk[:len("hash=")] != "hash="],
                       key=lambda x: x[0])
    init_data = "\n".join([f"{rec[0]}={rec[1]}" for rec in init_data])

    secret_key = hmac.new(c_str.encode(), token.encode(),
                          hashlib.sha256).digest()
    data_check = hmac.new(secret_key, init_data.encode(),
                          hashlib.sha256)

    return data_check.hexdigest() == hash_str


class TelegramAuthentication(authentication.BaseAuthentication):

    def token_authenticate(self, token):
        # TODO Добавить авторизацию по токену)
        user = AnonymousUser()
        return user, None

    def authenticate(self, request):
        # TODO Проверить на доступ анонимного юзера
        token = request.META.get('Authorization', None)
        if token is not None:
            return self.token_authenticate(token)
        else:
            tg_hash = request.META.get('HTTP_HASH')
            init_data = request.META.get('HTTP_INITDATA', None)
            is_valid = validate(
                hash_str=tg_hash,
                init_data=init_data,
                token='',
            )
            if is_valid:
                parsed_url = urlparse(f'?{init_data}')
                user_dict = parse_qs(parsed_url.query)['user'][0].replace('true', 'True')
                user_id = str(ast.literal_eval(user_dict)['id'])
                user, created = CustomUser.objects.get_or_create(
                    telegram_id=user_id,
                    defaults={
                        'username': f'guest-{str(uuid.uuid4())[0:70]}'
                    }
                )
                update_last_login(None, user)
                return user, None

            user = AnonymousUser()
            return user, None

