import Home from './pages/Home';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Entry/login';
import Register from './components/Entry/Register';
import Profile from './pages/profile/Profile';
import { useContext } from 'react';
import { Context } from './Context/Context';

function App() {
  const { user } = useContext(Context);
  console.log(user);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {user ? <Home user /> : <Register />}
          </Route>
          <Route exact path="/login">
            {user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
