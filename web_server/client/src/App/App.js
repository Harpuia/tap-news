import React from 'react';
import logo from '../img/logo.png';
import './App.css';
import NewsPanel from '../NewsPanel/NewsPanel';

class App extends React.Component{
  render() {
    return(
        <div>
          <img className='logo' src={logo} alt='logo'/>
          <div className='container'>
              <NewsPanel />
          </div>
        </div>
    );
  }
}

export default App;
