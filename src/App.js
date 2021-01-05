import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const pageNumRef = useRef(1);
  let dataLoading = false;

  useEffect(() => {
  }, []);

  const loadFunc = async () => {
    console.log('~~~~~~~~~~~~~~~~~~', pageNumRef.current)
    if (dataLoading) {
      return;
    }
    dataLoading = true;
    try {
      const res = await axios.get(`http://api.unsplash.com/photos?page=${pageNumRef.current}&client_id=6c446b49b72a4c559d9b9d67183d5c1de1981d16f309063c3b994086e6ce1a26`);
      pageNumRef.current++;
      setData([...data, ...res.data]);
      dataLoading = false;
    } catch (err) {
      console.log(err);
      dataLoading = false;
    }
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadFunc}
      hasMore={true}
      loader={<div className="loader" key={0}>Loading ...</div>}
    >
      {data.map(item => <div key={item.id}>
        <img src={item.urls.small} alt={item.alt_description} />
        <div>{item.alt_description}</div>
      </div>)}
    </InfiniteScroll>
  );
}

export default App;
