import { useEffect, useState } from 'react'
import '../App.css';

function Location({ locationCallback }) {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [location, setLocation] = useState('');
  const [locationCity, setLocationCity] = useState('');

  async function guessLocation(loc) {
    console.log('guessing location');
    const cityResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?` +
      `result_type=political&key=AIzaSyCvmWpSSpwQL7GRktBKzSfZZ55OPUUc0ik&latlng=${loc.coords.latitude},${loc.coords.longitude}`
    )
      .then((res) => res.json())
      .catch(err => console.log(err));

    setLocationCity(cityResponse?.results[0]?.formatted_address);
    setLocationEnabled(true);
  }

  useEffect(() => {

    function locationFound(res) {
      console.log(res);
      setLocation(`${res.coords.latitude} ${res.coords.longitude}`);
      locationCallback(res);
      guessLocation(res);
    }

    function locationDenied(err) {
      console.log(err);
      if (err.code === 1) {
        // hardcode Berlin location when actual location is not available
        const berLocation = {
          coords: {
            latitude: 52.5200,
            longitude: 13.4050,
          }
        };
        setLocation(`${berLocation.coords.latitude} ${berLocation.coords.longitude}`);
        locationCallback(berLocation);
        guessLocation(berLocation);
      } else {
        setLocationEnabled(false);
      }
    }

    navigator.geolocation?.getCurrentPosition(locationFound, locationDenied);
  }, [locationCallback]);

  return (
    <div style={{ height: '6rem' }}>
      {locationEnabled ? <p>
        Searching for sports around
        <br />
        <span
          style={{ color: 'steelblue' }}
        >
          {locationCity || location}
        </span>
      </p> : <p>
        Please enable geolocation
      </p>}
    </div>
  );
}

export default Location;
