import { useEffect, useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import './styles.css';

function App() {
  const [listImg, setListImg] = useState([]);
  const [status, setStatus] = useState('');
  const [modal, setModal] = useState('');
  const [page, setPage] = useState(2);
  const [inputValue, setinputValue] = useState();

  const fetchKey = 'key=32947262-816ad506c9db86c30ae5e3e11';

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        setModal('');
        setStatus('showImg');
      }
    });
  }, []);

  const onSubmitSearch = value => {
    setStatus('loader');
    setinputValue(value);
    setPage(2);
    fetch(
      `https://pixabay.com/api/?q=${value}&page=${1}&${fetchKey}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(data => {
        if (data.total <= 12) {
          setListImg(data.hits);
          setStatus('lastPage');
        }
        if (data.total > 12) {
          setListImg(data.hits);
          setStatus('showImg');
        }
      });
  };
  const showModalImg = url => {
    setModal(url);
    setStatus('modal');
  };

  const onCloseOverlay = event => {
    if (event.target === event.currentTarget) {
      setModal('');
      setStatus('showImg');
    }
  };
  const onNextPage = () => {
    fetch(
      `https://pixabay.com/api/?q=${inputValue}&page=${page}&${fetchKey}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(data => {
        if (data.total <= 12) {
          setListImg(prevState => {
            return [...prevState, ...data.hits];
          });
          setPage('lastPage');
        }
        if (data.total > 12) {
          console.log(data.hits);
          setListImg(prevState => {
            return [...prevState, ...data.hits];
          });
          setStatus('showImg');
          setPage(prevState => prevState + 1);
        }
      });
  };
  return (
    <div className="App">
      <SearchBar onSubmitSearch={onSubmitSearch} />
      {status === 'loader' && <Loader />}
      {status === 'showImg' || status === 'lastPage' || status === 'modal' ? (
        <ImageGallery
          listImg={listImg}
          showModalImg={showModalImg}
          status={status}
          onClickNextPage={onNextPage}
        />
      ) : (
        ''
      )}
      {status === 'modal' && (
        <Modal url={modal} closeOverlay={onCloseOverlay} />
      )}
    </div>
  );
}

export default App;
