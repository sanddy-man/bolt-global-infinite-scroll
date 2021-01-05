import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import PullToRefresh from 'react-simple-pull-to-refresh';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const pageNumRef = useRef(1);
  const dataLoading = useRef(false);

  useEffect(() => {
  }, []);

  const loadFunc = async () => {
    if (dataLoading.current) {
      return;
    }
    dataLoading.current = true;
    try {
      const res = await axios.get(`http://api.unsplash.com/photos?page=${pageNumRef.current}&client_id=6c446b49b72a4c559d9b9d67183d5c1de1981d16f309063c3b994086e6ce1a26`);
      pageNumRef.current++;
      setData([...data, ...res.data]);
      dataLoading.current = false;
    } catch (err) {
      console.log(err);
      dataLoading.current = false;
    }
  }

  const handleRefresh = async (resolve, reject) => {
    pageNumRef.current = 1;
    if (dataLoading.current) {
      return;
    }
    dataLoading.current = true;
    try {
      const res = await axios.get(`http://api.unsplash.com/photos?page=${pageNumRef.current}&client_id=6c446b49b72a4c559d9b9d67183d5c1de1981d16f309063c3b994086e6ce1a26`);
      pageNumRef.current++;
      setData([...res.data]);
      dataLoading.current = false;
      resolve();
    } catch (err) {
      dataLoading.current = false;
      reject(err);
    }
  }

  return (
    <PullToRefresh onRefresh={handleRefresh} canFetchMore={false}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={true}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {data.map(item => <div key={item.id} className="align-center">
          <div className="demo-card-square mdl-card mdl-shadow--2dp margin-top">
            <img className="mdl-card__title mdl-card--expand" src={item.urls.small} alt={item.alt_description} />
            <div className="mdl-card__supporting-text">
              {item.alt_description}
            </div>
          </div>
        </div>)}
      </InfiniteScroll>
    </PullToRefresh>
  );
}

export default App;
