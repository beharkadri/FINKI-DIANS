const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('firebase/firestore');
require('firebase/auth');
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

app.post('/auth', (req, res) => {
  const reqBody = req.body;
  if (!reqBody.isLogin) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(reqBody.email, reqBody.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        res.status(200).send(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.status(201).send({ errorCode, errorMessage });
      });
  } else {
    firebase
      .auth()
      .signInWithEmailAndPassword(reqBody.email, reqBody.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        res.status(200).send(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.status(201).send({ errorCode, errorMessage });
      });
  }
});

//Fetch admin login info

app.get('/admin', (req, res) => {
  firebase
    .firestore()
    .collection('admin')
    .get()
    .then((snapshot) => {
      const allContent = snapshot.docs.map((contentObj) => ({
        ...contentObj.data(),
        docId: contentObj.id,
      }));

      res.status(200).send(allContent);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

//Fetch all feedback

app.get('/feedback', (req, res) => {
  firebase
    .firestore()
    .collection('feedback')
    .get()
    .then((snapshot) => {
      const allContent = snapshot.docs.map((contentObj) => ({
        ...contentObj.data(),
        docId: contentObj.id,
      }));

      res.status(200).send(allContent);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

//Add feedback

app.post('/feedback', (req, res) => {
  const reqBody = req.body;
  let status = 201;
  firebase
    .firestore()
    .collection('feedback')
    .add(reqBody)
    .then(() => {
      console.log(`Feedback successfully added!`);
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      status = 400;
    });

  res.status(status).send();
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});
