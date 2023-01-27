import React from "react";

const EditImageMenu = ({
  handleViewClick,
  handleUpload,
  inputName,
  btnClass,
}: EditImageMenuProps) => {
  const hiddenFileInput = React.useRef<any>(null);

  const handleUploadImageClick = () => {
    if (hiddenFileInput?.current instanceof HTMLInputElement) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <div className="cover">
      <button className={btnClass} onClick={handleViewClick}>
        view photo
      </button>
      <label htmlFor={inputName}>
        <button className={btnClass} onClick={handleUploadImageClick}>
          upload a photo
        </button>
      </label>
      <input
        name={inputName}
        ref={hiddenFileInput}
        type="file"
        className="hidden"
        onChange={(e) => handleUpload(e)}
      />
    </div>
  );
};

export default EditImageMenu;

interface EditImageMenuProps {
  handleUpload: (e?: React.ChangeEvent) => void;
  handleViewClick: () => void;
  inputName: string;
  btnClass: string;
}
