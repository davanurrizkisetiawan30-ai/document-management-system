import { users } from "../logic/userLogic";

function User() {
    return (
        <div className="activity">
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
                    {users.map((user) => (
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