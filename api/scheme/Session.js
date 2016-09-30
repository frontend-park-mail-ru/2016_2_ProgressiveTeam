module.exports = {
    type: "object",
    description: "Сессия",

    properties: {
        id: {
            description: "Id авторизационной сессии",
            type: "string"
        }
    },

    required: ["id"]
};
