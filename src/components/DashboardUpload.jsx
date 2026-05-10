import { ArrowUpFromLine, X, FileIcon, Loader2 } from 'lucide-react';
import { useRef } from 'react';

const DashboardUpload = ({ files, onFileChange, onUpload, uploading, onRemoveFile, remainingUploads }) => {
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
            const mockEvent = {
                target: {
                    files: droppedFiles
                }
            };
            onFileChange(mockEvent);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
        else return (bytes / 1048576).toFixed(2) + ' MB';
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <ArrowUpFromLine className="text-purple-500" size={18} />
                    <h2 className="text-base font-medium text-slate-900 dark:text-slate-100">Upload Files</h2>
                </div>
                <div className="text-xs text-slate-900 dark:text-slate-100">
                    {remainingUploads} of 5 files remaining
                </div>
            </div>

            <div
                className="border-dashed border-2 border-gray-300 dark:border-slate-700 rounded-lg p-6 text-center bg-white dark:bg-slate-800 cursor-pointer hover:border-purple-500 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
            >
                <div className="flex flex-col items-center justify-center">
                    <div className="p-2 rounded-full bg-purple-50 dark:bg-purple-900/20 mb-3">
                        <ArrowUpFromLine size={20} className="text-purple-500" />
                    </div>
                    <p className="text-slate-900 dark:text-slate-100 text-sm mb-1">Drag and drop files here</p>
                    <p className="text-slate-900 dark:text-slate-100 text-xs">or click to browse</p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={onFileChange}
                        className="hidden"
                        accept="*/*"
                        max={5}
                    />
                </div>
            </div>

            {files.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-xs font-medium mb-2 text-slate-900 dark:text-slate-100">Selected Files ({files.length})</h3>
                    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border-b dark:border-slate-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                <div className="flex items-center gap-2">
                                    <FileIcon size={16} className="text-purple-500" />
                                    <div>
                                        <p className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate max-w-[150px]">{file.name}</p>
                                        <p className="text-xs text-slate-900 dark:text-slate-100">{formatFileSize(file.size)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemoveFile(index);
                                    }}
                                    className="text-slate-900 dark:text-slate-100 hover:text-red-500 transition-colors"
                                    disabled={uploading}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {files.length > 0 && (
                <div className="mt-3">
                    <button
                        onClick={onUpload}
                        disabled={uploading || files.length === 0}
                        className="w-full py-2 bg-purple-500 text-white text-sm rounded-md hover:bg-purple-600 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
                    >
                        {uploading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                <span>Uploading...</span>
                            </>
                        ) : (
                            <span>Upload {files.length} File(s)</span>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default DashboardUpload;