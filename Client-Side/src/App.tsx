import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import NavbarComponent from './components/navbar/navbar.component';
import { ReimbursementsComponent } from '../src/components/reiembursement/reimbursements.component';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/login/login.component';
import { Dashboard } from './components/dashboard/dashboard.component';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const setAuth = (boolean: any) => {
    setIsAuthenticated(boolean);
  }; 

  async function isAuth() {
    try {
      const response = await fetch('http://localhost:5000/login/verified', {
        method: 'GET',
        headers: { token: localStorage.token }
      });


      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth()
  }, []);

  //Authentication not working; Not authorized but can still get in
  return ( 
  <Fragment>
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route exact path='/login' 
              render={props => 
                    !isAuthenticated ? (
                      <Login {...props} setAuth={setAuth} />
                    ) : ( 
                      <Redirect to='/dashboard'/>
                    )
                } 
              />
            <Route exact path='/dashboard' 
              render={props => 
                isAuthenticated ? ( 
                  <Dashboard {...props} setAuth={setAuth} />
                ) : ( 
                  <Redirect to='/login'/>
                )
              } 
            />
          </Switch>
        </div>
        
      </BrowserRouter>
  </Fragment>

  ); 
    
}

export default App;

// BACK UP
// function App() {
//   return (
//     <BrowserRouter>
//       <div className="App">
//         <NavbarComponent />
//         <main>
//           <Switch>
//             <Route path="/home">
//               <LoginComponent />
//             </Route>
//             <Route path="/reimbursements">
//               <ReimbursementsComponent />
//             </Route>
//           </Switch>
//         </main>
//       </div>
//     </BrowserRouter>
//   );
// }