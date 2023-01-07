import React, { useEffect } from "react";

const PPTUploadBtn = ({ pptUrl, setPptUrl, disabled }) => {
  useEffect(() => {
    const cloudname = "dl5h5jhdk";
    const preset = "xjxulxjm";
    var uploadWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudname,
        uploadPreset: preset,
      },
      (error, result) => {
        console.log(setPptUrl);
        if (!error && result && result.event === "success") {
          setPptUrl(result.info.secure_url);
          uploadWidget.close();
          alert(`PPT Uploaded at ${result.info.secure_url}`);
        }
      }
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      () => {
        uploadWidget.open();
      },
      false
    );
  }, []);
  return (
    <div>
      <button
        id="upload_widget"
        disabled={disabled}
        className={disabled ? "btn-disabled" : "btn-theme"}
      >
        Upload PPT or PDF
      </button>
      
    </div>
  );
};

export default PPTUploadBtn;
