import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import fetchInfo from "../helpers/fetchInfo";
import updateInfo from "../helpers/updateInfo";
import { Info } from "../types/info";

const defaultInfo: Info = {
  about: "",
  address: "",
  hours: "",
  phone: "",
};
const EditInfoSection = () => {
  const [info, setInfo] = useState<Info>(defaultInfo);
  const [debouncedInfo, setDebouncedInfo] = useState<Info>(defaultInfo);
  const { about, address, phone, hours } = debouncedInfo;

  useEffect(() => {
    fetchInfo().then((res: Info | null) => {
      setInfo(res || {});
      setDebouncedInfo(res || {});
    });
  }, [info]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setInfo(debouncedInfo);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [debouncedInfo]);

  useEffect(() => {
    // updateInfo(info);
  }, [info]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDebouncedInfo({ ...info, [name]: value });
  };

  return (
    <section className="contact">
      <div className="container ml-24 p-4">
        <h2 className="my-12 text-xl">home</h2>
        <h3 className="my-12">Edit company information</h3>
      </div>

      <div className="container mx-auto mt-4 mb-8">
        <div className="mb-20 grid gap-8 px-12 md:grid-cols-2 md:px-24 [&_td]:p-2">
          <div className="col-1 text-right">
            <label>Edit text</label>
          </div>
          <div className="col-2">
            <textarea
              className="input input-primary"
              value={about}
              name="about"
              rows={5}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-4 grid gap-8 px-12 md:grid-cols-2 md:px-24 [&_td]:p-2">
          <div className="col-1 flex justify-end">
            <ReactSVG src="/location.svg" className="h-6 w-6" />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="input input-primary"
              value={address}
              name="address"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-4 grid gap-8 px-12 md:grid-cols-2 md:px-24 [&_td]:p-2">
          <div className="col-1 flex justify-end">
            <ReactSVG src="/phone.svg" className="h-6 w-6" />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="input input-primary"
              value={phone}
              name="phone"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid gap-8 px-12 md:grid-cols-2 md:px-24 [&_td]:p-2">
          <div className="col-1 flex justify-end">
            <ReactSVG src="/time.svg" className="h-6 w-6" />
          </div>
          <div className="col-2">
            <textarea
              className="input input-primary"
              value={hours}
              name="hours"
              onChange={handleChange}
              rows={5}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditInfoSection;
