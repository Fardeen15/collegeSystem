import React from 'react';
import './App.css';
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SignIn from './component/signIn';
import Signup from './component/signUp';
import Navbar from './component/navbar';
class App extends React.Component {

  render() {
    console.log(true)
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={() => <SignIn />} />
          <Route path="/signUp" component={Signup} />
          <Route path="/darwer" component={() => <Navbar />} />

          }

        </Router>

      </div>
    );
  }

}

export default App;
