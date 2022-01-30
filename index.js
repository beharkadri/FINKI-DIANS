/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('firebase/firestore');
const Firebase = require('firebase/app');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const firebaseConfig = {
  apiKey: 'AIzaSyCDzJKSbCe9lSqr6yR6-2dBjMyDkUfUs5k',
  authDomain: 'healthmap-9ae33.firebaseapp.com',
  projectId: 'healthmap-9ae33',
  storageBucket: 'healthmap-9ae33.appspot.com',
  messagingSenderId: '36012267854',
  appId: '1:36012267854:web:8edf9430aff7316822661f',
};

const firebase = Firebase.initializeApp(firebaseConfig);

app.get('/institutions', (req, res) => {
  firebase
    .firestore()
    .collection('institutions')
    .get()
    .then((snapshot) => {
      const allContent = snapshot.docs.map((contentObj) => ({
        ...contentObj.data(),
        docId: contentObj.id,
      }));
      res.send(allContent);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.post('/institutions', (req, res) => {
  const reqBody = req.body;

  firebase
    .firestore()
    .collection('institutions')
    .add(reqBody)
    .then(() => {
      console.log(`Institution ${reqBody.name} successfully added!`);
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });

  res.status(201);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on 4000');
});*/
// create an express app
const express = require("express")
const app = express()

// use the express-static middleware
app.use(express.static("public"))

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
