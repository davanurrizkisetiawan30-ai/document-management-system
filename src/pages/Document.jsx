import { 
    documents, 
    useDocumentSearch, 
    useDocumentFilter, 
    filterDocuments, 
    useDocumentPagination, 
    useDocumentUpload, 
    useUploadForm, 
    uploadDocument, 
    useDocumentData, 
    validateuploadForm, 
    editDocument } from "../logic/documentLogic";
import { useState } from "react";
import { currentUser, documentPermissions } from "../logic/roleLogic";

function Document() {
    
    const permissions = documentPermissions(currentUser.role);
    const { search, setSearch } = useDocumentSearch();
    const { documentData, setDocumentData } = useDocumentData();
    const { typeFilter, setTypeFilter, companyFilter, setCompanyFilter, statusFilter, setStatusFilter } = useDocumentFilter();
    const filteredDocuments = filterDocuments(documentData, search, typeFilter, companyFilter, statusFilter);
    const { currentPage, setCurrentPage, paginationDocuments, totalPages } = useDocumentPagination(filteredDocuments);
    const { showUploadForm, setShowUploadForm} = useDocumentUpload();
    const { formData, setFormData, resetForm } = useUploadForm();
    const [ editMode, setEditMode ] = useState(false);
    const [ editingDocument, setEditingDocument ] = useState(null);
    const [ selectedDocument, setSelectedDocument ] = useState(null);


    return (
        <div className="activity">
            <div className="document-header">
                <div className="document-action">
                    <input type="text" placeholder="Search Document" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="">All Document Type</option>
                        <option value="SOP">SOP</option>
                        <option value="Kontrak">Kontrak</option>
                        <option value="Laporan">Laporan</option>
                        <option value="Data">Data</option>
                    </select>
                    <select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)}>
                        <option value="">All Company</option>
                        <option value="Company A">Company A</option>
                        <option value="Company B">Company B</option>
                    </select>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div className="document-buttons">
                    {permissions.canUpload && (<button className="btn-upload" onClick={() => setShowUploadForm(true)}>Upload</button>)}
                    {permissions.canEdit && (<button className="btn-edit" onClick={() => {
                        if (!selectedDocument) {
                            alert("Pilih dokumen terlebih dahulu");
                            return;
                        }
                        setEditMode(true);
                        setEditingDocument(selectedDocument);
                    }}>Edit</button>)}
                    {permissions.canDelete && (<button className="btn-delete">Delete</button>)}
                </div>
            </div>
            <table className="document-table">
                <thead>
                    <tr>
                        <th>Document Number</th>
                        <th>Title</th>
                        <th>Document Type</th>
                        <th>Owner/Created By</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                        {paginationDocuments.map((doc) => (
                            <tr key={doc.number} onClick={() => setSelectedDocument(doc)} className={selectedDocument === doc ? "selected-row" : ""}>
                                <td>{doc.number}</td>
                                <td>{doc.title}</td>
                                <td>{doc.type}</td>
                                <td>{doc.owner}</td>
                                <td>{doc.createdAt}</td>
                                <td>{doc.updatedAt}</td>
                                <td>
                                    {permissions.canDownload && (<button className="btn-download">Download</button>)}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {showUploadForm && (
                <div className="upload-form">
                    <h3>Upload Document</h3>
                    <label>Title</label>
                        <input type="text" placeholder="Masukkan Judul Document" value={formData.title} onChange={(e) => 
                        setFormData({...formData,title: e.target.value})} />
                    <label>Company</label>
                    <select value={formData.company} onChange={(e) => 
                        setFormData({...formData,company: e.target.value})
                    }>
                        <option value="">Pilih Company</option>
                        <option value="Company A">Company A</option>
                        <option value="Company B">Company B</option>
                    </select>
                    <label>Document Type</label>
                    <select value={formData.type} onChange={(e) => 
                        setFormData({...formData,type: e.target.value})
                    }>
                        <option value="">Pilih Document Type</option>
                        <option value="SOP">SOP</option>
                        <option value="Kontrak">Kontrak</option>
                        <option value="Laporan">Laporan</option>
                        <option value="Data">Data</option>
                    </select>
                    <label>Description</label>
                    <textarea placeholder="Masukkan deskripsi dokumen" value={formData.description} onChange={(e) => 
                        setFormData({...formData,description: e.target.value})}></textarea>
                    <label>Document Date</label>
                    <input type="date" value={formData.documentDate} onChange={(e) => 
                        setFormData({...formData,documentDate: e.target.value})} />
                    <label>Document File</label>
                    <input type="file" onChange={(e) => setFormData({...formData,file: e.target.files[0]})}/>
                    <div className="form-buttons">
                        <button className="btn-upload" onClick={() => {
                            const error = validateuploadForm(formData);
                            if (error) {
                                alert(error);
                                return;
                            }
                            const newDocuments = uploadDocument(formData, documentData, currentUser);
                            setDocumentData(newDocuments);
                            resetForm();
                            setShowUploadForm(false);
                        }}>Upload</button>
                        <button className="btn-cancel" onClick={() => {resetForm(); setShowUploadForm(false);}}>Cancel</button>
                    </div>
                </div>
            )}

            {editMode && editingDocument && (
                <div className="upload-form">
                    <h3>Edit Document</h3>
                    <label>Title</label>
                    <input type="text" value={editDocument.title} onChange={(e) => setEditDocument({...editDocument, title: e.target.value})} />
                    <label>Document Type</label>
                    <select name="documentType" id="documentType" value={editingDocument.type} onChange={(e) => setEditingDocument({...editingDocument, type: e.target.value})}>
                        <option value="">Pilih Document Type</option>
                        <option value="SOP">SOP</option>
                        <option value="Kontrak">Kontrak</option>
                        <option value="Laporan">Laporan</option>
                        <option value="Data">Data</option>
                    </select>
                    <label>Description</label>
                    <textarea value={editDocument.description || ""} onChange={(e) => setEditDocument({...editDocument, description: e.target.value})}></textarea>
                    <div className="form-buttons">
                        <button className="btn-edit" onClick={() => {
                            const updatedDocuments = editDocument(documentData, editingDocument.number,{
                                title: editDocument.title,
                                type: editingDocument.type,
                                description: editDocument.description
                            });
                            setDocumentData(updatedDocuments);
                            setEditMode(false);
                            setEditingDocument(null);
                        }}>Save</button>
                        <button className="btn-cancel" onClick={() => {
                            setEditMode(false);
                            setEditingDocument(null);
                        }}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} className={currentPage === index + 1 ? "active" : ""} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Document;