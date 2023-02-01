import React, { RefObject } from "react";
import { ReactSVG } from "react-svg";

const EditImageBlock = ({
  handleViewClick,
  handleUpload,
  handleOpen,
  open,
  inputName,
  btnClass,
  iconClass,
  svgClass
}: EditImageMenuProps) => {
  const hiddenFileInput = React.useRef<any>(null);

  const handleUploadImageClick = () => {
    if (hiddenFileInput?.current instanceof HTMLInputElement) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <>
      <div className={iconClass} onClick={(e) => handleOpen(e)}>
        <ReactSVG src="/edit.svg" className={svgClass} />
      </div>
      {open?.current?.alt === inputName && (
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
      )}
    </>
  );
};

export default EditImageBlock;

interface EditImageMenuProps {
  handleUpload: (e?: React.ChangeEvent) => void;
  handleViewClick: () => void;
  handleOpen: (e?: React.MouseEvent<HTMLDivElement>) => void;
  open: RefObject<HTMLImageElement> | undefined | null;
  inputName: string;
  btnClass: string;
  iconClass: string;
  svgClass: string;
}
