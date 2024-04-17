const express = require('express');
const app = express();
app.use(express.static('./dist/rent-and-play'));
app.get('/*', function(req, res) {
        res.sendFile('index.html', {root: 'dist/rent-and-play/'}
        );
    });
app.listen(process.env.PORT || 8080);