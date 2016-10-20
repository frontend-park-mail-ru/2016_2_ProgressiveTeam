let express = require('express');
let parser = require('body-parser');
let app = express();
let technoDoc = require('techno-gendoc');

app.use('/', express.static('public', { maxAge: 1 }));
app.use('/chat', express.static('public', {maxAge: 1}));
app.use('/signup', express.static('public', {maxAge: 1}));
technoDoc.generate(require('./api'), 'public');

app.use(parser.json());
app.use('/libs', express.static('node_modules'));

app.get('/api/session', (req, res) => {
    res.send(technoDoc.mock(require('./api/scheme/Session')));
});

app.post('/api/session', (req, res) => {
    res.send(technoDoc.mock(require('./api/scheme/Session')));
});

app.get('/api/user', (req, res) => {
    res.send(technoDoc.mock(require('./api/scheme/User')));
});

app.post('/api/user', (req, res) => {
    res.send(technoDoc.mock(require('./api/scheme/Session')));
});

app.get('/api/messages', function(req, res) {
    res.send([
        technoDoc.mock(require('./api/scheme/Message')),
        technoDoc.mock(require('./api/scheme/Message')),
        technoDoc.mock(require('./api/scheme/Message'))
    ]);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`App started on port ${process.env.PORT || 3000}`);
});
