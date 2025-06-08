import React, { useState } from 'react';
import { uploadFile } from '../utils/api'; // Import fungsi uploadFile
import { FaFileUpload } from 'react-icons/fa';

const UploadSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState(''); // Tambahkan state untuk prompt

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a file.');
      return;
    }

    setIsLoading(true);
    setUploadError(null);
    setUploadResponse(null);

    try {
      const response = await uploadFile(selectedFile, prompt); // Kirim prompt
      setIsLoading(false);

      if (response.error) {
        setUploadError(response.error);
      } else {
        setUploadResponse(response);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError('An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Upload Data</h2>

      <div className="mb-6">
        <label htmlFor="fileInput" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Pilih File:
        </label>
        <div className="flex items-center space-x-4">
          <label
            htmlFor="fileInput"
            className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          >
            <FaFileUpload className="mr-2" />
            Pilih File
          </label>
          <input id="fileInput" type="file" className="hidden" onChange={handleFileChange} />
          {selectedFile && <span className="text-gray-700 dark:text-gray-300">{selectedFile.name}</span>}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="prompt" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Ask AI:
        </label>
        <textarea
          id="prompt"
          className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-500"
          placeholder="Ask AI about your data..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows="4"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={isLoading || !selectedFile}
        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline ${isLoading || !selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>

      {uploadError && <p className="text-red-500 mt-4">{uploadError}</p>}

      {uploadResponse && uploadResponse.message && (
        <div className="mt-8 bg-glassWhite dark:bg-gray-800 bg-opacity-40 dark:bg-opacity-40 rounded-2xl shadow-lg p-6 backdrop-blur-md dark:backdrop-blur-md">
          <p className="text-green-500 dark:text-green-400 font-semibold">{uploadResponse.message}</p>
          {uploadResponse.preview && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Data Preview:</h3>
              <div dangerouslySetInnerHTML={{ __html: uploadResponse.preview }} className="overflow-x-auto rounded-lg shadow-md"></div>
              {uploadResponse.shape && <p className="text-gray-700 dark:text-gray-300 mt-2">Shape: {uploadResponse.shape}</p>}
            </div>
          )}
          {uploadResponse.ask_ai && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Ask AI Response:</h3>
              <p className="text-gray-700 dark:text-gray-300">{uploadResponse.ask_ai}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadSection;