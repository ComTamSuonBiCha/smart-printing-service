import React, { Fragment } from "react";
import { routes } from "./routes";
import { Route, Routes } from "react-router-dom";

function App() {
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
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}

export default App;
