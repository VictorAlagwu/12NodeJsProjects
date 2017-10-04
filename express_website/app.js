var express = require('express');
var path = require("path");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

var app = express();


app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'jade');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req,res){
	res.render('index',{title: 'Welcome Page'});
});

app.get('/about', function(req,res){
	res.render('about',{title: 'About Page'});
});

app.get('/contact', function(req,res){
	res.render('contact',{title: 'Contact Page'});
});

app.post('/contact/send', function(req,res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'yourmail@mail.com',
			pass: 'password'
		}
	});

	var mailOptions = {
		from:'Victor Alagwu <victoralagwu@gmail.com>',
		to: 'victoralagwu@gmail.com',
		subject: 'NodeJs Site',
		text: 'You have a submission with the following details....'+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
		html:'<p>You have a submission with the following details....</p><ul><li>Sender Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};
	transporter.sendMail(mailOptions,function(error,info){
		if (error) {
			console.log(error);
			res.redirect('/');
		}else{
			console.log('Messae Sent: '+ info.response);
			res.redirect('/');
		}
	});
});



app.listen(3000);

console.log('Server is running on port 3000....');