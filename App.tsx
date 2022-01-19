/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import AppArea from './AppArea';
import GlobalState from './context/GlobalState';

const App = () => {
  return (
    <GlobalState>
      <AppArea />
    </GlobalState>
  );
};

export default App;
