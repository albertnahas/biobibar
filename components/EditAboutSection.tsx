import React, { useState, useEffect, useRef, RefObject } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import { About } from "../types/about";
import fetchAbout from "../helpers/about/fetchAbout";
import updateAbout from "../helpers/about/updateAbout";
import { uploadImage } from "../helpers/UploadImage";
import EditImageBlock from "../atoms/EditImageBlock";

const defaultAbout: About = {
  image: "",
  paragraph1: "",
  paragraph2: "",
  paragraph3: "",
};

const EditAboutSection = () => {
  const [about, setAbout] = useState<About>(defaultAbout);
  const { image, paragraph1, paragraph2, paragraph3 } = about;
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);

  const [imageLink, setImageLink] = useState<string>();

  useEffect(() => {
    fetchAbout().then((res: About | null) => {
      setAbout(res || {});
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }
    const timerId = setTimeout(() => {
      if (isMounted.current) {
        updateAbout(about);
      } else {
        isMounted.current = true;
      }
    }, 1000);

    return () => timerId && clearTimeout(timerId);
  }, [about, loading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

  const imageRef = React.useRef<HTMLImageElement>(null);

  const [isOpen, setIsOpen] = useState<
    RefObject<HTMLImageElement> | undefined | null
  >(null);

  const handleOpen = (ref?: RefObject<HTMLImageElement>): void => {
    setIsOpen(ref);
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
      imageUrl = await uploadImage(file, ref.current.src);
      if (imageUrl) {
        setAbout({ ...about, image: imageUrl });
        toast.success("Image uploaded successfully");
        const img = ref?.current;
        img && setTimeout(() => (img.style.opacity = "1"), 1500);
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
        setIsOpen(null);
      });

      closeButton.addEventListener("click", () => {
        document.body.removeChild(lightbox);
        document.body.style.overflow = "auto";
      });

      document.body.appendChild(lightbox);
      document.body.style.overflow = "hidden";
      setIsOpen(null);
    }
  };

  return (
    <section className="contact">
      <div className="container px-8 py-4 md:ml-24 md:px-16">
        <h2 className="mt-12 mb-4 text-xl">about</h2>
        <div className="mb-12 grid grid-cols-5 gap-8">
          <div className="col-1">
            <label>Edit paragraph</label>
          </div>
          <div className="col-span-4">
            <textarea
              className={`${loading ? "input-disabled" : "input-primary"}`}
              value={paragraph1}
              name="paragraph1"
              rows={7}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>
        <div className="mb-12 grid gap-8 md:grid-cols-2">
          <div className="col-1">
            <div className="h-300 relative mb-4 flex">
              <Image
                width="500"
                height="200"
                ref={imageRef}
                onClick={handleView}
                src={image || "/asset4.jpg"}
                style={{
                  objectFit: "cover",
                }}
                alt="image"
              />
              <EditImageBlock
                iconClass="cover-edit-icon"
                handleOpen={handleOpen.bind(this, imageRef)}
                handleViewClick={() => handleViewClick(imageRef)}
                handleUpload={handleUpload.bind(this, imageRef)}
                inputName="image"
                btnClass="cover-edit-btn"
                open={isOpen}
                svgClass="edit-svg h-3 w-3"
              />
            </div>
          </div>
          <div className="col-2">
            <div className="grid gap-4 md:grid-cols-4">
              <label className="col-1">Edit paragraph</label>
              <textarea
                className={`${
                  loading ? "input-disabled" : "input-primary"
                } col-span-3`}
                value={paragraph2}
                disabled={loading}
                name="paragraph2"
                rows={10}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="mb-6 grid grid-cols-5 gap-8">
          <div className="col-1">
            <label>Edit paragraph</label>
          </div>
          <div className="col-span-4">
            <textarea
              className={`${loading ? "input-disabled" : "input-primary"}`}
              value={paragraph3}
              name="paragraph3"
              rows={5}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="overlay"
          onClick={() => {
            setIsOpen(null);
          }}
        ></div>
      )}
    </section>
  );
};

export default EditAboutSection;
