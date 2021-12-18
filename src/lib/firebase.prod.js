import Firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCDzJKSbCe9lSqr6yR6-2dBjMyDkUfUs5k',
  authDomain: 'healthmap-9ae33.firebaseapp.com',
  projectId: 'healthmap-9ae33',
  storageBucket: 'healthmap-9ae33.appspot.com',
  messagingSenderId: '36012267854',
  appId: '1:36012267854:web:8edf9430aff7316822661f',
};

const firebase = Firebase.initializeApp(firebaseConfig);

export { firebase };
