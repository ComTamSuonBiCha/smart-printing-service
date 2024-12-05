import Dashboard from "../dashboard";
import LoginPage from "../homelogin";
import Login from "../login";
import PrinterDetail from "../pages/printerDetail/printerDetail";
import SPSODashboard from "../pages/spso/SPSODashboard";
import Stats from "../pages/stats";
import StudentInfo from "../pages/studentInfo/studentInfo";
import PrintDocument from "../printdocument";

const routes = [
  { path: "/", component: LoginPage },
  { path: "/main", component: Dashboard },
  { path: "/login", component: Login },
  { path: "/spso", component: SPSODashboard },
  { path: "/stats", component: Stats },
  { path: "/printer", component: PrinterDetail },
  { path: "/print", component: PrintDocument },
  { path: "/student", component: StudentInfo },
];

export { routes };
