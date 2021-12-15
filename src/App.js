
import { useState } from 'react';

import '@dracula/dracula-ui/styles/dracula-ui.css'

import Filter from "./components/Filter";
import Results from "./components/Results";
function App() {

  const [data, setData] = useState([]);
  const [faixa, setFaixa] = useState([]);

  return (
    <div className="container">
      <Filter setData={setData} setFaixa={setFaixa} />
      <Results data={data} faixa={faixa} />
    </div>
  );
}

export default App;
