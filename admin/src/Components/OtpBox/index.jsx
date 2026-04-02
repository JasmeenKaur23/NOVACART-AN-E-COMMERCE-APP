import React, { useState, useRef } from "react";

const OtpBox = ({ length, onChange }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  // Handle value change in each box
  const handleChange = (element, index) => {
    const value = element.target.value;

    // Only allow numeric input
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value; // keep last digit
    setOtp(newOtp);
    onChange(newOtp.join(""));
    // Move to next box automatically

    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Handle backspace key to move focus backward
  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div
      style={{ display: "flex", gap: "5px", justifyContent: "center" }}
      className="otpBox"
    >
      {otp.map((data, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength="1"
          value={otp[index]}
          className="h-[30px] w-[30px] sm:w-[45px] sm:h-[45px] text-[14px] sm:text-[17px]"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            width: "50px",
            height: "50px",
            textAlign: "center",
            fontSize: "20px",
            border: "2px solid #ccc",
            borderRadius: "8px",
            outline: "none",
          }}
        />
      ))}
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial",
    marginTop: "60px",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  inputBox: {
    width: "45px",
    height: "45px",
    textAlign: "center",
    fontSize: "20px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    outline: "none",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default OtpBox;
