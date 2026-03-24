import React from 'react';
import './styles/App.css';
import './styles/Site.css';
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {
    FluentProvider,
    webLightTheme
} from "@fluentui/react-components";
import MainPage from "./pages/MainPage";
import NewsPage from "./pages/NewsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
      <FluentProvider theme={webLightTheme}>
          <Router>
            <Routes>
              <Route path="/" Component={MainPage} />
              <Route path="/news" Component={NewsPage} />
              <Route path="/login" Component={LoginPage} />
            </Routes>
          </Router>
      </FluentProvider>
  );
}

export default App;
