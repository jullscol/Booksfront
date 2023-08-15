import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import store from './redux/store';
import { LoginAuth } from './views/Login/LoginAuth';
import Rating from './components/Rating';
import UserSync from './components/UserSync';

const persistor = persistStore(store);

const handleUserData = (userData) => {
  // Lógica para manejar los datos del usuario
  console.log("Pasando por Index 1", JSON.stringify(userData));
  // Otros procesamientos o actualizaciones de estado
};

ReactDOM.render(
  <Auth0Provider
  // authorizationParams={{audience:"https:wondertoysworyfinal.us.auth0.com", scope:"openid" }}
    domain="wondertoysworyfinal.us.auth0.com"
    clientId="FelhvdgmUF99LiuQCHgzaDiCIgIXTbPH"
    // domain="wondertoyshenry.us.auth0.com"
    // clientId="pmqIpRA46YXGq9RBHCY0BG7calWTBYWG"
    redirectUri={window.location.origin} //authorizationParams.redirect_uri
    cacheLocation="localstorage" // Guarda el estado de la sesión en el almacenamiento local
  >
    <ChakraProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
          <UserSync onUserDataW={handleUserData} />
        </PersistGate>
      </Provider>
    </ChakraProvider>
  </Auth0Provider>,
  document.getElementById("root")
);