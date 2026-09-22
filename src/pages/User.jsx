import { useState } from "react";
import { users, useUserSearch, toggleUserStatus } from "../logic/userLogic";

function User() {

    const { search, setSearch } = useUserSearch();
    const [userData, setUserData] = useState(users);
    const [selectedUser, setSelectUser] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [addName, setAddName] = useState("");
    const [addUsername, setAddUsername] = useState("");
    const [editName, setEditName] = useState("");
    const [editUsername, setEditUsername] = useState("");
    const selectedUserData = userData.find((user) => user.username === selectedUser);
    const filteredUsers = userData.filter((user) => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()) 
    );

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
                    <select>
                        <option value="">Select Company</option>
                        <option value="Company A">Company A</option>
                        <option value="Company B">Company B</option>
                    </select>
                    <button className="btn-upload" onClick={() => {
                        if (!addName || !addUsername){return;}
                        const newUser = {
                            name: addName,
                            username: addUsername,
                            companyAccess: [],
                            role: [],
                            status: "Active"
                        };
                        setUserData([...userData, newUser]);
                        setShowAddForm(false);
                    }}>Save</button>
                    <button onClick={() => setShowAddForm(false)}>Cancel</button>
                </div>
            )}

            {showEditForm && (
                <div className="edit-user-form">
                    <h3>Edit User</h3>
                    <input type="text" placeholder="Name" value={editName} onChange={(e) => setEditName(e.target.value)}/>
                    <input type="text" placeholder="Username" value={editUsername} onChange={(e) => setEditUsername(e.target.value)}/>
                    <button className="btn-edit" onClick={() => {
                        const updateUsers = userData.map((user) => user.username === selectedUser ? {
                            ...user,
                            name: editName,
                            username: editUsername
                        } : user );
                        setUserData(updateUsers);
                        setShowEditForm(false);
                    }}>Save</button>
                    <button onClick={() => setShowEditForm(false)}>Cancel</button>
                </div>
            )}

        </div>
    );
}

export default User;