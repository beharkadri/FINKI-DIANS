import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useContent(url, target) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => setContent(response.data));
    //eslint-disable-next-line
  }, []);

  return { [target]: content };
}
