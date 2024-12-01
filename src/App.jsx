import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import ActivityFeed from './components/ActivityFeed/ActivityFeed.jsx'
import Header from './Header.jsx';

const App = () => {
  const [callsView, setCallsView] = useState(true);
  return (
    <div id='app' className='container'>
      <Header setCallsView={setCallsView} callsView={callsView}/>
      <ActivityFeed callsView={callsView} setCallsView={setCallsView}/>

    </div>
  );
};


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

export default App;
