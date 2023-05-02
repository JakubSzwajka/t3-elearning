// components/FileUploadForm.tsx
import { useState } from "react";

const FileUploadForm = () => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file as Blob);

    await fetch("/api/files/upload", {
      method: "POST",
      body: formData,
    });

    setUploading(false);
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => void handleFileUpload(e)}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default FileUploadForm;
