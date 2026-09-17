import { documents, useDocumentSearch, useDocumentFilter, filterDocuments, useDocumentPagination } from "../logic/documentLogic";
import { currentUser, documentPermissions } from "../logic/roleLogic";

function Document() {

    const permissions = documentPermissions(currentUser.role);
    const { search, setSearch } = useDocumentSearch();
    const { typeFilter, setTypeFilter, companyFilter, setCompanyFilter } = useDocumentFilter();
    const filteredDocuments = filterDocuments(documents, search, typeFilter, companyFilter);
    const { currentPage, setCurrentPage, paginationDocuments, totalPages } = useDocumentPagination(filteredDocuments);


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
                </div>
                <div className="document-buttons">
                    {permissions.canUpload && (<button className="btn-upload">Upload</button>)}
                    {permissions.canEdit && (<button className="btn-edit">Edit</button>)}
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
                            <tr key={doc.number}>
                                <td>{doc.number}</td>
                                <td>{doc.title}</td>
                                <td>{doc.type}</td>
                                <td>{doc.owner}</td>
                                <td>{doc.createdAt}</td>
                                <td>{doc.updatedAt}</td>
                                <td>
                                    {permissions.canEdit && doc.permissions?.edit && (<button className="btn-edit">Edit</button>)}
                                    {permissions.canDelete && doc.permissions?.delete && (<button className="btn-delete">Delete</button>)}
                                    {permissions.canDownload && (<button className="btn-download">Download</button>)}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
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