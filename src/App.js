import HomeLogin from "./homelogin" 
import Home from "./home"
import Login from "./login" 
import React, { Fragment } from "react";
import { routes } from "./routes";
import { Route, Routes } from "react-router-dom";
import DashboardStudent from "./dashboard";

function App() {
  return (
    <Routes>
      {routes.map((route, index) => {
        const Layout = route.layout ? route.layout : Fragment;
        const Page = route.component;
        return (
          <Route>
            <Route index element = {<Home/>} />
            <Route path="/HomeLogin" element = {<HomeLogin/>}/>
            <Route path="/Login" element = {<Login/>}/>
            <Route path="/Dashboard" element = {<DashboardStudent/>}/>

          </Route>
            // key={index}
            // path={route.path}
            // element={
            //   <Layout>
            //     <Page />
            //   </Layout>
            //}
          // />
        );
      })}
    </Routes>
  );
}

export default App;
