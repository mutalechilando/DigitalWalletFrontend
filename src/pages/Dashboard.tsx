import { useEffect, useState } from "react";
import API from "../services/api";


function Dashboard() {
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await API.get("/wallet/balance");
                console.log("response here:" + response.data.Balance);
                setBalance(response.data.Balance);
            } catch (error) {
                console.error("Error fetching balance", error);
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
