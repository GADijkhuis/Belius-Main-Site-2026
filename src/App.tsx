import React from 'react';
import './App.css';
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {
  FluentProvider,
  webLightTheme
} from "@fluentui/react-components";
import MainPage from "./pages/MainPage";
import NewsPage from "./pages/NewsPage";

function App() {
  return (
      <FluentProvider theme={webLightTheme}>
          <Router>
            <Routes>
              <Route path="/" Component={MainPage} />
              <Route path="/news" Component={NewsPage} />
            </Routes>
          </Router>
      </FluentProvider>
  );
}

export default App;
