import { useState, useCallback } from 'react';
import Location from './Location';
import Category from './Category';
import SportsList from './SportsList';
import '../App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState('');

  const locationCallback = useCallback((newValue) => {
    setLocation(newValue);
  }, [setLocation]);

  function categoryCallback(value) {
    setCategory(value);
  }

  return (
    <div className="App">
      <div className="App-header">
        <Location locationCallback={locationCallback} />
        <Category categoryCallback={categoryCallback} />
        <SportsList
          category={category}
          location={location}
        />
      </div>
    </div>
  );
}

export default App;
