import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

interface Transaction {
    transactionId: number;
    amount: number;
    timestamp: string;
    type: string;
    otherParty: number;
}

function TransactionHistory() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await API.get("/wallet/history");
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transactions", error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Transaction History</h2>
            <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
            <table border={1} width="100%">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Other Party</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {transactions.length > 0 ? (
                    transactions.map((tx) => (
                        <tr key={tx.transactionId}>
                            <td>{tx.transactionId}</td>
                            <td>{tx.type}</td>
                            <td>${tx.amount}</td>
                            <td>{tx.otherParty}</td>
                            <td>{new Date(tx.timestamp).toLocaleString()}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5}>No transactions found</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionHistory;
