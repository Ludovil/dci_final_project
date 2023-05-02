import { useState } from 'react';
import Maps from '../components/Maps.jsx';
import SearchBox from '../components/SearchBox.jsx';
function Home() {
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
        {/* <div
          style={{
            width: '50vw',
            height: '100vh ',
          }}
        >
          <Maps selectPosition={selectPosition} />
        </div> */}
        <div
          style={{
            width: '50vw',
            margin: '0 auto',
          }}
        >
          <SearchBox
            selectPosition={selectPosition}
            setSelectPosition={setSelectPosition}
          />
        </div>
      </div>
    </>
  );
}
export default Home;
