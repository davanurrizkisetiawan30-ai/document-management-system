import { users, useUserSearch } from "../logic/userLogic";

function User() {

    const { search, setSearch } = useUserSearch();
    const filteredUsers = users.filter((user) => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()) 
    );

    return (
        <div className="activity">
            <div className="document-action">
                <input type="text" placeholder="Search User" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <table className="document-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Company Access</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.username}>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.companyAccess.join(", ")}</td>
                            <td>{user.role.join(", ")}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default User;