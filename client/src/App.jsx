import { useState } from 'react';
import './App.css';
import Maps from './components/Maps.jsx';
import SearchBox2 from './components/SearchBox.jsx';

function App() {
  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100vw',
          height: '100vh',
        }}
      >
        <div
          style={{
            width: '50vw',
            height: '100vh ',
          }}
        >
          <Maps selectPosition={selectPosition} />
        </div>
        <div
          style={{
            width: '50vw',
          }}
        >
          <SearchBox2
            selectPosition={selectPosition}
            setSelectPosition={setSelectPosition}
          />
        </div>
      </div>
    </>
  );
}

export default App;
