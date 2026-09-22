import { useState } from "react";

export function useUserSearch() {
    const [search, setSearch] =  useState("");
    return {
        search, setSearch
    };
}

export function editUser(users, username, updateUser) {
    return users.map((user) => user.username === username ? { ...user, ...updateUser } : user ); 
}

export function toggleUserStatus(users, username) {
    return users.map((user) => user.username === username ? {
        ...user, status: user.status === "Active" ? "Inactive" : "Active"
    } : user );
}

export const users = [
    {
        name: "Dava Nur R S",
        username: "Dava01",
        companyAccess: ["Company A", "Company B"],
        role: ["Admin", "Staff"],
        status: "Active"
    },
    {
        name: "Muhamad Farel P",
        username: "Farel01",
        companyAccess: ["Company B"],
        role: ["Staff"],
        status: "Active"
    },
    {
        name: "Cathrine",
        username: "Cath01",
        companyAccess: ["Company B"],
        role: ["Viewer"],
        status: "Inactive"
    }
];