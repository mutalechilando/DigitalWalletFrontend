import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

interface Transaction {
    transactionId: number;
    amount: number;
    timestamp: string;
    type: string;
    otherPartyUsername: string;
    otherPartyEmail: string;
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
        <div className="container mt-4">
            <div className="card shadow-sm p-4">
                <h2 className="mb-4">Transaction History</h2>

                <button className="btn btn-secondary mb-3" onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                </button>

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Details</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions.length > 0 ? (
                            transactions.map((tx) => (
                                <tr key={tx.transactionId}>
                                    <td>{tx.transactionId}</td>
                                    <td>{tx.type}</td>
                                    <td>ZMW {tx.amount.toFixed(2)}</td>
                                    <td>
                                        {tx.otherPartyUsername} ({tx.otherPartyEmail})
                                    </td>
                                    <td>{new Date(tx.timestamp).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    No transactions found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TransactionHistory;
