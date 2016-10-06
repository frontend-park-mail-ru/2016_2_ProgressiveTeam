exports.post = {
    "tags": ["session"],
    "description": "Метод логина пользователя",
    "parameters": [{
        name: "login",
        description: "Логин пользователя",
        type: "string",
        required: true
    }, {
        name: "password",
        description: "Пароль пользователя",
        type: "string",
        required: true
    }],
    "responses": {
        200: {
            description: "Вход произведен"
        },
        400: {
            description: "Ошибка при выполнении запроса",
            schema: {
                $ref: "#/definitions/Error"
            }
        }
    }
};

exports.delete = {
    "tags": ["session"],
    "description": "Метод логаута пользователя",
    "responses": {
        200: {
            description: "Выход произведен"
        },
        400: {
            description: "Ошибка при выполнении запроса",
            schema: {
                $ref: "#/definitions/Error"
            }
        }
    }
};
