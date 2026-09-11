import { documents, filterDocuments, useHomeSearch } from "../logic/homeLogic";

function Home() {

    const { search, setSearch } = useHomeSearch();
    const filteredDocuments = filterDocuments(documents, search);

    return (
        <div className="home">
            <div className="dashboard-top">
                <div className="dashboard-cards">
                    <div className="card">
                        <p>10</p>
                        <h3>Total Documents</h3>
                    </div>

                    <div className="card">
                        <p>12</p>
                        <h3>User</h3>
                    </div>

                    <div className="card">
                        <p>7</p>
                        <h3>Document Type</h3>
                    </div>

                    <div className="card">
                        <p>13</p>
                        <h3>Activity</h3>
                    </div>
                </div>
                <input type="text" placeholder="search" className="search" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="activity">
                <h2>New Activity</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Document Number</th>
                            <th>Title</th>
                            <th>Document Type</th>
                            <th>Owner/Created By</th>
                            <th>Created At</th>
                            <th>Update At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDocuments.map((doc, index) => (
                            <tr key={index}>
                                <td>{doc.number}</td>
                                <td>{doc.title}</td>
                                <td>{doc.type}</td>
                                <td>{doc.owner}</td>
                                <td>{doc.createdAt}</td>
                                <td>{doc.updatedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;