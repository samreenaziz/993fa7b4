import React from 'react';
import ReactDOM from 'react-dom/client';
import {CallListItem} from './components/CallListItem/CallListItem.jsx'

import Header from './Header.jsx';

const App = () => {
  return (
    <div id='app' className='container'>
      <Header/>
      <CallListItem/>
      {/* <div className="container-view">Some activities should be here</div> */}

    </div>
  );
};


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

export default App;
