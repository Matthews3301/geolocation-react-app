import { useEffect, useState } from 'react'
import '../App.css';

function SportsList({ location, category }) {
  const [loading, setLoading] = useState(true);
  const [sportsList, setSportsList] = useState([]);

  const showNoSportsFoundWarning =
    !loading
    && location
    && category
    && sportsList.length === 0

  useEffect(() => {
    async function getSportsList(location, category) {
      console.log('fetching sports list');
      setLoading(true);
      const listResponse = await fetch(
        `https://sports.api.decathlon.com/sports/search/${category}?` +
        `has_icon=true&strict=true&coordinates=${location.coords.longitude},${location.coords.latitude}`
      )
        .then((res) => res.json())
        .catch(err => console.log(err));

        setSportsList(listResponse.map(sport => ({
          name: sport.attributes.name,
          icon: sport.attributes.icon
        })));
        setLoading(false);
    }

    if (location && category) getSportsList(location, category);
  }, [location, category]);

  return (
    <div style={{ marginTop: '2rem', minHeight: '12rem' }}>
      {sportsList.map(sport => (
        <div
          key={sport.name}
          className="center-start"
        >
          <img
            src={sport.icon}
            alt={sport.name}
            style={{ width: '2rem' }}
          />
          <span>{sport.name}</span>
        </div>
      ))}
      { showNoSportsFoundWarning && <small>- No sports found -</small>}
    </div>
  );
}

export default SportsList;
