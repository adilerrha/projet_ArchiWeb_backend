let express = require('express');
let app = express();
let path = require('path');
const cors = require('cors')

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));


const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

//Base de donnée
require('./configuration/database.config.js');

//Router
require('./route/user.route.js')(app);

// Créer le serveur
const PORT = 3000;
var server = app.listen(PORT, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("L'application est sur http://%s:%s", host, port)
})