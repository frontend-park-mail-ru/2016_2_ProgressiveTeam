module.exports = {
	"swagger": "2.0",
	"info": {
		"version": "0.0.3",
		"title": "Fantasy battle online API",
		"description": "Фэнтези батл онлайн - это не просто игра..."
	},
	"basePath": "/api",
	"schemes": ["http"],
   	"host": "http://localhost:3000",

	paths: {
		'/messages': require('./resources/messages'),
		'/session': require('./resources/session'),
		'/user': require('./resources/user'),
	},

	definitions: {
		Message: require('./scheme/Message'),
		Session: require('./scheme/Session'),
		User: require('./scheme/User'),
	}

}
