export const currentUser = {
    name: "Dava",
    role: "Admin",
    company: "Company A"
};

export const companyRoles = {
    "Company A" : "Admin",
    "Company B" : "Staff",
};

export function documentPermissions(role) {
    return {
        canUpload: role === "Admin" || role === "Staff",
        canEdit: role === "Admin" || role === "Staff",
        canDelete: role === "Admin" || role === "Staff",
        canDownload: true
    };
}

export function getCompanyRole(user, company){
    const access = user?.companyAccess?.find((item) => item.company === company);
    return access ? access.role : null;
}