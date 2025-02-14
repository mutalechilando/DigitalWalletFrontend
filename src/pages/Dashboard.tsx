import { useEffect, useState } from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";


function Dashboard() {
    const [balance, setBalance] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await API.get("/wallet/balance");
                //console.log("Response from backend:", response.data); // Debug correctly

                if (response.data) {
                    //console.log("Balance value:", response.data.balance); // Use lowercase 'balance'
                    setBalance(response.data.balance); // Fix case sensitivity
                } else {
                    console.error("Unexpected response format:", response);
                }
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, []);

    const handleLogout = async () => {
        try {
            await API.post("/auth/logout"); // Call backend logout API

            localStorage.removeItem("token"); // Remove token from storage
            navigate("/"); // Redirect to login page
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <h2 className="text-center mb-4">Dashboard</h2>

                <p className="fs-5 text-center">
                    Wallet Balance: <strong>ZMW {balance !== null ? balance : "Loading..."}</strong>
                </p>

                <div className="d-flex flex-wrap justify-content-center gap-3">
                    <button className="btn btn-primary" onClick={() => navigate("/deposit")}>
                        Deposit
                    </button>
                    <button className="btn btn-success" onClick={() => navigate("/withdraw")}>
                        Withdraw
                    </button>
                    <button className="btn btn-warning" onClick={() => navigate("/transfer")}>
                        Transfer
                    </button>
                    <button className="btn btn-info" onClick={() => navigate("/transaction-history")}>
                        Transaction History
                    </button>
                </div>

                <div className="text-center mt-4">
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>

    );
}

export default Dashboard;
