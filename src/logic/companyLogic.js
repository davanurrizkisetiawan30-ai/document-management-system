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

export function addCompany(companies, newCompany) {
    return [...companies, newCompany];
}

export function editCompany(companies, oldName, updatedCompany) {
    return companies.map((company) => 
    company.name === oldName ? { ...company, ...updatedCompany } : company
    );
}