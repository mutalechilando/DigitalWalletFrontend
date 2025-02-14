import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

function Withdraw() {
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleWithdraw = async () => {
        if (amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        setLoading(true);
        try {
            const response = await API.post("/wallet/withdraw", { amount });
            console.log("Response from backend:", response.data);
            if (response.status === 200) {
                alert(`${response.data.message}: ZMW ${amount}`);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Withdrawal failed", error);
            alert("Withdrawal failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm p-4">
                <h2 className="mb-4">Withdraw Funds</h2>

                <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        placeholder="Enter amount"
                    />
                </div>

                <button className="btn btn-danger w-100" onClick={handleWithdraw} disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>Processing...
                        </>
                    ) : (
                        "Withdraw"
                    )}
                </button>
            </div>
        </div>
    );
}

export default Withdraw;
