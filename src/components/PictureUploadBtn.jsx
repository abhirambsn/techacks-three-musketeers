import React, { useEffect } from "react";

const PictureUploadBtn = ({ setImgUrl, disabled }) => {
  useEffect(() => {
    const cloudname = "dl5h5jhdk";
    const preset = "etbnphr9";
    var uploadWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudname,
        uploadPreset: preset,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          console.log("URL:", result.info.secure_url);
          setImgUrl(result.info.secure_url);
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
        Upload Cover Picture
      </button>
    </div>
  );
};

export default PictureUploadBtn;
