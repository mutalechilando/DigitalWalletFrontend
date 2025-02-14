import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import API from "../services/api";

function Withdraw() {
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

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
                alert(response.data.message + ": ZMW " + amount );
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
        <div>
            <h2>Withdraw Funds</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter amount"
            />
            <button onClick={handleWithdraw} disabled={loading}>
                {loading ? "Processing..." : "Withdraw"}
            </button>
        </div>
    );
}

export default Withdraw;
