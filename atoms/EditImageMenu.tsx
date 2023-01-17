import React from "react";

const EditImageMenu = ({
  handleView,
  handleUpload,
  inputName,
}: EditImageMenuProps) => {
  const hiddenFileInput = React.useRef<any>(null);

  const handleUploadImageClick = () => {
    if (hiddenFileInput?.current instanceof HTMLInputElement) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <div className="cover">
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

export default EditImageMenu;

interface EditImageMenuProps {
  handleUpload: (e: React.ChangeEvent) => void;
  handleView: (e: any) => void;
  inputName: string;
}
