const ERROR_CODES = {
  EMAIL_NOT_FOUND: 'Пользователь с таким email не был найден',
  INVALID_PASSWORD: 'Пароль не верный',
  auth: 'Пожалуйста войдите в систему',
}

export function errorHandler(code) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка';
}
