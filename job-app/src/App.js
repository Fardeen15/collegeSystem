import React from 'react';
import './App.css';
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Route, withRouter} from 'react-router-dom'
import SignIn from './component/signIn';
import Signup from './component/signUp';
import Navbar from './component/navbar';
import {auth,db} from './firabaseConfig'
import {message} from 'antd'
class App extends React.Component {
  render() {

    return (
      <div className="App">
        <Router>
              <Route path="/" exact component={() => <SignIn/>} />
              <Route path="/signUp" component={Signup} />
              <Route path="/darwer" component={() => <Navbar
                navcheck={this.navcheck}
                // category={this.state.user}
              />} />
            
          }

        </Router>

      </div>
    );
  }

}

export default App;
