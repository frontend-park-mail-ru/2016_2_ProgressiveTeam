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
        401: {
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
    description: "Метод получения списка пользователей",

    parameters: [{
        name: "order",
        description: "Порядок сортировки",
        type: "string",
        in: "path",
        enum: ['ask', 'desk'],
        required: false
    },{
        name: "offset",
        description: "Смещение",
        type: "integer",
        in: "path",
        required: false
    }],

    responses: {
        200: {
            description: "Список пользователей",
            schema: {
                $ref: "#/definitions/UserList"
            }
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


exports.delete = {
    tags: ["user"],
    description: "Метод удаления пользователя",

    responses: {
        200: {
            description: "Удаление выполнено"
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
