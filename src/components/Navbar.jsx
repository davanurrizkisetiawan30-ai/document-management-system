import documentIcon from "../assets/icon.png";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={documentIcon} alt="icon" />
                <h2>DOCUMENT MANAGEMENT SYSTEM</h2>
            </div>
            <div className="navbar-right">
                <strong>Dava Nur R S</strong>
                <span>Company A</span>
            </div>
        </nav>
    );
}

export default Navbar;