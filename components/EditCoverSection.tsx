import React, { useState, useEffect, useRef, RefObject } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import { Home } from "../types/home";
import fetchHome from "../helpers/fetchHome";
import updateHome from "../helpers/updateHome";
import { uploadImage } from "../helpers/UploadImage";
import EditImageBlock from "../atoms/EditImageBlock";

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
  const { slogan, cover, logo, logoDark, cover2, cover3 } = home;
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);

  const [imageLink, setImageLink] = useState<string>();

  useEffect(() => {
    fetchHome().then((res: Home | null) => {
      setHome(res || {});
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }
    const timerId = setTimeout(() => {
      if (isMounted.current) {
        updateHome(home);
      } else {
        isMounted.current = true;
      }
    }, 1000);

    return () => timerId && clearTimeout(timerId);
  }, [home, loading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHome({ ...home, [name]: value });
  };

  const imageRef = React.useRef<HTMLImageElement>(null);
  const imageRef2 = React.useRef<HTMLImageElement>(null);
  const imageRef3 = React.useRef<HTMLImageElement>(null);

  const [isOpen, setIsOpen] = useState<
    RefObject<HTMLImageElement> | undefined | null
  >(null);

  const [isOverlay, setIsOverlay] = useState<boolean>(false);

  const handleOpen = (ref?: RefObject<HTMLImageElement>): void => {
    setIsOpen(ref);
    if (!isOpen) {
      if (!document.querySelector("div.overlay")) {
        setIsOverlay(true);
      }
    }
  };

  const handleUpload = async (
    ref?: RefObject<HTMLImageElement>,
    e?: React.ChangeEvent
  ) => {
    const input = e?.target as HTMLInputElement;

    const inputName = input.name;

    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];

    // display the image
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageLink(e.target?.result as string);
      setIsOpen(null);

      if (ref?.current instanceof HTMLImageElement) {
        ref.current.style.opacity = "0.5";
      }
    };
    reader.readAsDataURL(file);

    let imageUrl;
    try {
      imageUrl = await uploadImage(file);
      if (imageUrl) {
        setHome({ ...home, [inputName]: imageUrl });
        toast.success("Image uploaded successfully");
        const img = ref?.current;
        img && setTimeout(() => (img.style.opacity = "1"), 1500);
        setIsOverlay(false);
      }
    } catch (e) {
      toast.error("Image size is too large");
      return;
    }
  };

  const handleViewClick = (ref: any) => {
    if (ref?.current instanceof HTMLImageElement) {
      ref.current.click();
    }
  };

  const handleView = (e: any) => {
    const imageUrl = e.target.src;
    if (!document.querySelector("div.img-lightbox")) {
      const lightbox = document.createElement("div");
      lightbox.classList.add("img-lightbox");

      const image = document.createElement("img");
      image.src = imageUrl;
      lightbox.appendChild(image);

      const closeButton = document.createElement("button");
      closeButton.classList.add("close-lightbox-btn");
      closeButton.innerHTML = "X";
      lightbox.appendChild(closeButton);

      lightbox.addEventListener("click", (e: any) => {
        const els = document.querySelectorAll(".img-lightbox img");
        let isImg = false;
        for (let i = 0; i < els.length; i++) {
          if (els[i] === e.target) isImg = true;
        }
        if (!isImg) document.body.removeChild(lightbox);
        document.body.style.overflow = "auto";
      });

      closeButton.addEventListener("click", () => {
        document.body.removeChild(lightbox);
        document.body.style.overflow = "auto";
      });

      document.body.appendChild(lightbox);
      document.body.style.overflow = "hidden";
      setIsOpen(null);
      setIsOverlay(false);
    }
  };

  return (
    <section className="contact">
      <div className="container px-8 py-4 md:ml-24 md:px-16">
        <h2 className="mt-12 mb-4 text-xl">home</h2>
        <h3 className="mb-12">Edit cover information</h3>
        <div className="mb-4 grid gap-8 md:grid-cols-2 [&_td]:p-2">
          <div className="col-1">
            <div className="h-300 relative mb-4 flex">
              <Image
                width="500"
                height="200"
                ref={imageRef}
                onClick={handleView}
                src={cover || "/placeholder-image.jpg"}
                style={{
                  objectFit: "cover",
                }}
                alt="cover"
              />
              <EditImageBlock
                iconClass="cover-edit-icon"
                handleOpen={handleOpen.bind(this, imageRef)}
                handleViewClick={() => handleViewClick(imageRef)}
                handleUpload={handleUpload.bind(this, imageRef)}
                inputName="cover"
                btnClass="cover-edit-btn"
                open={isOpen}
                svgClass="edit-svg h-3 w-3"
              />
            </div>
          </div>
          <div className="col-2">
            <div className="grid gap-4 md:grid-cols-4">
              <label>Edit text</label>
              <textarea
                dir="rtl"
                className={`${
                  loading ? "input-disabled" : "input-primary"
                } col-span-3 text-right`}
                value={slogan}
                disabled={loading}
                name="slogan"
                rows={5}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container p-4 md:ml-4">
        <div className="mb-20 grid gap-8 px-4 md:grid-cols-2 md:px-12 [&_td]:p-2">
          <div className="col-1">
            <h2 className="mb-4 text-xl">home</h2>
            <h3 className="mb-12">Edit cover information</h3>
            <div className="h-300 relative mb-4 flex">
              <Image
                width="500"
                height="200"
                ref={imageRef2}
                onClick={handleView}
                style={{
                  objectFit: "cover",
                }}
                src={cover2 || "/placeholder-image.jpg"}
                alt="cover2"
              />
              <EditImageBlock
                iconClass="cover-edit-icon"
                btnClass="cover-edit-btn"
                svgClass="edit-svg h-3 w-3"
                inputName="cover2"
                open={isOpen}
                handleOpen={handleOpen.bind(this, imageRef2)}
                handleViewClick={() => handleViewClick(imageRef2)}
                handleUpload={handleUpload.bind(this, imageRef2)}
              />
            </div>
          </div>
          <div className="col-2">
            <h2 className="mb-4 text-xl">home</h2>
            <h3 className="mb-12">Edit cover information</h3>
            <div className="h-300 relative mb-4 flex">
              <Image
                width="500"
                height="200"
                ref={imageRef3}
                onClick={handleView}
                style={{
                  objectFit: "cover",
                }}
                src={cover3 || "/placeholder-image.jpg"}
                alt="cover3"
              />
              <EditImageBlock
                iconClass="cover-edit-icon"
                btnClass="cover-edit-btn"
                svgClass="edit-svg h-3 w-3"
                inputName="cover3"
                open={isOpen}
                handleOpen={handleOpen.bind(this, imageRef3)}
                handleViewClick={() => handleViewClick(imageRef3)}
                handleUpload={handleUpload.bind(this, imageRef3)}
              />
            </div>
          </div>
        </div>
      </div>
      {isOverlay && (
        <div
          className="overlay"
          onClick={() => {
            setIsOverlay(false);
            setIsOpen(null);
          }}
        ></div>
      )}
    </section>
  );
};

export default EditCoverSection;
