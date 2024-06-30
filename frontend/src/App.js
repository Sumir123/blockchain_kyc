import ConnectBank from "./components/bank/connect_bank";
import ConnectUser from "./components/user/pages/connect_user";
import BankDashboard from "./components/bank/dashboard";
import UserDashboard from "./components/user/pages/dashboard";
import RequestVerification from "./components/user/pages/requestVerification";
import GrantAccess from "./components/user/pages/GrantAccess";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { KycForm } from "./components/user/pages/kycForm/KycForm";
import LandingPage from "./components/LandingPage/LandingPage";
import AdminDashboard from "./components/admin/dashboard";
import ClientPage from "./components/bank/clients";
import RequestClient from "./components/bank/requestClient";
import AllBankClientsPage from "./components/bank/allBankClients";
import UserKyc from "./components/bank/userKYC";
import ViewKyc from "./components/user/pages/viewKyc";
import UserBanks from "./components/user/pages/myBanks";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./theme/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="top-right"
          theme="light"
          limit={2}
          autoClose={3000}
          hideProgressBar={false}
          closeButton={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss={false}
          rtl={false}
          draggable={false}
        />
        <CssBaseline />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="user" element={<ConnectUser />} />
            <Route path="bank" element={<ConnectBank />} />
            <Route path="user/dashboard" element={<UserDashboard />} />
            <Route path="user/banks" element={<UserBanks />} />
            <Route path="user/kycform" element={<KycForm />} />
            <Route
              path="user/requestVerification"
              element={<RequestVerification />}
            />
            <Route path="user/grantAccess" element={<GrantAccess />} />
            <Route path="bank/dashboard" element={<BankDashboard />} />
            <Route path="bank/clients" element={<ClientPage />} />
            <Route path="bank/requestclient" element={<RequestClient />} />
            <Route path="bank/allclients" element={<AllBankClientsPage />} />
            <Route path="bank/userkycdetails/:id" element={<UserKyc />} />
            <Route path="user/viewKyc/:id" element={<ViewKyc />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
