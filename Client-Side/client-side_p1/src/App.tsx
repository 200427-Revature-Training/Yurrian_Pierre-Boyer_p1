import React from 'react';
import './App.css';
import NavbarComponent from './components/navbar.component';
import { ReimbursementsComponent } from './components/reimbursements.component';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomeComponent } from './components/home.component';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavbarComponent />
        <main>
          <Switch>
            <Route path="/home">
              <HomeComponent />
            </Route>
            <Route path="/reimbursements">
              <ReimbursementsComponent />
            </Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;