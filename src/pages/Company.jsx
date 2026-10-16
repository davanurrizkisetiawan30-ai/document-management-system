import { useState } from "react";
import { companies as initialCompanies, addCompany, editCompany, deleteCompany, toggleCompanyStatus, filterCompanies } from "../logic/companyLogic";

function Company() {

    {/** Add Company Form */}
    const [showAddForm, setShowAddForm] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [companyData, setCompanyData] = useState(initialCompanies);
    {/** Edit Company Form */}
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editingCompany, setEditingCompany] = useState(null);
    {/** Search Company */}
    const [search, setSearch] = useState("");
    const filteredCompanies = filterCompanies(companyData, search);

    {/** Add Company */}
    function handleAddCompany() {
        const result = addCompany(companyData, companyName);
        if (result.error) {
            alert(result.error);
            return;
        }
        setCompanyData(result.companies);
        setCompanyName("");
        setShowAddForm(false);
    }

    {/** Edit Company */}
    function handleEditCompany() {
        const result = editCompany(companyData, selectedCompany.name, editingCompany.name);
        if (result.error) {
            alert(result.error);
            return;
        }
        setCompanyData(result.companies);
        setSelectedCompany({...selectedCompany, name: editingCompany.name.trim()});
        setEditMode(false);
        setEditingCompany(null);
    }


    return (
        <div className="activity">
            <div className="document-header">
                <div className="document-action">
                    <input type="text" placeholder="Search Company" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                {/** Button Add Company/Edit Company/Delete Company/Deactivate Company */}
                <div className="document-buttons">
                    <button className="btn-upload" onClick={() => setShowAddForm(true)}>Add Company</button>
                    <button className="btn-edit" onClick={() => {
                        if (!selectedCompany) {
                            alert("Pilih company terlebih dahulu");
                            return;
                        }
                        setEditingCompany({ ...selectedCompany });
                        setEditMode(true);
                    }}>Edit Company</button>
                    <button className="btn-cancel" onClick={() => {
                        if (!selectedCompany) {
                            alert("Pilih company terlebih dahulu");
                            return;
                        }
                        if (window.confirm(`Yakin ingin menghapus ${selectedCompany.name}?`)) {
                            setCompanyData(deleteCompany(companyData, selectedCompany.name));
                            setSelectedCompany(null);
                        }
                    }}>Delete Company</button>
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
            <table className="document-table">
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

            {/* add form */}
            {showAddForm && (
                <div className="edit-user-form">
                    <h3>Add Company</h3>
                    <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    <div className="form-buttons">
                        <button className="btn-upload" onClick={handleAddCompany}>Save</button>
                        <button className="btn-cancel" onClick={() => setShowAddForm(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* edit form */}
            {editMode && (
                <div className="edit-user-form">
                    <h3>Edit Company</h3>
                    <label>Company Name</label>
                    <input type="text" value={editingCompany.name} onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })} />
                    <div className="form-buttons">
                        <button className="btn-upload" onClick={handleEditCompany}>Save</button>
                        <button className="btn-cancel" onClick={() => { setEditMode(false); setEditingCompany(null); }}>Cancel</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Company;