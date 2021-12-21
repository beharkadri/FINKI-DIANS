import { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../context/firebase';

export default function useReviews(institutionId) {
  const [content, setContent] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    firebase
      .firestore()
      .collection('reviews')
      .where('institutionId', '==', institutionId)
      .get()
      .then((snapshot) => {
        const allContent = snapshot.docs.map((contentObj) => ({
          ...contentObj.data(),
          docId: contentObj.id,
        }));

        setContent(allContent);
      })
      .catch((error) => {
        console.log(error.message);
      });
    //eslint-disable-next-line
  }, []);

  return { reviews: content };
}
