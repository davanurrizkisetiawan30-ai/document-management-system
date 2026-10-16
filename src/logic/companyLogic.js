export function filterCompanies(companies, search) {
    return companies.filter((company) =>
        company.name.toLowerCase().includes(search.toLowerCase())
    );
}

export const companies = [
    {
        name: "Company A",
        status: "Active"
    },
    {
        name: "Company B",
        status: "Active"
    },
    {
        name: "Company C",
        status: "Inactive"
    }
];

export function addCompany(companies, name) {
    const error = validateCompanyName(companies, name);
    if (error) {
        return {companies, error}
    }
    const newCompany = {
        name: name.trim(),
        status: "Active"
    };
    return {companies: [...companies, newCompany], error: null};
}

export function validateCompanyName(companies, name, oldName = null) {
    const trimmedName = name.trim();
    if (!trimmedName) {
        return "Nama Company Wajib Diisi";
    }
    const nameExist = companies.some((company) => company.name.toLowerCase() === trimmedName.toLowerCase() && company.name !== oldName);
    if (nameExist) {
        return "Nama Company sudah digunakan";
    }
    return null;
}

export function editCompany(companies, oldName, newName) {
    const error = validateCompanyName(companies, newName, oldName);
    if (error) {
        return {companies, error}
    }
    const updatedCompanies = companies.map((company) =>
        company.name === oldName ? { ...company, name: newName.trim() } : company
    );
    return {companies: updatedCompanies, error: null};
}

export function deleteCompany(companies, name) {
    return companies.filter((company) => company.name !== name);
}

export function toggleCompanyStatus(companies, name) {
    return companies.map((company) => 
        company.name === name ? { ...company, status: company.status === "Active" ? "Inactive" : "Active" } : company
    );
}   