import documentIcon from "../assets/icon.png";
import { useState } from "react";
import { companyRoles } from "../logic/roleLogic";

function Navbar() {

    const [company, setCompany] = useState("Company A");
    const role = companyRoles[company];

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={documentIcon} alt="icon" />
                <h2>DOCUMENT MANAGEMENT SYSTEM</h2>
            </div>
            <div className="navbar-right">
                <strong>Dava Nur R S</strong>
                <span>{role}</span>
                <select className="company-select" value={company} onChange={(e) => setCompany(e.target.value)}>
                    <option>Company A</option>
                    <option>Company B</option>
                </select>
            </div>
        </nav>
    );
}

export default Navbar;