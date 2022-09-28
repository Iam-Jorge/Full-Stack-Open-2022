import { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';
import CountryData from './components/CountryData';

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
    setCountriesToShow(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }

  return (
    <div>
      <div>
        Find countries <input value={filter} onChange={handleChange} />
      </div>
      {countriesToShow.length === 1 ? (
        <CountryData country={countriesToShow[0]} />
      ) : null}
      {countriesToShow.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <Countries
          countriesToShow={countriesToShow}
          setCountriesToShow={setCountriesToShow}
        />
      )}
    </div>
  );
};

export default App;
