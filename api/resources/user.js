exports.post = {
    tags: ["user"],
    description: "Метод создания пользователя",

    parameters: [{
        name: "email",
        description: "Почта пользователя",
        type: "string",
        required: true
    }, {
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

    responses: {
        200: {
            description: "Пользователь создан",
        },
        403: {
            description: "Пользователь уже авторизирован"
        },
        400: {
            description: "Ошибка при выполнении запроса",
            schema: {
                $ref: "#/definitions/Error"
            }
        }
    }
};
exports.get = {
    tags: ["user"],
    description: "Метод получения информации о пользователе",

    parameters: [{
        name: "Login",
        description: "Логин пользователя",
        type: "string",
        in: "path",
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

exports.delete = {
    tags: ["user"],
    description: "Метод удаления пользователя",

    responses: {
        200: {
            description: "Удаление выполнено"
        },
        403: {
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
