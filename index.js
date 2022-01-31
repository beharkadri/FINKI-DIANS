const express = require('express');
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
      res.status(200).send(allContent);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.post('/institutions', (req, res) => {
  const reqBody = req.body;
  let status = 201;
  firebase
    .firestore()
    .collection('institutions')
    .add(reqBody)
    .then(() => {
      console.log(`Institution ${reqBody.name} successfully added!`);
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      status = 400;
    });

  res.status(status).send();
});

app.put('/institutions/:id', (req, res) => {
  const reqBody = req.body;
  let status = 204;
  firebase
    .firestore()
    .collection('institutions')
    .doc(req.params.id)
    .set(reqBody)
    .then(() => {
      console.log(`Institution ${reqBody.name} successfully edited!`);
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      status = 400;
    });
  res.status(status).send();
});

app.delete('/institutions/:id', (req, res) => {
  let status = 204;
  firebase
    .firestore()
    .collection('institutions')
    .doc(req.params.id)
    .delete()
    .then(() => {
      console.log(`Institution ${req.params.id} successfully deleted!`);
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      status = 400;
    });
  res.status(status).send();
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});

