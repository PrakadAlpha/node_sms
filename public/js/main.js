const number = document.getElementById('number'),
      txtMsg = document.getElementById('msg'),
      button = document.getElementById('button'),
      res = document.getElementsByTagName('body');
  
      button.addEventListener('click', send, false);

      const socket = io();

      socket.on('smsData', function(data){
        
        console.log('Message sent to ' + data.number );
        
        res.innerHTML = '<h5>Message sent to ' + data.number + '</h5>';
      });

      function send(){
        const num = number.value.replace('/\D/g', '');
        const text = txtMsg.value;

        fetch('', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({num, text})
        }).then(data => console.log(data))
          .catch(err => console.error(err)); 

      } 