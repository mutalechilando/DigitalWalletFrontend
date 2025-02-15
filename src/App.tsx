import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";
import PrivateRoute from "./components/PrivateRoute"
import TransactionHistory from "./pages/TransactionHistory";
import Footer from "./components/Footer.tsx"

function App() {
    return (
        <>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/deposit" element={<Deposit />} />
                    <Route path="/withdraw" element={<Withdraw />} />
                    <Route path="/transfer" element={<Transfer />} />
                    <Route path="/transaction-history" element={<TransactionHistory />} />
                </Route>
            </Routes>

            <Footer />
        </>
    );
}

export default App;
