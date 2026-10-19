import { useLocation, useNavigate } from "react-router-dom";
import { useActiveSession } from "../logic/activeSession";

function SelectCompany() {
    const location = useLocation();
    const navigate = useNavigate();
    const { setActiveSession } = useActiveSession();

    const user = location.state?.user;

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <div className="select-company">
            <h2>Pilih Perusahaan</h2>
            <p>Halo, {user.username}</p>

            {user.companyAccess.map((access) => (
                <button key={access.company} onClick={() => {
                    setActiveSession({ user: user, company: access.company, role: access.role });
                    navigate("/");
                }}>{access.company} - {access.role}</button>
            ))}
        </div>
    )
}

export default SelectCompany;