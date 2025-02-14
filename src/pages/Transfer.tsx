import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Transfer() {
    const [receiverId, setReceiverId] = useState<number | null>(null);
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleTransfer = async () => {
        if (!receiverId || amount <= 0) {
            alert("Please enter a valid receiver ID and amount.");
            return;
        }

        setLoading(true);
        try {
            const response = await API.post("/wallet/transfer", { receiverId, amount });
            alert(response.data.message); // Show success message
            navigate("/dashboard"); // Redirect to Dashboard after success
        } catch (error) {
            console.error("Transfer failed", error);
            alert("Transfer failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm p-4">
                <h2 className="mb-4">Transfer Funds</h2>

                <div className="mb-3">
                    <label className="form-label">Receiver ID</label>
                    <input
                        type="number"
                        className="form-control"
                        value={receiverId || ""}
                        onChange={(e) => setReceiverId(Number(e.target.value))}
                        placeholder="Enter Receiver ID"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        placeholder="Enter Amount"
                    />
                </div>

                <button className="btn btn-primary w-100" onClick={handleTransfer} disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>Processing...
                        </>
                    ) : (
                        "Transfer"
                    )}
                </button>
            </div>
        </div>
    );
}

export default Transfer;
