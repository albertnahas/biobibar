import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { ReactSVG } from "react-svg";

import { Home } from "../types/home";
import fetchHome from "../helpers/fetchHome";
import updateHome from "../helpers/updateHome";
import { uploadImage } from "../helpers/UploadImage";
import EditMenuPopup from "../atoms/EditMenuPopup";

const defaultHome: Home = {
  cover: "",
  slogan: "",
  logo: "",
  logoDark: "",
  cover2: "",
  cover3: "",
};
const EditCoverSection = () => {
  const [home, setHome] = useState<Home>(defaultHome);
  const [debouncedHome, setDebouncedHome] = useState<Home>(defaultHome);
  const { slogan } = debouncedHome;
  const { cover, logo, logoDark, cover2, cover3 } = home;

  const [imageLink, setImageLink] = useState<string>();

  const [isOpen, setIsOpen] = useState<string | null>(null);

  useEffect(() => {
    fetchHome().then((res: Home | null) => {
      setHome(res || {});
      setDebouncedHome(res || {});
    });
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setHome(debouncedHome);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [debouncedHome]);

  useEffect(() => {
    // updateHome(home);
  }, [home]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDebouncedHome({ ...home, [name]: value });
  };

  const handleOpen = (name: string): void => {
        setIsOpen(isOpen === name ? null : name);
  };

  const hiddenFileInput = React.useRef<any>(null);

  const handleUploadImageClick = () => {
    if (hiddenFileInput?.current instanceof HTMLInputElement) {
      hiddenFileInput.current.click();
    }
  };

  const handleUpload = async (e: React.ChangeEvent) => {
    const input = e.target as HTMLInputElement;

    const inputName = input.name;

    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];

    // display the image
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageLink(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    let imageUrl;
    try {
      imageUrl = await uploadImage(file);
      if (imageUrl) {
        setHome({ ...home, [inputName]: imageUrl });
        toast.success("Image uploaded successfully");
      }
    } catch (e) {
      toast.error("Image size is too large");
      return;
    }
  };

  const handleView = (e: any) => {
  };

  return (
    <section className="contact">
      <div className="container ml-24 px-8 py-4 md:px-16">
        <h2 className="mt-12 mb-4 text-xl">home</h2>
        <h3 className="mb-12">Edit cover information</h3>
        <div className="mb-4 grid gap-8 md:grid-cols-2 [&_td]:p-2">
          <div className="col-1">
            <div className="h-300 relative mb-4 flex">
              <Image
                width="500"
                height="200"
                src={cover || "/asset1.png"}
                style={{
                  objectFit: "cover",
                }}
                alt="cover"
              />
              <div
                className="cover-edit-icon"
                onClick={() => handleOpen("cover")}
              >
                <ReactSVG src="/edit.svg" className="edit-svg h-3 w-3" />
              </div>
              {isOpen === "cover" && (
                <EditMenuPopup
                  handleView={handleView}
                  handleUpload={handleUpload}
                  handleUploadImageClick={handleUploadImageClick}
                  hiddenFileInput={hiddenFileInput}
                  inputName="cover"
                  />
              )}
            </div>
          </div>
          <div className="col-2">
            <div className="grid gap-4 md:grid-cols-4">
              <label>Edit text</label>
              <textarea
                className="input-primary col-span-3"
                value={slogan}
                name="slogan"
                rows={5}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container ml-4 p-4">
        <div className="mb-20 grid gap-8 px-4 md:grid-cols-2 md:px-12 [&_td]:p-2">
          <div className="col-1">
            <h2 className="mb-4 text-xl">home</h2>
            <h3 className="mb-12">Edit cover information</h3>
            <div className="h-300 relative mb-4 flex">
              <Image
                width="500"
                height="200"
                style={{
                  objectFit: "cover",
                }}
                src={cover2 || "/asset2.png"}
                alt="cover2"
              />
              <div
                className="cover-edit-icon"
                onClick={() => handleOpen("cover2")}
              >
                <ReactSVG src="/edit.svg" className="edit-svg h-3 w-3" />
              </div>
              {isOpen === "cover2" && (
                <EditMenuPopup
                  handleView={handleView}
                  handleUpload={handleUpload}
                  handleUploadImageClick={handleUploadImageClick}
                  hiddenFileInput={hiddenFileInput}
                  inputName="cover2"
                  />
              )}
            </div>
          </div>
          <div className="col-2">
            <h2 className="mb-4 text-xl">home</h2>
            <h3 className="mb-12">Edit cover information</h3>
            <div className="h-300 relative mb-4 flex">
              <Image
                width="500"
                height="200"
                style={{
                  objectFit: "cover",
                }}
                src={cover3 || "/asset1.png"}
                alt="cover3"
              />
              <div
                className="cover-edit-icon"
                onClick={() => handleOpen("cover3")}
              >
                <ReactSVG src="/edit.svg" className="edit-svg h-3 w-3" />
              </div>
              {isOpen === "cover3" && (
                <EditMenuPopup
                  handleView={handleView}
                  handleUpload={handleUpload}
                  handleUploadImageClick={handleUploadImageClick}
                  hiddenFileInput={hiddenFileInput}
                  inputName="cover3"
                  />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditCoverSection;
