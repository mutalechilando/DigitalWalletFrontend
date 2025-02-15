import React from "react";
import "../styles/Footer.css";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container text-center">
                <p>
                    &copy; 2025 Designed by{" "}
                    <a href="https://profile.codersrank.io/user/mutalechilando" target="_blank" rel="noopener noreferrer">
                        Mutale Chilando
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
