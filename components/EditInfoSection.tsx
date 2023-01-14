import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";

const defaultInfo = {
  about: `هي شركة سورية مقرها مدينة حلب متخصصة في مجال صناعة الصابون الغار الحلبي العريق رائدة في مجالها تحمل معها أكثر من 20 عاما من الخبرة في مجال صناعة الصابون وتعمل الشركة على تطوير منتجاتها بشكل دائم ورفع السوية الإنتاجية مما يتلائم مع التطورات التكنولوجية مع الحفاظ على تراث هذه الصناعة`,
  address: "Aleppo, Syria, the industrial zone",
  phone: "2-337-741-997-963+",
  hours: `10am to 9pm from Sunday to Thursday
9.30am to 6pm on Saturday`,
};

const EditInfoSection = () => {
  const [info, setInfo] = useState(defaultInfo);
  const [debouncedInfo, setDebouncedInfo] = useState(info);
  const { about, address, phone, hours } = debouncedInfo;

  useEffect(() => {
    const timerId = setTimeout(() => {
      setInfo(debouncedInfo);
    }, 2000);

    return () => clearTimeout(timerId);
  }, [debouncedInfo]);

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
        <div className="grid gap-8 px-12 md:grid-cols-2 md:px-24 [&_td]:p-2 mb-20">
          <div className="col-1 text-right">
            <label>Edit text</label>
          </div>
          <div className="col-2">
            <textarea
              className="input input-home textarea"
              value={about}
              name="about"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid gap-8 px-12 md:grid-cols-2 md:px-24 [&_td]:p-2 mb-4">
          <div className="col-1 flex justify-end">
            <ReactSVG src="/location.svg" className="h-6 w-6" />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="input input-home"
              value={address}
              name="address"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid gap-8 px-12 md:grid-cols-2 md:px-24 [&_td]:p-2 mb-4">
          <div className="col-1 flex justify-end">
            <ReactSVG src="/phone.svg" className="h-6 w-6" />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="input input-home"
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
              className="input input-home textarea"
              value={hours}
              name="hours"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditInfoSection;
