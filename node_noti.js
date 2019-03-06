var app = require('express')();

var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
//     res.send('<h1>Hello Node.js</h1>');
// });

// app.get('/index', function (req, res) {
  var request = require('request');
  const https = require('https');

  var message = JSON.stringify({
    to: '/topics/chats',
    priority: 'normal',
    notification: {
        title: 'Blood Pressure Monitoring', 
        body: 'วัดความดันกันรึยังคะ?' 
    }
  });

  const options = {
    host: 'fcm.googleapis.com',
    path: '/fcm/send',
    method: 'POST',
    headers: {
          'Authorization': 'key=AAAA0WNXUBo:APA91bHJFGKN_reXKzG60zLv2h67MfIYYKKj5X7V8-yeGjK4q9toQEtRcniQ0fKdYTjJEwxaaQWCrS3nqOiJRmgGuLU7v2KhIwY6o_31rFW0vzqemQjFu8yNiA6gHIZ1Q2dXV0iloNc3',
          'Content-Type': 'application/json'
    },
    body: message
  }

  const requ = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('message', (d) => {
      process.stdout.write(d)
    });
  });

  requ.on('error', (error) => {
    console.error(error)
  });

  requ.write(message);
  requ.end();
});

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});
