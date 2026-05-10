import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import axios from "axios";
import { useAuth } from '@clerk/react';
import { apiEndpoints } from "../util/apiEndpoints.js";

const FilePreviewModal = ({ isOpen, onClose, file }) => {
    const [blobUrl, setBlobUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getToken } = useAuth();

    useEffect(() => {
        if (!isOpen || !file) {
            setBlobUrl(null);
            setError(null);
            return;
        }

        const fetchPreview = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = await getToken();
                const response = await axios.get(apiEndpoints.DOWNLOAD_FILE(file.id), {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: 'blob'
                });
                
                const url = window.URL.createObjectURL(new Blob([response.data], { type: response.data.type || getContentType(file.name) }));
                setBlobUrl(url);
            } catch (err) {
                console.error("Error fetching preview:", err);
                setError("Could not load preview for this file.");
            } finally {
                setLoading(false);
            }
        };

        fetchPreview();

        return () => {
            if (blobUrl) {
                window.URL.revokeObjectURL(blobUrl);
            }
        };
    }, [isOpen, file, getToken]);

    // Clean up url when modal closes
    useEffect(() => {
        if (!isOpen && blobUrl) {
            window.URL.revokeObjectURL(blobUrl);
            setBlobUrl(null);
        }
    }, [isOpen, blobUrl]);

    const getContentType = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg'].includes(ext)) return 'image/jpeg';
        if (ext === 'png') return 'image/png';
        if (ext === 'gif') return 'image/gif';
        if (ext === 'webp') return 'image/webp';
        if (ext === 'svg') return 'image/svg+xml';
        if (ext === 'pdf') return 'application/pdf';
        if (['mp4', 'webm', 'ogg'].includes(ext)) return `video/${ext}`;
        if (['mp3', 'wav'].includes(ext)) return `audio/${ext === 'mp3' ? 'mpeg' : ext}`;
        if (['txt', 'md', 'csv'].includes(ext)) return 'text/plain';
        return 'application/octet-stream';
    };

    if (!isOpen || !file) return null;

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 size={40} className="text-purple-500 animate-spin mb-4" />
                    <p className="text-gray-500">Loading preview...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <p className="text-red-500 mb-2">{error}</p>
                    <p className="text-sm text-gray-500">Try downloading the file instead.</p>
                </div>
            );
        }

        if (!blobUrl) return null;

        const ext = file.name.split('.').pop().toLowerCase();

        if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) {
            return <img src={blobUrl} alt={file.name} className="max-w-full max-h-[70vh] object-contain rounded" />;
        }

        if (['mp4', 'webm', 'ogg'].includes(ext)) {
            return <video src={blobUrl} controls autoPlay className="max-w-full max-h-[70vh] rounded" />;
        }

        if (['mp3', 'wav', 'ogg'].includes(ext)) {
            return (
                <div className="w-full flex items-center justify-center p-8 bg-gray-50 rounded-xl">
                    <audio src={blobUrl} controls className="w-full max-w-md" />
                </div>
            );
        }

        if (['pdf', 'txt', 'md'].includes(ext)) {
            return <iframe src={blobUrl} className="w-full h-[70vh] rounded border-none" title={file.name} />;
        }

        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-gray-600 mb-2">No preview available for this file type.</p>
                <p className="text-sm text-gray-500">Please download the file to view its contents.</p>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-800">
                    <h3 className="font-semibold text-gray-800 dark:text-slate-200 truncate pr-4">{file.name}</h3>
                    <button 
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-4 overflow-auto flex items-center justify-center bg-gray-50 dark:bg-slate-950/50 min-h-[50vh]">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default FilePreviewModal;
