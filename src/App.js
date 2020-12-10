import React from 'react';
import { Route , Switch} from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// pages
import NumberOfPlayerPage from './pages/NumberOfPlayerPage';
import PlayersNamePage from './pages/PlayersNamePage';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage';
import JustPointPage from './pages/JustPointPage';
import GameIDPage from './pages/GameIDPage';

// util
import ProtectedRoute from './routes/ProtectedRoute';
import {AuthProvider} from './auth/AuthProvider';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App = () => {
  return(
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <AuthProvider>
              <Switch>
                <ProtectedRoute path="/" component={NumberOfPlayerPage} exact={true} />
                <ProtectedRoute path="/playersName" component={PlayersNamePage} exact={true} />
                <ProtectedRoute path="/gamePage" component={GamePage} exact={true} />
                <Route path="/loginPage" component={LoginPage} exact={true} />
                <Route path="/justPointPage" component={JustPointPage} exact={true} />
                <Route path="/gameIdPage" component={GameIDPage} exact={true} />
              </Switch>
            </AuthProvider>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
  )
};

export default App;
