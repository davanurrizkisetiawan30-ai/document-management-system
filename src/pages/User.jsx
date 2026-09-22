import { useState } from "react";
import { users, useUserSearch, toggleUserStatus } from "../logic/userLogic";

function User() {

    const { search, setSearch } = useUserSearch();
    const [userData, setUserData] = useState(users);
    const [selectedUser, setSelectUser] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
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
                    <button className="btn-upload">Add User</button>
                    <button className="btn-edit" onClick={() => {
                        if (!selectedUser) return;
                        const user = userData.find((user) => user.username === selectedUser);
                        console.log("user yg dipilih:",user)
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
            {showEditForm && (
                <div className="edit-user-form">
                    <h3>Edit User</h3>
                    <input type="text" placeholder="Name" value={editName} onChange={(e) => setEditName(e.target.value)}/>
                    <input type="text" placeholder="Username" value={editUsername} onChange={(e) => setEditUsername(e.target.value)}/>
                    <button className="btn-edit">Save</button>
                    <button onClick={() => setShowEditForm(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default User;