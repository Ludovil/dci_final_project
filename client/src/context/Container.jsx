import { MyContext } from './context.js';
import { useState } from 'react';

export default function Container({ children }) {
  const [position, setPosition] = useState(null);

  return (
    <MyContext.Provider
      value={{
        position,
        setPosition,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
