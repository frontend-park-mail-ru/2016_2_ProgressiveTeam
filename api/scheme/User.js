module.exports = {
    type: "object",
    description: "Данные пользователя",

    properties: {
        login: {
            description: "Логин",
            type: "string",
            minLength: 1,
            maxLength: 50
        },
        email: {
            description: "Email",
            type: "string",
            minLength: 6,
            maxLength: 50
        },
        avatar: {
            description: 'Avatar',
            type: "string"
        }
    },

    required: ["email", "login"]
};
