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
        400: {
            description: "Ошибка при выполнении запроса",
            schema: {
                $ref: "#/definitions/Error"
            }
        }
    }
};
