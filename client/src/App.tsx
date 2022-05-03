import React from 'react';

function App(): JSX.Element {

  const handleClick: React.MouseEventHandler = () => console.log('hmm')
  const div = <div onClick={handleClick}></div>

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
          Learn React
      </header>
    </div>
  );
}

export default App;
