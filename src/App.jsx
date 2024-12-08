import React, { useState } from 'react';
import './App.css';
import Quote from './Components/Quote';
import Time from './Components/Time';

function App() {
  const [backgroundClass, setBackgroundClass] = useState("");

  return (
    <div className={`App ${backgroundClass}`}>
      <Quote />
      <Time setBackgroundClass={setBackgroundClass} />
    </div>
  );
}

export default App;