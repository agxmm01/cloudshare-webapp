import DashboardLayout from "../layout/DashboardLayout.jsx";
import { useAuth } from '@clerk/react';
import { useContext, useEffect, useState } from "react";
import { UserCreditsContext } from "../context/UserCreditsContext.jsx";
import axios from "axios";
import { apiEndpoints } from "../util/apiEndpoints.js";
import { Loader2 } from "lucide-react";
import DashboardUpload from "../components/DashboardUpload.jsx";
import RecentFiles from "../components/RecentFiles.jsx";
import { RowSkeleton } from "../components/Skeletons.jsx";

const Dashboard = () => {
    const [files, setFiles] = useState([]);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [remainingUploads, setRemainingUploads] = useState(5);
    const { getToken } = useAuth();
    const { fetchUserCredits } = useContext(UserCreditsContext);
    const MAX_FILES = 5;

    useEffect(() => {
        const fetchRecentFiles = async () => {
            setLoading(true);
            try {
                const token = await getToken();
                // Use the existing endpoint that we know works
                const res = await axios.get(apiEndpoints.FETCH_FILES, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                // Sort by uploadedAt and take only the 5 most recent files
                const sortedFiles = res.data.sort((a, b) =>
                    new Date(b.uploadedAt) - new Date(a.uploadedAt)
                ).slice(0, 5);
                setFiles(sortedFiles);
            } catch (error) {
                console.error("Error fetching recent files:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecentFiles();
    }, [getToken]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // Check if adding these files would exceed the limit
        if (uploadFiles.length + selectedFiles.length > MAX_FILES) {
            setMessage(`You can only upload a maximum of ${MAX_FILES} files at once.`);
            setMessageType('error');
            return;
        }

        // Add the new files to the existing files
        setUploadFiles(prevFiles => [...prevFiles, ...selectedFiles]);
        setMessage('');
        setMessageType('');
    };

    // Remove a file from the upload list
    const handleRemoveFile = (index) => {
        setUploadFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setMessage('');
        setMessageType('');
    };

    // Calculate remaining uploads
    useEffect(() => {
        setRemainingUploads(MAX_FILES - uploadFiles.length);
    }, [uploadFiles]);

    // Handle file upload
    const handleUpload = async () => {
        if (uploadFiles.length === 0) {
            setMessage('Please select at least one file to upload.');
            setMessageType('error');
            return;
        }

        if (uploadFiles.length > MAX_FILES) {
            setMessage(`You can only upload a maximum of ${MAX_FILES} files at once.`);
            setMessageType('error');
            return;
        }

        setUploading(true);
        setMessage('Uploading files...');
        setMessageType('info');

        const formData = new FormData();
        uploadFiles.forEach(file => formData.append('files', file));

        try {
            const token = await getToken();
            const response = await axios.post(apiEndpoints.UPLOAD_FILE, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage('Files uploaded successfully!');
            setMessageType('success');
            setUploadFiles([]);

            // Refresh the recent files list
            const res = await axios.get(apiEndpoints.FETCH_FILES, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            // Sort by uploadedAt and take only the 5 most recent files
            const sortedFiles = res.data.sort((a, b) =>
                new Date(b.uploadedAt) - new Date(a.uploadedAt)
            ).slice(0, 5);

            setFiles(sortedFiles);

            // Refresh user credits immediately after successful upload
            await fetchUserCredits();
        } catch (error) {
            console.error('Error uploading files:', error);
            setMessage(error.response?.data?.message || 'Error uploading files. Please try again.');
            setMessageType('error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div>
                {/* Page header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">My Drive</h1>
                    <p className="text-slate-900 dark:text-slate-100 mt-1 text-sm">Upload, manage, and share your files securely</p>
                </div>
                {message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${messageType === 'error' ? 'bg-red-50 text-red-700' :
                            messageType === 'success' ? 'bg-green-50 text-green-700' :
                                'bg-purple-50 text-purple-700'
                        }`}>
                        {message}
                    </div>
                )}

                {/* Storage Analytics Overview Removed */}

                <div className="flex flex-col md:flex-row gap-6">
                    {/*Left column*/}
                    <div className="w-full md:w-[40%]">
                        <DashboardUpload
                            files={uploadFiles}
                            onFileChange={handleFileChange}
                            onUpload={handleUpload}
                            uploading={uploading}
                            onRemoveFile={handleRemoveFile}
                            remainingUploads={remainingUploads}
                        />
                    </div>

                    {/*right column*/}
                    <div className="w-full md:w-[60%]">
                        {loading ? (
                            <div className="w-full">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">Recent Files</h2>
                                </div>
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs font-medium text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                                            <tr>
                                                <th className="px-4 py-3 text-left">Name</th>
                                                <th className="px-4 py-3 text-left">Size</th>
                                                <th className="px-4 py-3 text-left">Uploaded by</th>
                                                <th className="px-4 py-3 text-left">Modified</th>
                                                <th className="px-4 py-3 text-left">Sharing</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <RowSkeleton key={i} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <RecentFiles files={files} />
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;