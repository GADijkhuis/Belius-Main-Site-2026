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
import BlogPage from "./pages/BlogPage";
import BlogCategoryPage from "./pages/BlogCategoryPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
      <FluentProvider theme={webLightTheme}>
          <Router>
            <Routes>
                <Route path="/" Component={MainPage} />
                <Route path="/news" Component={NewsPage} />
                <Route path="/login" Component={LoginPage} />
                <Route path="/blog" Component={BlogCategoryPage} />
                <Route path="/blog/:categoryId" Component={BlogPage} />
                <Route path="/admin" Component={AdminPage} />
                {/*<Route path={`/${process.env.REACT_APP_BLOG_URL}`} Component={BlogPage} />*/}
            </Routes>
          </Router>
      </FluentProvider>
  );
}

export default App;
