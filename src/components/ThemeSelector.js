import { ChakraProvider, extendTheme, Box, Grid } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import WeatherCard from "./components/WeatherCard";
import useWeather from "./hooks/useWeather";

const catppuccin = {
  latte: {
      base: '#eff1f5',
      mantle: '#e6e9ef',
      crust: '#dce0e8',
      text: '#4c4f69',
      subtext1: '#5c5f77',
      surface0: '#ccd0da',
      surface1: '#bcc0cc',
      overlay0: '#9ca0b0',
      blue: '#1e66f5',
      lavender: '#7287fd',
      sapphire: '#209fb5',
      sky: '#04a5e5'
  },
  frappe: {
      base: '#303446',
      mantle: '#292c3c',
      crust: '#232634',
      text: '#c6d0f5',
      subtext1: '#b5bfe2',
      surface0: '#414559',
      surface1: '#51576d',
      overlay0: '#737994',
      blue: '#8caaee',
      lavender: '#babbf1',
      sapphire: '#85c1dc',
      sky: '#99d1db'
  },
  macchiato: {
      base: '#24273a',
      mantle: '#1e2030',
      crust: '#181926',
      text: '#cad3f5',
      subtext1: '#b8c0e0',
      surface0: '#363a4f',
      surface1: '#494d64',
      overlay0: '#6e738d',
      blue: '#8aadf4',
      lavender: '#b7bdf8',
      sapphire: '#7dc4e4',
      sky: '#91d7e3'
  },
  mocha: {
      base: '#1e1e2e',
      mantle: '#181825',
      crust: '#11111b',
      text: '#cdd6f4',
      subtext1: '#bac2de',
      surface0: '#313244',
      surface1: '#45475a',
      overlay0: '#6c7086',
      blue: '#89b4fa',
      lavender: '#b4befe',
      sapphire: '#74c7ec',
      sky: '#89dceb'
  }
};

const App = () => {
  const [themeName, setThemeName] = React.useState("mocha");
  const weather = useWeather("Toronto");

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: themes[themeName].colors.background,
          color: themes[themeName].colors.text,
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Grid templateColumns="250px 1fr" minHeight="100vh">
        <Sidebar onThemeChange={setThemeName} />
        <Box p="5">
          <WeatherCard weather={weather} />
        </Box>
      </Grid>
    </ChakraProvider>
  );
};

export default App;
