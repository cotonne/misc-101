const fs = require('fs');
const http = require('http');
const express = require('express');
const os = require('os');
const hostname = os.hostname();
const app = express();

const session = require('cookie-session')
var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
	  name: 'toto',
	  keys: ['key1', 'key2'],
	  cookie: {
		      secure: false,
		      httpOnly: false,
		      path: 'foo/bar',
		      expires: expiryDate
		    }
}));

app.use(express.static('public'))

app.use((req, res, next) => {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
});



app.get('/', function (req, res, next) {
   req.session.views = (req.session.views || 0) + 1
   next();
})

app.get('/', (req, res) => {
	const weak_param = req.query.weak_param || "no param";
        const template = `
<html>
	<head>
		<script src="http://${hostname}/test.js">
		</script>
	</head>
	<body>
		Hello World!
		${weak_param}
	</body>
</html>`;
	res.send(template);
	res.end(req.session.views + ' views')

});

var httpServer = http.createServer(app);
httpServer.listen(80);
