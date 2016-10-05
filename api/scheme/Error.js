module.exports = {
    type: "object",
    description: "Ошибка",

    properties: {
        error: {
            description: "Описание ошибки",
            type: "string",
            minLength: 1,
            maxLength: 50
        },
    },

    required: ["error"]
};
