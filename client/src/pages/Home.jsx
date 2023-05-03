import { useState, useContext } from 'react';
import SearchBox from '../components/SearchBox.jsx';
import { MyContext } from '../context/context.js';

function Home() {
  const [selectPosition, setSelectPosition] = useState(null);
  const { positionContext, setPositionContext } = useContext(MyContext);
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
            margin: '0 auto',
          }}
        >
          <SearchBox />
        </div>
      </div>
    </>
  );
}
export default Home;
