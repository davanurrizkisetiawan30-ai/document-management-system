import { useState } from "react";

function Home() {

    const [search, setSearch] = useState("");

    const documents = [
    {
        number: "DOC-001",
        title: "SOP Pengajuan Cuti Karyawan",
        type: "SOP",
        owner: "Budiono",
        createdAt: "7-Sept-2026, 10.10",
        updatedAt: "7-Sept-2026, 10.10"
    },
    {
        number: "DOC-002",
        title: "Surat Perjanjian Kerja Karyawan",
        type: "Kontrak",
        owner: "Ahmad",
        createdAt: "6-Sept-2026, 12.30",
        updatedAt: "6-Sept-2026, 12.30"
    },
    {
        number: "DOC-003",
        title: "Laporan Kehadiran Karyawan",
        type: "Laporan",
        owner: "Farez",
        createdAt: "5-Sept-2026, 14.00",
        updatedAt: "5-Sept-2026, 14.00"
    }
];

    const filteredDocuments = documents.filter((doc) =>
        doc.number.toLowerCase().includes(search.toLowerCase()) ||
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.type.toLowerCase().includes(search.toLowerCase()) ||
        doc.owner.toLowerCase().includes(search.toLowerCase()) 
    );

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