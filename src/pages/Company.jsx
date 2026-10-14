import { useState } from "react";
import { companies as initialCompanies, addCompany, editCompany, toggleCompanyStatus, filterCompanies } from "../logic/companyLogic";

function Company() {

    const [showAddForm, setShowAddForm] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [companyData, setCompanyData] = useState(initialCompanies);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editingCompany, setEditingCompany] = useState(null);
    const [search, setSearch] = useState("");
    const filteredCompanies = filterCompanies(companyData, search);

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

    function handleEditCompany() {
        const name = editingCompany.name.trim();
        if (!name) {
            alert("Nama Company Wajib Diisi");
            return;
        }
        const nameExist = companyData.some((company) => company.name.toLowerCase() === name.toLowerCase() && company.name !== selectedCompany.name);
        if (nameExist) {
            alert("Nama Company sudah digunakan");
            return;
        }
        const updatedCompany = {
            ...editingCompany,
            name: name
        };
        setCompanyData(companyData.map((company) => company.name === selectedCompany.name ? { ...company, name } : company));
        setSelectedCompany({...selectedCompany, name});
        setEditMode(false);
        setEditingCompany(null);
    }


    return (
        <div className="company-container">
            <div className="company-header">

                <input type="text" className="search" placeholder="Search Company" value={search} onChange={(e) => setSearch(e.target.value)} />

                <div className="company-buttons">
                    {/* add form */}
                    <button className="btn-upload" onClick={() => setShowAddForm(true)}>Add Company</button>
                    {showAddForm && (
                        <div>
                            <h3>Add Company</h3>
                            <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                            <button onClick={handleAddCompany}>Save</button>
                            <button onClick={() => setShowAddForm(false)}>Cancel</button>
                        </div>
                    )}

                    {/* edit form */}
                    <button className="btn-edit" onClick={() => {
                        if (!selectedCompany) {
                            alert("Pilih company terlebih dahulu");
                            return;
                        }
                        setEditingCompany({ ...selectedCompany });
                        setEditMode(true);
                    }}>Edit Company</button>
                    {editMode && (
                        <div className="company-form">
                            <h3>Edit Company</h3>
                            <label>Company Name</label>
                            <input type="text" value={editingCompany.name} onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })} />
                            <div className="form-buttons">
                            <button onClick={handleEditCompany}>Save</button>
                                <button onClick={() => { setEditMode(false); setEditingCompany(null); }}>Cancel</button>
                            </div>
                        </div>
                    )}

                    <button className="btn-download" onClick={() => {
                        if (!selectedCompany) {
                            alert("Pilih company terlebih dahulu");
                            return;
                        }
                        setCompanyData(toggleCompanyStatus(companyData, selectedCompany.name));
                        setSelectedCompany({...selectedCompany, status: selectedCompany.status === "Active" ? "Inactive" : "Active"});
                    }}>Active / Deactive</button>
                </div>
            </div>
            <table className="company-table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCompanies.map((company, index) => (
                        <tr key={index} onClick={() => setSelectedCompany(company)} className={selectedCompany?.name === company.name ? "selected-row" : ""}>
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