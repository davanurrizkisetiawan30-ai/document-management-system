import { useState } from "react";

export function useHomeSearch() {
    const [search, setSearch] = useState("");
    return { search, setSearch };
}

export const documents = [
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

export function filterDocuments(documents, search) {
    return documents.filter((doc) =>
        doc.number.toLowerCase().includes(search.toLowerCase()) ||
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.type.toLowerCase().includes(search.toLowerCase()) ||
        doc.owner.toLowerCase().includes(search.toLowerCase()) ||
        doc.createdAt.toLowerCase().includes(search.toLowerCase()) ||
        doc.updatedAt.toLowerCase().includes(search.toLowerCase())
    );
}