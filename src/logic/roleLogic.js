export const currentUser = {
    name: "Dava",
    role: "Admin",
    company: "Company A"
};

export function documentPermissions(role) {
    return {
        canUpload: role === "Admin" || role === "Staff",
        canEdit: role === "Admin" || role === "Staff",
        canDelete: role === "Admin" || role === "Staff",
        canDownload: true
    };
}