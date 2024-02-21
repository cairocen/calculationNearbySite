import React from 'react';

const FileUpload = ({ handleFileChange }) => {
  return (
    <div>
      <h2>Cargar archivo CSV</h2>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;