import React, { useState, useEffect, useRef } from "react";
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
  const { about, address, phone, hours } = info;
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInfo().then((res: Info | null) => {
      setInfo(res || {});
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }
    const timerId = setTimeout(() => {
      if (isMounted.current) {
        updateInfo(info);
      } else {
        isMounted.current = true;
      }
    }, 1000);

    return () => timerId && clearTimeout(timerId);
  }, [info, loading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  return (
    <section className="contact">
      <div className="container p-4 md:ml-24">
        <h2 className="mt-8 mb-4 text-xl">home</h2>
        <h3 className="mb-2">Edit company information</h3>
      </div>

      <div className="container mx-auto mt-4 mb-8">
        <div className="mb-8 flex justify-between px-6 md:grid md:grid-cols-3 md:gap-8 md:px-24 [&_td]:p-2">
          <div className="col-1 md:text-right">
            <label>Edit text</label>
          </div>
          <div className="col-span-2">
            <textarea
              dir="rtl"
              className={`${
                loading ? "input-disabled" : "input-primary"
              } text-right`}
              value={about}
              name="about"
              rows={5}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>
        <div className="mb-2 flex justify-between px-6 md:grid md:grid-cols-3 md:gap-8 md:px-24 [&_td]:p-2">
          <div className="col-1 flex md:justify-end">
            <ReactSVG src="/location.svg" className="h-6 w-6" />
          </div>
          <div className="col-span-2">
            <input
              type="text"
              className={`${loading ? "input-disabled" : "input-primary"}`}
              value={address}
              name="address"
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>
        <div className="mb-2 flex justify-between px-6 md:grid md:grid-cols-3 md:gap-8 md:px-24 [&_td]:p-2">
          <div className="col-1 flex md:justify-end">
            <ReactSVG src="/phone.svg" className="h-6 w-6" />
          </div>
          <div className="col-span-2">
            <input
              type="text"
              className={`${loading ? "input-disabled" : "input-primary"}`}
              value={phone}
              name="phone"
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex justify-between px-6 md:grid md:grid-cols-3 md:gap-8 md:px-24 [&_td]:p-2">
          <div className="col-1 w-100 flex md:justify-end">
            <ReactSVG src="/time.svg" className="h-6 w-6" />
          </div>
          <div className="col-span-2">
            <textarea
              className={`${loading ? "input-disabled" : "input-primary"}`}
              value={hours}
              name="hours"
              onChange={handleChange}
              rows={5}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditInfoSection;
