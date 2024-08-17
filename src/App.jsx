import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./components/Pages/MainPage/MainPage";
import AnimeTitle from "./components/Pages/AnimeTitle/AnimeTitle";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { red } from "@mui/material/colors";
import Films from "./components/Pages/Films/Films";
import Serials from "./components/Pages/Serials/Serials";
import AnimeSearch from "./components/Pages/AnimeSearch/AnimeSearch";
import Popular from "./components/ui/Popular/Popular";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
    {
      path: "/",
      element: <MainPage />
    }, 
    {
      path: "/title/:id",
      element: <AnimeTitle />
    },
    {
      path: "/films",
      element: <Films />
    },
    {
      path: "/serials",
      element: <Serials />
    },
    {
      path: "/searcher",
      element: <AnimeSearch />
    },
    {
      path: "/popular",
      element: <Popular/>
    },
    
  ]
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: red[900]
    },
    background: {
      paper: '#242424',
      default: '#242424'
    },
  },
  
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
    // <BrowserRouter>
    //   <ThemeProvider>
    //     <Header />
    //     <Routes>
    //       <Route path="/" element={<MainPage />} />
    //       <Route path="/title" element={<Title />} />
    //       <Route path="/search/*" element={<SearchPage />} />
    //     </Routes>
    //   </ThemeProvider>
    // </BrowserRouter>
  );
}

export default App;
