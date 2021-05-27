import './App.css';
import NumberInput from './components/NumberInput';
import SubmitCard from './components/SubmitCard';
import { useState } from 'react';
import GeneratePoems from './GeneratePoems';

function App() {

  const [fileQuantity, setFileQuantity] = useState(0);
  const [lineQuantity, setLineQuantity] = useState(0);

  const handleFileQuantityChange = (e) => {
    setFileQuantity(e.target.value);
  };

  const handleLineQuantityChange = (e) => {
    setLineQuantity(e.target.value);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    GeneratePoems(fileQuantity, lineQuantity);
  };

  return (
    <div className="App">
      <div className="canvas-check">
        <p>Please rotate your screen or use a wider device.</p>
      </div>
      <form onSubmit={handleSubmit} className="row-container">
        <NumberInput
          id="file-quantity"
          label="How many poems?"
          value={fileQuantity}
          onChange={handleFileQuantityChange} />
        <NumberInput
          id="line-quantity"
          label="How many lines in each?"
          value={lineQuantity}
          onChange={handleLineQuantityChange} />
        <SubmitCard label="Generate"/>
      </form>
    </div>
  );
}

export default App;
