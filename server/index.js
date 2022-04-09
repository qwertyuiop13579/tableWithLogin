const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const { uuid } = require('uuidv4');


//CREATE EXPRESS APP
const app = express();
app.use(cors());
app.use(bodyParser.json());

// DECLARE JWT-secret
const JWT_Secret = 'your_secret_key';

var users = [
  { id: "1", name: "name1", email: '1', password: '1', status: 'lock', dateReg: '0', dateLog: '0' },
]

app.listen(5000, () => console.log('Server started on port 5000'));

app.get('/api/users', (req, res) => {
  res.status(200).send(users);
})

app.post('/api/signup', (req, res) => {

  if (req.body) {
    var user = req.body;
    console.log(user);
    user.id = uuid();
    user.status = 'lock';
    user.dateReg = new Date().toString();
    user.dateLog = null;
    users.push(user);

    res.status(200).send({
      user: user
    })
  } else {
    res.status(403).send({
      errorMessage: 'Please provide name, email and password!'
    });
  }

});


app.post('/api/authenticate', (req, res) => {

  if (req.body) {
    var user = req.body;

    let findUser = users.find(item => item.email === req.body.email && item.password === req.body.password);
    if (findUser) {
      if (findUser.status == 'block') {
        res.status(403).send({
          errorMessage: 'This user is blocked!'
        });
        return;
      }
      findUser.dateLog = new Date().toString();

      console.log('Good email and password!');
      var token = jwt.sign(user, JWT_Secret);
      res.status(200).send({
        signed_user: user,
        token: token,
      });
    } else {
      res.status(403).send({
        errorMessage: 'No such user. Authorisation required!'
      });
    }
  } else {
    res.status(403).send({
      errorMessage: 'Please provide email and password!'
    });
  }

});


