var express = require('express');
var hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})



app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} ${req.method} ${req.url}`;

	fs.appendFile('log.txt', log + '\n', (err) => {
		if (err)
			console.log(err.message);
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintainance.hbs', {
// 		title: 'Maintainance',
// 		welcome: 'The site is under maintainance'
// 	});
// });

app.get('/projects',(req, res) => {
	res.render('projects.hbs', {
		title: 'Project',
		welcome: 'Portfolio page here'
	});
});


app.get('/mahima',(req, res) => {
	res.render('mahima.hbs', {
		title: 'mahima',
		welcome: 'Rish loves mahi!'
	});
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('home.hbs', {
		welcome: "Welcome to Mr. Suri's Website",
		title: "Home"
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		title: "About",
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errMssg: 'A bad request was made',
		errReason: 'You are an idiot'
	})
});

app.listen(port, () => {
	console.log(`The server is up on port ${port}`);
});