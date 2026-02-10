import React from 'react';
import './App.css';
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {
  FluentProvider,
  webLightTheme
} from "@fluentui/react-components";
import MainPage from "./pages/MainPage";

function App() {
  return (
      <FluentProvider theme={webLightTheme}>
        <div className={`container`}>
          <Router>
            <Routes>
              <Route path="/" Component={MainPage} />
            </Routes>
          </Router>
        </div>
      </FluentProvider>
  );
}

export default App;
