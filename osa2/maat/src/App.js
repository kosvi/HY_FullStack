import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import Content from "./components/Content";

function App() {

  const [searchString, setSearchString] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const dataFromApi = await axios.get('https://restcountries.eu/rest/v2/all')
        if (dataFromApi.status === 200)
          setCountries(dataFromApi.data)
      } catch (error) {
        console.log(error, 'couldn\'t download data from api')
      }
    }
    fetchCountries()
  }, [])

  const updateSearchString = (event) => setSearchString(event.target.value)

  return (
    <div className="App">
      <Search value={searchString} action={updateSearchString} />
      <Content countries={countries} searchString={searchString} />
    </div>
  );
}

export default App;
