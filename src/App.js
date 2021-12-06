import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import Map from './pages/Map';
import HowToSearch from './pages/HowToSearch';
import FeedBack from './pages/Feedback';
import Team from './pages/Team';
import firebase from 'firebase/app';
import 'firebase/firestore';

import './App.css';
//import healthcareObjectsData from './Data/healthcare_objects_filtered.json';

const firebaseConfig = {
  apiKey: 'AIzaSyCDzJKSbCe9lSqr6yR6-2dBjMyDkUfUs5k',
  authDomain: 'healthmap-9ae33.firebaseapp.com',
  projectId: 'healthmap-9ae33',
  storageBucket: 'healthmap-9ae33.appspot.com',
  messagingSenderId: '36012267854',
  appId: '1:36012267854:web:8edf9430aff7316822661f',
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

//Populating database with data - temporary solution for proof of concept. DON'T delete or uncomment!

/*healthcareObjectsData.forEach(function (obj) {
  db.collection('institutions')
    .add({
      id: obj.id,
      longitude: obj.longitude,
      latitude: obj.latitude,
      amenity: obj.amenity,
      name: obj.name,
      city: obj.city,
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
});*/

function App() {
  const [institutions, setInstitutions] = useState([]);

  //Fetching data from database, temporary solution for proof of concept!

  useEffect(() => {
    db.collection('institutions')
      .get()
      .then((snapshot) => {
        const allContent = snapshot.docs.map((contentObj) => ({
          ...contentObj.data(),
        }));

        setInstitutions(allContent);
      })
      .catch((error) => {
        console.log(error.message);
      });
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>

        <Route path='/map' exact>
          <Map institutions={institutions} />
        </Route>

        <Route path='/how-to-search' exact>
          <HowToSearch />
        </Route>

        <Route path='/feedback' exact>
          <FeedBack />
        </Route>

        <Route path='/team' exact>
          <Team />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
