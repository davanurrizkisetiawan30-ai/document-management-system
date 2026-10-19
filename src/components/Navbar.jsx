import documentIcon from "../assets/icon.png";
import { useActiveSession } from "../logic/activeSession";

function Navbar() {

    const { activeSession, setActiveSession } = useActiveSession();
    if (!activeSession) {
        return null;
    }
    const { user, company, role } = activeSession;

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={documentIcon} alt="icon" />
                <h2>DOCUMENT MANAGEMENT SYSTEM</h2>
            </div>
            <div className="navbar-right">
                <strong>{user.name}</strong>
                <span>{role}</span>
                <select className="company-select" value={company} onChange={(e) => {
                    const selectedCompany = e.target.value;
                    const selectedAccess = user.companyAccess.find((access) => access.company === selectedCompany);
                    if (selectedAccess) {setActiveSession({
                        user, company: selectedAccess.company, role: selectedAccess.role
                    });
                }
                }}> 
                {user.companyAccess.map((access) => (
                    <option key={access.company} value={access.company}>{access.company}</option>
                ))}
                </select>
            </div>
        </nav>
    );
}

export default Navbar;