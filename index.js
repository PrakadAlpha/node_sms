const express = require('express');
const bodyParser = require('body-parser');
const Nexmo = require('nexmo');
const socketio = require('socket.io');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const nexmo = new Nexmo({
  apiKey: '7bdbc531',
  apiSecret: '6cMHeJoPVTYPkvxh',
}, {debug: true});


const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {

  const from = 'Nexmo';
  const to = req.body.num;
  const text = req.body.text;

  nexmo.message.sendSms(from, to, text, {type: 'unicode'}, (err, resData) => {
    if(err){
      console.log(err);      
    }else{
      console.log(resData);
      const data = {
        id: resData.messages[0]['message-id'],
        number: resData.messages[0]['to']
      }
      io.emit('smsData', data);
    }
  });
});

const server = app.listen(port, () => console.log(`listening on http://localhost:${port}`));


const io = socketio(server);

io.on('connection', (socket) => {
  console.log('Connected..');
  
  io.on('disconnect', () => {
    console.log('Disconnected..');
  })
})
