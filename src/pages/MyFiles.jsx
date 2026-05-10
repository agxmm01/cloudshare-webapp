import DashboardLayout from "../layout/DashboardLayout.jsx";
import { useEffect, useState } from "react";
import { File, FileIcon, FileText, Grid, Image, List, Music, Search, Video, X as XIcon } from "lucide-react";
import { useAuth } from '@clerk/react';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FileCard from "../components/FileCard.jsx";
import { apiEndpoints } from "../util/apiEndpoints.js";
import ConfirmationDialog from "../components/ConfirmationDialog.jsx";
import LinkShareModal from "../components/LinkShareModal.jsx";
import FileListRow from "../components/FileListRow.jsx";
import { CardSkeleton, RowSkeleton } from "../components/Skeletons.jsx";
import FilePreviewModal from "../components/FilePreviewModal.jsx";

const MyFiles = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("list");
    const { getToken, isSignedIn } = useAuth();
    const navigate = useNavigate();
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        isOpen: false,
        fileId: null
    });
    const [shareModal, setShareModal] = useState({
        isOpen: false,
        fileId: null,
        link: ""
    });
    const [previewModal, setPreviewModal] = useState({
        isOpen: false,
        file: null
    });
    const [isDragging, setIsDragging] = useState(false);
    const [uploadingFiles, setUploadingFiles] = useState(false);

    //fetching the files for a logged in user
    const fetchFiles = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            console.log(token);
            const response = await axios.get(apiEndpoints.FETCH_FILES, { headers: { Authorization: `Bearer ${token}` } });
            if (response.status === 200) {
                setFiles(response.data);
            }
        } catch (error) {
            console.error('Error fetching the files from server: ', error);
            toast.error('Error fetching the files from server: ', error.message);
        } finally {
            setLoading(false);
        }
    }

    //Toggles the public/private status of a file
    const togglePublic = async (fileToUpdate) => {
        try {
            const token = await getToken();
            await axios.patch(apiEndpoints.TOGGLE_FILE(fileToUpdate.id), {}, { headers: { Authorization: `Bearer ${token}` } });
            console.log('data', fileToUpdate);
            setFiles(files.map((file) => file.id === fileToUpdate.id ? { ...file, isPublic: !file.isPublic } : file));
        } catch (error) {
            console.error('Error toggling file status', error);
            toast.error('Error toggling file status: ', error.message);
        }
    }

    //Handle file download
    const handleDownload = async (file) => {
        try {
            const token = await getToken();
            const response = await axios.get(apiEndpoints.DOWNLOAD_FILE(file.id), { headers: { Authorization: `Bearer ${token}` }, responseType: 'blob' });

            // create a blob url and trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", file.name);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url); // clean up the object url
        } catch (error) {
            console.error('Download failed', error);
            toast.error('Error downloading file', error.message);
        }
    }

    //Closes the delete confirmation modal
    const closeDeleteConfirmation = () => {
        setDeleteConfirmation({
            isOpen: false,
            fileId: null
        })
    }

    //Opens the delete confirmation modal
    const openDeleteConfirmation = (fileId) => {
        setDeleteConfirmation({
            isOpen: true,
            fileId
        })
    }

    //opens the share link modal
    const openShareModal = (fileId) => {
        const link = `${window.location.origin}/file/${fileId}`;
        setShareModal({
            isOpen: true,
            fileId,
            link
        });
    }

    //close the share link modal
    const closeShareModal = () => {
        setShareModal({
            isOpen: false,
            fileId: null,
            link: ""
        });
    }

    //Delete a file after confirmation
    const handleDelete = async () => {
        const fileId = deleteConfirmation.fileId;
        if (!fileId) return;

        try {
            const token = await getToken();
            const response = await axios.delete(apiEndpoints.DELETE_FILE(fileId), { headers: { Authorization: `Bearer ${token}` } });
            if (response.status === 204) {
                setFiles(files.filter((file) => file.id !== fileId));
                closeDeleteConfirmation();
            } else {
                toast.error('Error deleting file');
            }
        } catch (error) {
            console.error('Error deleting file', error);
            toast.error('Error deleting file', error.message);
        }
    }

    const handlePreview = (file) => {
        setPreviewModal({
            isOpen: true,
            file
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setIsDragging(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length === 0) return;

        if (droppedFiles.length > 5) {
            toast.error("You can only upload a maximum of 5 files at once.");
            return;
        }

        setUploadingFiles(true);
        const toastId = toast.loading(`Uploading ${droppedFiles.length} file(s)...`);

        const formData = new FormData();
        droppedFiles.forEach(file => formData.append('files', file));

        try {
            const token = await getToken();
            await axios.post(apiEndpoints.UPLOAD_FILE, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Files uploaded successfully!', { id: toastId });
            fetchFiles(); 
        } catch (error) {
            console.error('Error uploading files:', error);
            toast.error(error.response?.data?.message || 'Error uploading files. Please try again.', { id: toastId });
        } finally {
            setUploadingFiles(false);
        }
    };

    useEffect(() => {
        if (isSignedIn) {
            fetchFiles();
        }
    }, [getToken, isSignedIn]);

    const getFileIcon = (file) => {
        const extenstion = file.name.split('.').pop().toLowerCase();

        if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extenstion)) {
            return <Image size={24} className="text-purple-500" />
        }

        if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extenstion)) {
            return <Video size={24} className="text-blue-500" />
        }

        if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extenstion)) {
            return <Music size={24} className="text-green-500" />
        }

        if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extenstion)) {
            return <FileText size={24} className="text-amber-500" />
        }

        return <FileIcon size={24} className="text-purple-500" />
    }

    const filteredFiles = files.filter((f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout activeMenu="My Files">
            <div 
                className={`relative min-h-[80vh] transition-colors duration-200 ${isDragging ? 'bg-purple-50/50 dark:bg-purple-900/10' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Drag Overlay */}
                {isDragging && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-purple-100/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 border-dashed border-purple-400 rounded-2xl">
                        <div className="flex flex-col items-center justify-center text-purple-600 dark:text-purple-400 pointer-events-none">
                            <File size={64} className="mb-4 animate-bounce" />
                            <h2 className="text-2xl font-bold">Drop files to upload</h2>
                            <p className="mt-2 text-sm opacity-80">Maximum 5 files at once</p>
                        </div>
                    </div>
                )}

                {/* ── Header ───────────────────────── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">My Files</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                            {filteredFiles.length} of {files.length} file{files.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Search bar */}
                        <div className="relative">
                            <Search
                                size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400 pointer-events-none"
                            />
                            <input
                                type="text"
                                placeholder="Search files…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-52 sm:w-64 pl-9 pr-8 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 dark:focus:border-purple-500 transition-all duration-200 shadow-sm"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-600 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-700 dark:text-slate-300 transition-colors"
                                >
                                    <XIcon size={14} />
                                </button>
                            )}
                        </div>

                        {/* View toggles */}
                        <div className="flex items-center gap-1 p-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-1.5 rounded-md transition-colors ${
                                    viewMode === 'list'
                                        ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-700 dark:text-slate-300'
                                }`}
                            >
                                <List size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-1.5 rounded-md transition-colors ${
                                    viewMode === 'grid'
                                        ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-700 dark:text-slate-300'
                                }`}
                            >
                                <Grid size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {loading ? (
                    viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <CardSkeleton key={i} />)}
                        </div>
                    ) : (
                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                            <table className="min-w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sharing</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {[1, 2, 3, 4, 5].map(i => <RowSkeleton key={i} />)}
                                </tbody>
                            </table>
                        </div>
                    )
                ) : files.length === 0 ? (
                    <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                        <File size={52} className="text-purple-300 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No files uploaded yet</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6 text-sm">
                            Start uploading files to see them here. You can upload documents, images, and more.
                        </p>
                        <button onClick={() => navigate('/upload')} className="btn-primary">
                            Go to Upload
                        </button>
                    </div>
                ) : filteredFiles.length === 0 ? (
                    <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                        <Search size={48} className="text-purple-300 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No files found</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                            No files match <span className="font-medium text-purple-600">"{searchQuery}"</span>. Try a different name.
                        </p>
                        <button onClick={() => setSearchQuery("")} className="btn-outline text-sm px-5 py-2">
                            Clear search
                        </button>
                    </div>
                ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredFiles.map((file) => (
                            <FileCard
                                key={file.id}
                                file={file}
                                onDelete={openDeleteConfirmation}
                                onTogglePublic={togglePublic}
                                onDownload={handleDownload}
                                onShareLink={openShareModal}
                                onPreview={handlePreview}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sharing</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredFiles.map((file) => (
                                    <FileListRow
                                        key={file.id}
                                        file={file}
                                        onDownload={handleDownload}
                                        onDelete={openDeleteConfirmation}
                                        onTogglePublic={togglePublic}
                                        onShareLink={openShareModal}
                                        getFileIcon={getFileIcon}
                                        onPreview={handlePreview}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {/* Delete confiramtion dialog*/}
                <ConfirmationDialog
                    isOpen={deleteConfirmation.isOpen}
                    onClose={closeDeleteConfirmation}
                    title="Delete File"
                    message="Are you sure want to delete this file? This action cannot be undone."
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={handleDelete}
                    confirmButtonClass="bg-red-600 hover:bg-red-700"
                />

                {/* Share link modal */}
                <LinkShareModal
                    isOpen={shareModal.isOpen}
                    onClose={closeShareModal}
                    link={shareModal.link}
                    title="Share File"
                />

                <FilePreviewModal
                    isOpen={previewModal.isOpen}
                    onClose={() => setPreviewModal({ isOpen: false, file: null })}
                    file={previewModal.file}
                />
            </div>
        </DashboardLayout>
    )
}

export default MyFiles;