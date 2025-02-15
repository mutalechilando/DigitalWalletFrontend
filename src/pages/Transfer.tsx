import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css"

function Transfer() {
    const [receiver, setReceiver] = useState<string>(""); // Changed from receiverId to receiver (username or email)
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleTransfer = async () => {
        if (!receiver.trim() || amount <= 0) {
            alert("Please enter a valid receiver (email or username) and amount.");
            return;
        }

        setLoading(true);
        try {
            const response = await API.post("/wallet/transfer", { receiver, amount });
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
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4 shadow-sm" style={{maxWidth: "400px", width: "100%"}}>
                <h2 className="mb-4">Transfer Funds</h2>

                <div className="mb-3">
                    <label className="form-label">Receiver (Email or Username)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                        placeholder="Enter Receiver Email or Username"
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

                <div className="text-center mt-4">
                    <button className="btn btn-secondary mb-3" onClick={() => navigate("/dashboard")}>
                        Back to Dashboard
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Transfer;