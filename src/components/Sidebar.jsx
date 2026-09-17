import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <aside className="sidebar">
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/document">Documents</NavLink>
                <NavLink to="/user">User</NavLink>
                <NavLink to="/company">Company</NavLink>
                <NavLink to="/audit-trail">Audit Trail</NavLink>
                <NavLink to="/logout">Logout</NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;