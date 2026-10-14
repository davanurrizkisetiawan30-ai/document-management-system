import { useState } from "react";
import { companies as initialCompanies, addCompany } from "../logic/companyLogic";

function Company() {

    const [showAddForm, setShowAddForm] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [companyData, setCompanyData] = useState(initialCompanies);
    const [selectedCompany, setSelectedCompany] = useState(null);

    function handleAddCompany() {
        const name = companyName.trim();
        if (!name) {
            alert("Nama Company Wajib Diisi");
            return;
        }
        const nameExist = companyData.some((company) => company.name.toLowerCase() === name.toLowerCase());
        if (nameExist) {
            alert("Nama Company sudah digunakan");
            return;
        }
        const newCompany = {
            name: name,
            status: "Active"
        };
        setCompanyData([...companyData, newCompany]);
        setCompanyName("");
        setShowAddForm(false);
    }

    return (
        <div>
            <h1>Company</h1>

            {/* add form */}
            <button onClick={() => setShowAddForm(true)}>Add Company</button>
            {showAddForm && (
                <div>
                    <h3>Add Company</h3>
                    <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    <button onClick={handleAddCompany}>Save</button>
                    <button onClick={() => setShowAddForm(false)}>Cancel</button>
                </div>
            )}

            <button>Edit Company</button>


            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {companyData.map((company, index) => (
                        <tr key={index} onClick={() => setSelectedCompany(company)} style={{ backgroundColor: selectedCompany?.name === company.name ? "#dbeafe" : "white", cursor: "pointer" }}>
                            <td>{company.name}</td>
                            <td>{company.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Company;