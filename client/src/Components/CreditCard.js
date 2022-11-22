import React, { useState } from "react";
import toast from "react-hot-toast";

const CreditCard = ({ onChangeInput, setShowPremium }) => {
  const [formData, setFormData] = useState({});
  const validateData = (e) => {
    // e.preventDefault();
    if (
      formData.card_no == "12345678" &&
      formData.user_name == "khoj user" &&
      formData.expiry_date == "2022-05-02" &&
      formData.cvv == "123"
    ) {
      toast.success("Card Details Validated Successfully!");
      onChangeInput({
        target: {
          name: "isPremium",
          value: true,
        },
      });
      setShowPremium(false);
    } else toast.error("Wrong Card Details!");

    return;
    // else alert("nopes");
  };
  const handleChange = (e) => {
    // e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const autoFillData = (e) => {
    e.preventDefault();
    setFormData({
      card_no: "12345678",
      user_name: "khoj user",
      expiry_date: "2022-05-02",
      cvv: "123",
    });
  };
  return (
    <div>
      {" "}
      <div>
        <input
          placeholder="Enter Card Number..."
          className="card-input w-75 bg-light"
          name="card_no"
          onChange={(e) => handleChange(e)}
          value={formData.card_no}
        />
      </div>
      <div>
        <input
          placeholder="Enter Name on Card..."
          className="card-input w-75 bg-light"
          name="user_name"
          onChange={(e) => handleChange(e)}
          value={formData.user_name}
        />
      </div>
      <div className="mt-3 bg-light">
        Expiry Date{"   : "}
        <input
          placeholder="Enter Expiry Date..."
          type="date"
          className="card_input "
          name="expiry_date"
          onChange={(e) => handleChange(e)}
          value={formData.expiry_date}
        />
      </div>
      <div>
        <input
          placeholder="Enter CVV "
          className="card-input w-75 bg-light"
          name="cvv"
          onChange={(e) => handleChange(e)}
          value={formData.cvv}
        />
      </div>
      <button
        className="btn btn-primary mt-5"
        onClick={(e) => validateData(e)}
        // type="submit"
      >
        Submit
      </button>
      <button
        className="btn btn-primary mt-5 mx-3"
        onClick={(e) => autoFillData(e)}
      >
        AutoFill Data
      </button>
    </div>
  );
};

export default CreditCard;
