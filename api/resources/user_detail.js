
exports.get = {
    tags: ["user", "user_detail"],
    description: "Метод получения информации о пользователе",

    parameters: [{
        name: "login",
        description: "Логин пользователя",
        type: "string",
        in: "slug",
        required: true
    }],

    responses: {
        200: {
            description: "Информация о пользователе",
            schema: {
                $ref: "#/definitions/User"
            }
        },
        400: {
            description: "Ошибка при выполнении запроса",
            schema: {
                $ref: "#/definitions/Error"
            }
        }
    }
};

exports.put = {
    tags: ["user", "user_detail"],
    description: "Метод обновления данных пользователя",

    parameters: [{
        name: "email",
        description: "Почта пользователя",
        type: "string",
        required: false
    }, {
        name: "login",
        description: "Логин пользователя",
        type: "string",
        required: false
    }, {
        name: "avatar",
        description: "Аватарка пользователя",
        type: "file",
        required: false
    }],

    responses: {
        200: {
            description: "Пользователь обновлен",
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
