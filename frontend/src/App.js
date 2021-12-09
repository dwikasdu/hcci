import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import UserProvider from "./service/auth/UserProvider";
import ScrollToTop from "./service/ScrollToTop"

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const ForgotPassword = React.lazy(() => import('./views/pages/ForgotPassword/ForgotPassword'));
const UbahForgotPassword = React.lazy(() => import('./views/pages/ForgotPassword/UbahForgotPassword'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const GenerateQRcode = React.lazy(() => import('./views/pages/GenerateQRcode/GenerateCode'));


const HomePage = React.lazy(() => import('./views/pages/home/Home'));

function App() {
  // const auth = localStorage.getItem('session') ? JSON.parse(window.atob(localStorage.getItem('session'))) : null;
  return (
    <UserProvider>
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <ScrollToTop>
            <Switch>
              {/* {auth !== null ? (
              <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
            ) : (
              <Route exact path="/" name="Home" render={props => <HomePage {...props} />} />
            )} */}

              <Route exact path="/home" name="Home" render={props => <HomePage {...props} />} />

              <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
              <Route exact path="/lupa-password" name="Lupa Password" render={props => <ForgotPassword {...props} />} />
              <Route exact path="/ubah-password/:id" name="Ubah Password" render={props => <UbahForgotPassword {...props} />} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
              <Route exact path="/detail-profil/:id" name="Detail Profil" render={props => <GenerateQRcode {...props} />} />


              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />

              <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
            </Switch>
          </ScrollToTop>
        </React.Suspense>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App;
