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

app.get('/reviews/:id', (req, res) => {
  firebase
    .firestore()
    .collection('reviews')
    .where('institutionId', '==', req.params.id)
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

app.post('/reviews', (req, res) => {
  const reqBody = req.body;
  let status = 201;
  firebase
    .firestore()
    .collection('reviews')
    .add(reqBody)
    .then(() => {
      console.log(
        `Review for institution  ${reqBody.institutionId} successfully added!`
      );
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
      status = 400;
    });

  res.status(status).send();
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});
