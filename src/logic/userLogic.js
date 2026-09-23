import { useState } from "react";

export function useUserSearch() {
    const [search, setSearch] =  useState("");
    return {
        search, setSearch
    };
}

export function filterUsers(users, search) {
    return users.filter((user) => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
    );
}

export function addUser(users, newUser) {
    return [...user, newUser];
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