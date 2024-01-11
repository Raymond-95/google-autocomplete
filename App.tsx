/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store'

import Navigator from 'features/navigation/Navigator'

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;
