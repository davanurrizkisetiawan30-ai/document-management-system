import { useState } from "react";

export function useDocumentSearch() {
    const [search, setSearch] = useState("");
    return { search, setSearch };
}

export function generatorDocumentNumber(documents, prefix = "DOC") {
    const nextNumber = documents.length + 1;
    return `${prefix}-${String(nextNumber).padStart(3, "0")}`;
}

export const documents = [
    {
        number: "DOC-001",
        title: "SOP Pengajuan Cuti Karyawan",
        type: "SOP",
        owner: "Budiono",
        company: "Company A",
        documentDate: "7-Sept-2026",
        status: "Inactive",
        createdAt: "7-Sept-2026, 10.10",
        updatedAt: "7-Sept-2026, 10.10",
        Permissions:{
            edit: true,
            delete: true,
        }
    },
    {
        number: "DOC-002",
        title: "Surat Perjanjian Kerja Karyawan",
        type: "Kontrak",
        owner: "Ahmad",
        company: "Company A",
        documentDate: "6-Sept-2026",
        status: "Active",
        createdAt: "6-Sept-2026, 12.30",
        updatedAt: "6-Sept-2026, 12.30",
        Permissions:{
            edit: true,
            delete: true,
        }
    },
    {
        number: "DOC-003",
        title: "Laporan Kehadiran Karyawan",
        type: "Laporan",
        owner: "Farez",
        company: "Company B",
        documentDate: "5-Sept-2026",
        status: "Inactive",
        createdAt: "5-Sept-2026, 14.00",
        updatedAt: "5-Sept-2026, 14.00",
        Permissions:{
            edit: true,
            delete: true,
        }
    },
    {
        number: "DOC-004",
        title: "Data Karyawan Perusahaan",
        type: "Data",
        owner: "Dava Nur R S",
        company: "Company B",
        documentDate: "4-Sept-2026",
        status: "Active",
        createdAt: "4-Sept-2026, 10.00",
        updatedAt: "4-Sept-2026, 10.00",
        Permissions:{
            edit: true,
            delete: true,
        }
    }
];

export function useDocumentFilter() {
    const [companyFilter, setCompanyFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    return { typeFilter, setTypeFilter, companyFilter, setCompanyFilter, statusFilter, setStatusFilter };
}

export function filterDocuments(documents, search, typeFilter, companyFilter, statusFilter) {
    return documents.filter((doc) =>
        (
            doc.number.toLowerCase().includes(search.toLowerCase()) ||
            doc.title.toLowerCase().includes(search.toLowerCase()) ||
            doc.type.toLowerCase().includes(search.toLowerCase()) ||
            doc.owner.toLowerCase().includes(search.toLowerCase()) ||
            doc.company.toLowerCase().includes(search.toLowerCase()) ||
            doc.documentDate.toLowerCase().includes(search.toLowerCase()) ||
            doc.status.toLowerCase().includes(search.toLowerCase()) ||
            doc.createdAt.toLowerCase().includes(search.toLowerCase()) ||
            doc.updatedAt.toLowerCase().includes(search.toLowerCase())
        ) && 
        (typeFilter === "" || doc.type === typeFilter) &&
        (companyFilter === "" || doc.company === companyFilter) &&
        (statusFilter === "" || doc.status === statusFilter)
    );
}


export function useDocumentPagination(documents) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginationDocuments = documents.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(documents.length / itemsPerPage);
    return { currentPage, setCurrentPage, paginationDocuments, totalPages };
}

export function useDocumentUpload() {
    const [showUploadForm, setShowUploadForm] = useState(false);
    return {
        showUploadForm,
        setShowUploadForm
    };
}

export function useUploadForm() {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        type: "",
        description: "",
        documentDate: "",
        file: null
    });
    return {
        formData,
        setFormData
    };
}

export function uploadDocument(formData, documents) {
    const documentNumber = generatorDocumentNumber(documents);
    const newDocument = {
        number: documentNumber,
        title: formData.title,
        company: formData.company,
        type: formData.type,
        description: formData.description,
        documentDate: formData.documentDate,
        file: formData.file
    };
    return [...documents, newDocument];
}