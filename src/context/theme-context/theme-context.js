import React from 'react';

const ThemeContext = React.createContext({
   theme: 'dark',
   changeTheme: () => {}
});

export default ThemeContext;