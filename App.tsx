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
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'

function App(): React.JSX.Element {

  return (
    <AutocompleteDropdownContextProvider>
      <Provider store={store}>
        <Navigator />
      </Provider >
    </AutocompleteDropdownContextProvider>
  );
}

export default App;
