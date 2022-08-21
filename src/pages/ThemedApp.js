import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import React, { useMemo, useState } from 'react';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const ThemedApp = () => {
    const [mode, setMode] = useState('light');

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        }
    }), []);

    const theme = useMemo(() => createTheme({
        palette: {mode}
    }),[mode])

    return (
        <>
        <ColorModeContext.Provider value={colorMode} >
        <ThemeProvider theme={theme} >
            <CssBaseline/>
            <App/>
        </ThemeProvider>
        </ColorModeContext.Provider>
        </>
    );
}

export default ThemedApp;