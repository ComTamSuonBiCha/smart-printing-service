import React, { Fragment, useState } from "react";
import { routes } from "./routes";
import { Route, Routes } from "react-router-dom";
import Header from "./header";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const handleLogin = (val) => {
    setIsLogin(val);
  };
  return (
    <Routes>
      {routes.map((route, index) => {
        const Layout = route.layout ? route.layout : Fragment;
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Header isLogin={isLogin} setLogin={handleLogin} />
                <Page setLogin={handleLogin} />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
