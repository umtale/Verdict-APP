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
import { AuthProvider } from './AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <AppArea />
    </AuthProvider>
  );
};

export default App;
