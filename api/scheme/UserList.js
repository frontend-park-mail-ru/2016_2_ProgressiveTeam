module.exports = {
    type: "object",
    description: "Список пользователей",

    properties: {
        userList: {
            description: "Список",
            type: "array",
            items: {
                $ref: "#/definitions/User"
            }
        },
    },

    required: ["userList"]
};
