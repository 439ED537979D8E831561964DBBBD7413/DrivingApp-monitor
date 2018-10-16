
var express = require("express");
var bodyParser 	= require('body-parser');
var morgan 		= require('morgan');
var cors 		= require('cors');
var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/', express.static(__dirname + '/build'));

const port = process.env.PORT || 3002;
app.listen(port, function(){
	console.log(" Servidor del api rest escuchando en http://localhost:" + port);
});