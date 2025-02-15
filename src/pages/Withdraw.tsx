import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

function Withdraw() {
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleWithdraw = async () => {
        if (amount <= 0) {
            await Swal.fire({
                title: "Withdraw failed",
                text: "Please enter a valid amount.",
                icon: "error",
                confirmButtonColor: "#D32F2F",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await API.post("/wallet/withdraw", { amount });
            //console.log("Response from backend:", response.data);
            if (response.status === 200) {
                await Swal.fire({
                    title: "Withdraw Success!",
                    text: `${response.data.message}: ZMW ${amount}`,
                    icon: "success",
                    confirmButtonColor: "#4CAF50",
                });
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Withdrawal failed", error);
            await Swal.fire({
                title: "Withdraw failed",
                text: "Withdrawal failed. Please try again.",
                icon: "error",
                confirmButtonColor: "#D32F2F",
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4 shadow-sm" style={{maxWidth: "400px", width: "100%"}}>
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

                <div className="text-center mt-4">
                    <button className="btn btn-secondary mb-3" onClick={() => navigate("/dashboard")}>
                        Back to Dashboard
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Withdraw;
