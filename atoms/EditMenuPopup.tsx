import React from "react";

const EditMenuPopup = ({
  handleView,
  handleUpload,
  handleUploadImageClick,
  hiddenFileInput,
  inputName,
}: EditMenuPopupProps) => {
  return (
    <div className="cover-edit-container">
      <button onClick={handleView} className="cover-edit-btn">
        view photo
      </button>
      <label htmlFor={inputName}>
        <button onClick={handleUploadImageClick} className="cover-edit-btn">
          upload a photo
        </button>
      </label>
      <input
        name={inputName}
        ref={hiddenFileInput}
        type="file"
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
};

export default EditMenuPopup;

interface EditMenuPopupProps {
  handleUploadImageClick: () => void,
  handleUpload: (e: React.ChangeEvent) => void,
  handleView: (e: any) => void,
  hiddenFileInput: any;
  inputName: string;
}
