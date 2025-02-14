import { useEffect, useState } from "react";
import API from "../services/api";


function Dashboard() {
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await API.get("/wallet/balance");
                console.log("Response from backend:", response.data); // Debug correctly

                if (response.data) {
                    console.log("Balance value:", response.data.balance); // Use lowercase 'balance'
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

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Wallet Balance: {balance !== null ? `$${balance}` : "Loading..."}</p>
        </div>
    );
}

export default Dashboard;
