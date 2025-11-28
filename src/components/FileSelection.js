import { useState, useRef } from "react";

export default function MultiDocumentUpload() {
  const [files, setFiles] = useState([]); 
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const dropRef = useRef();

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files);
    prepareSelection(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    prepareSelection(droppedFiles);
    dropRef.current.classList.remove("border-blue-400");
  };

  
  const prepareSelection = (incomingFiles) => {
    const newSelections = incomingFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: file.type.startsWith("image") ? URL.createObjectURL(file) : null,
    }));

    setSelectedFiles(newSelections);
  };

  const cancelSelection = () => {
    setSelectedFiles([]);
  };


  const addDocuments = () => {
    setFiles((prev) => [...prev, ...selectedFiles]);
    setSelectedFiles([]);
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };


  let inputValue = "";
  if (selectedFiles.length === 1) {
    inputValue = selectedFiles[0].file.name;
  } else if (selectedFiles.length > 1) {
    inputValue = `${selectedFiles.length} files selected`;
  }

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-xl shadow-sm bg-white w-[50vw]">
      <h2 className="text-lg font-semibold mb-4">Add Documents</h2>

      {/*---------------- Document Title/Input --------------------------*/}
      <label className="block text-sm font-medium mb-1">Document Title</label>
      <input
        value={inputValue}
        className="w-full border px-3 py-2 rounded-lg mb-4 outline-none focus:border-blue-500"
        placeholder="document title"
        disabled={true}
      />

      {/*-------------------- Upload area ------------------------------*/}
      <div className="flex items-center gap-4 mb-3">
        <label className="flex-1 flex items-center justify-center bg-green-500 text-white font-medium py-3 rounded-xl cursor-pointer hover:bg-green-600">
          Browse
          <input type="file" multiple className="hidden" onChange={handleFileSelect} />
        </label>

        <span className="font-semibold text-gray-500">OR</span>

        {/* Drag-and-drop */}
        <div
          ref={dropRef}
          onDragOver={(e) => {
            e.preventDefault();
            dropRef.current.classList.add("border-blue-400");
          }}
          onDragLeave={() => dropRef.current.classList.remove("border-blue-400")}
          onDrop={handleDrop}
          className="flex-1 border-2 border-dashed border-gray-300 rounded-xl p-3 text-center cursor-pointer text-sm text-gray-500 hover:border-blue-400 transition-all"
        >
          Drag and Drop file here
        </div>
      </div>

      {/* -------------------Buttons------------------------------------ */}
      <div className="flex justify-end gap-3 my-4">
        <button
          onClick={cancelSelection}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>

        <button
          onClick={addDocuments}
          disabled={selectedFiles.length === 0}
          className={`px-4 py-2 rounded-lg text-white ${
            selectedFiles.length === 0
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Add Document
        </button>
      </div>

      {/* ----------------------------Final File List -------------------*/}
      {files.length > 0 && (
        <div className="mt-4">
          {files.map(({ id, file, preview }) => (
            <div
              key={id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-2"
            >
              <div className="flex items-center gap-3">
                {preview ? (
                  <img src={preview} alt="preview" className="w-10 h-10 rounded object-cover" />
                ) : (
                  <span className="text-2xl">📄</span>
                )}

                <p className="text-sm font-medium">{file.name}</p>
              </div>

              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => removeFile(id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
