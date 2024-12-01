import React from 'react';
import ReactDOM from 'react-dom/client';
import ActivityFeed from './components/ActivityFeed/ActivityFeed.jsx'

import Header from './Header.jsx';

const App = () => {
  return (
    <div id='app' className='container'>
      <Header/>
      <ActivityFeed/>
      {/* <div className="container-view">Some activities should be here</div> */}

    </div>
  );
};


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

export default App;
