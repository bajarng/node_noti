var cron=require('node-cron');
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

// var message = {
//     to: '/topics/chats',
//     priority: 'normal',
//     notification: {
//         title: 'Blood Pressure Monitoring', 
//         body: 'test?' 
//     }
// }

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

cron.schedule("0,15 9,17 * * *", function() { 
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('message', (d) => {
        process.stdout.write(d)
      });
    });

    req.on('error', (error) => {
      console.error(error)
    });

    req.write(message);
    req.end();

});