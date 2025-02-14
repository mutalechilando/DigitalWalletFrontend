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
        <div>
            <h2>Transfer Funds</h2>
            <input
                type="number"
                value={receiverId || ""}
                onChange={(e) => setReceiverId(Number(e.target.value))}
                placeholder="Enter Receiver ID"
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter Amount"
            />
            <button onClick={handleTransfer} disabled={loading}>
                {loading ? "Processing..." : "Transfer"}
            </button>
        </div>
    );
}

export default Transfer;
