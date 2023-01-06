import React, {useState} from 'react'
import PictureUploadBtn from "../../components/PictureUploadBtn";

const Step3 = () => {
    const [imgUrl, setImgUrl] = useState("");
  return (
    <div className='form-left'>
        <div className="form-group">
                <label htmlFor="period">Project period: </label>
                <input
                  type="text"
                  name="period"
                />
              </div>

              <div className="form-group">
                <label htmlFor="stage">Period per stage: </label>
                <input
                  type="text"
                  name="stage"
                />
              </div>
              <div className="form-group">
                <label htmlFor="target">Amount required: </label>
                <input
                  type="text"
                  name="target"
                />
              </div>

              <div className="form-group">
              <PictureUploadBtn
                  disabled={imgUrl.length > 0}
                  setImgUrl={setImgUrl}
                  imgUrl={imgUrl}
                />
              </div>

                <div className="form-group">
              <button
                  onClick={() => setImgUrl("")}
                  className={
                    imgUrl.length <= 0 ? "btn-disabled" : "btn-inverse"
                  }
                  disabled={imgUrl.length <= 0}
                >
                  Reset
                </button>
              </div>
              
    </div> 
  )
}

export default Step3