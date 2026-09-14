import { documents, useDocumentSearch, filterDocuments, useDocumentPagination } from "../logic/documentLogic";

function Document() {

    const { search, setSearch } = useDocumentSearch();
    const filteredDocuments = filterDocuments(documents, search);
    const { currentPage, setCurrentPage, paginationDocuments, totalPages } = useDocumentPagination(filteredDocuments);


    return (
        <div className="activity">
            <div className="document-header">
                <div className="document-action">
                    <input type="text" placeholder="Search Document" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button className="btn-upload">Upload</button>
                    <button className="btn-edit">Edit</button>
                    <button className="btn-delete">Delete</button>
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
                                    <button className="btn-download">Download</button>
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