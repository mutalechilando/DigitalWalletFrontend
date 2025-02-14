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
            console.log("Response from backend:", response.status);
            if (response.status === 200) {
                alert(response.data.message + ": ZMW " + amount ); // Show success message
                //alert("SUCCESS: "+ amount + " deposited")
                navigate("/dashboard"); // Redirect to Dashboard after success
            }

        } catch (error) {
            console.error("Deposit failed", error);
            alert("Deposit failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Deposit Funds</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter amount"
            />
            <button onClick={handleDeposit} disabled={loading}>
                {loading ? "Processing..." : "Deposit"}
            </button>
        </div>
    );
}

export default Deposit;
