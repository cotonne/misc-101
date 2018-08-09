const fs = require('fs');
const http = require('http');
const express = require('express');
const os = require('os');
const hostname = os.hostname();
const app = express();

app.use(express.static('public'))

app.get('/', function (req, res, next) {
   res.cookie('SESSIONID', 'U2VuZCBtZSB5b3VyIGZlZWRiYWNrIQo=', { maxAge: 900000, httpOnly: true });
   next();
})

app.get('/', (req, res) => {
	const weak_param = req.query.weak_param || "no param";
        const template = `
<html>
	<head>
		<script src="http://${hostname}/test.js">
		</script>
		<script>console.log(document.cookie)</script>
	</head>
	<body>
		Hello World!
		${weak_param}
	</body>
</html>`;
	res.send(template);
	res.end()

});

var httpServer = http.createServer(app);
httpServer.listen(80);
