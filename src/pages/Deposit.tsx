import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import API from "../services/api";

function Deposit() {
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleDeposit = async () => {
        if (amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        setLoading(true);
        try {
            const response = await API.post("/wallet/deposit", { amount });
            //console.log("Response from backend:", response.status);
            if (response.status === 200) {
                alert(response.data.message + ": ZMW " + amount );
                //alert("SUCCESS: "+ amount + " deposited")
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Deposit failed", error);
            alert("Deposit failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4 shadow-sm" style={{maxWidth: "400px", width: "100%"}}>
                <h2 className="text-center mb-4">Deposit Funds</h2>

                <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min="1"
                        required
                    />
                </div>

                <button className="btn btn-success w-100" onClick={handleDeposit} disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Processing...
                        </>
                    ) : (
                        "Deposit"
                    )}
                </button>
            </div>
        </div>
    );
}

export default Deposit;
