module.exports = {
    swagger: "2.0",
    info: {
        version: "0.0.4",
        title: "Fantasy battle online API"
    },
    basePath: "/api",
    schemes: ["http"],
    host: "http://localhost:3000",

    paths: {
        '/user': require('./resources/user'),
        '/user/list': require('./resources/user_list'),
        '/session': require('./resources/session')
    },

    definitions: {
        User: require('./scheme/User'),
        UserList: require('./scheme/UserList'),
        Error: require('./scheme/Error')
    }

};
