exports.put = {
    tags: ["user", "user_detail", "password"],
    description: "Метод смены пароля пользователя",

    parameters: [{
        name: "password",
        description: "Старый пароль",
        type: "string",
        required: true
    }, {
        name: "new_password",
        description: "Новый пароль",
        type: "string",
        required: true
    }],

    responses: {
        200: {
            description: "Пароль обновлен",
        },
        403: {
            description: "Неправильный пароль"
        },
        401: {
            description: "Пользователь не авторизирован"
        },
        400: {
            description: "Ошибка при выполнении запроса",
            schema: {
                $ref: "#/definitions/Error"
            }
        }
    }
};
