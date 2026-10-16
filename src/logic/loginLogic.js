const users = [
    {
        id: 1,
        name: "Dava",
        username: "Dava01",
        password: "12345",
        companyAccess: [
            { company: "Company A", role: "Admin" },
            { company: "Company B", role: "Staff" }
        ],
        status: "Active"
    },
    {
        id: 2,
        name: "Farel",
        username: "Farel01",
        password: "12345",
        companyAccess: [
            { company: "Company B", role: "Viewer" }
        ],
        status: "Active"
    }
];

export function loginUser(username, password) {
    const user = users.find((user) => 
        user.username === username && 
        user.password === password &&
        user.status === "Active"
    );
    if (!user) {
        return null;
    }
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        companyAccess: user.companyAccess
    };
}