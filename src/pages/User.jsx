import { useState } from "react";
import { users, useUserSearch, filterUsers, toggleUserStatus, addUser, editUser } from "../logic/userLogic";

function User() {

    /*search+filter*/
    const { search, setSearch } = useUserSearch();
    const [userData, setUserData] = useState(users);
    const [selectedUser, setSelectUser] = useState(null);
    const selectedUserData = userData.find((user) => user.username === selectedUser);
    const filteredUsers = filterUsers(userData, search);

    /*show*/
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    /*add*/
    const [addName, setAddName] = useState("");
    const [addUsername, setAddUsername] = useState("");
    const [addCompany, setAddCompany] = useState("");
    const [addRole, setAddRole] = useState("");

    /*edit*/
    const [editName, setEditName] = useState("");
    const [editUsername, setEditUsername] = useState("");
    const [editCompany, setEditCompany] = useState("");
    const [editRole, setEditRole] = useState("");


    return (
        <div className="activity">
            <div className="document-header">
                <div className="document-action">
                    <input type="text" placeholder="Search User" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="document-buttons">
                    <button className="btn-upload" onClick={() => setShowAddForm(true)}>Add User</button>
                    <button className="btn-edit" onClick={() => {
                        if (!selectedUser) return;
                        const user = userData.find((user) => user.username === selectedUser);
                        setEditName(user.name);
                        setEditUsername(user.username);
                        setEditCompany(user.companyAccess[0]);
                        setEditRole(user.role[0]);
                        setShowEditForm(true);
                    }}>Edit User</button>
                    <button className="btn-download" onClick={() => {
                        if (!selectedUser) return;
                        const updateUsers = toggleUserStatus(userData, selectedUser);
                        setUserData(updateUsers);
                    }}>Active / Deactive</button>
                </div>
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
                        <tr key={user.username} onClick={() => setSelectUser(user.username)} className={selectedUser === user.username ? "selected-user" : ""} >
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.companyAccess.join(", ")}</td>
                            <td>{user.role.join(", ")}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showAddForm && (
                <div className="edit-user-form">
                    <h3>Add User</h3>
                    <input type="text" placeholder="Name" value={addName} onChange={(e) => setAddName(e.target.value)} />
                    <input type="text" placeholder="Username" value={addUsername} onChange={(e) => setAddUsername(e.target.value)} />
                    <select value={addCompany} onChange={(e) => setAddCompany(e.target.value)}>
                        <option value="">Select Company</option>
                        <option value="Company A">Company A</option>
                        <option value="Company B">Company B</option>
                    </select>
                    <select value={addRole} onChange={(e) => setAddRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Staff">Staff</option>
                        <option value="Viewer">Viewer</option>
                    </select>
                    <div className="form-buttons">
                        <button className="btn-upload" onClick={() => {
                            if (!addName || !addUsername){return;}
                            const newUser = {
                                name: addName,
                                username: addUsername,
                                companyAccess: [addCompany],
                                role: [addRole],
                                status: "Active"
                            };
                            setUserData(addUser(userData, newUser));
                            setShowAddForm(false);
                        }}>Save</button>
                        <button className="btn-cancel" onClick={() => setShowAddForm(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {showEditForm && (
                <div className="edit-user-form">
                    <h3>Edit User</h3>
                    <input type="text" placeholder="Name" value={editName} onChange={(e) => setEditName(e.target.value)}/>
                    <input type="text" placeholder="Username" value={editUsername} onChange={(e) => setEditUsername(e.target.value)}/>
                    <select value={editCompany} onChange={(e) => setEditCompany(e.target.value)}>
                        <option value="">Select Company</option>
                        <option value="Company A">Company A</option>
                        <option value="Company B">Company B</option>
                    </select>
                    <select value={editRole} onChange={(e) => setEditRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Staff">Staff</option>
                        <option value="Viewer">Viewer</option>
                    </select>
                    <div className="form-buttons">
                        <button className="btn-edit" onClick={() => {
                            const updateUsers = editUser(userData, selectedUser, {
                                name: editName,
                                username: editUsername,
                                companyAccess: [editCompany],
                                role: [editRole]
                            });
                            setUserData(updateUsers);
                            setShowEditForm(false);
                        }}>Save</button>
                        <button className="btn-cancel" onClick={() => setShowEditForm(false)}>Cancel</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default User;