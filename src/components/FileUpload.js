import React, { useState, useEffect } from "react"
import { Image } from "react-bootstrap"
import upload from "../images/upload.svg"
// import { uploadDocument, successToast } from '../services/creditFormService';
import "../stylesheets/css/fileupload.css"

const FileUpload = ({ uploadObj, documentStatus, saveDocument }) => {
  const [inputFile, setInputFile] = useState(null)

  useEffect(() => {
    setInputFile(document.getElementById(uploadObj.id))
  }, [])

  const handleClick = (event) => {
    // event = event || window.event;
    // if(event.target.id === 'displayed-btn'){
    // }
    if (documentStatus[uploadObj.statusField] === 1) return
    inputFile.click()
  }

  const handleChange = (event) => {
    console.log("On Change Activated!")
    if (!event.target.files && !event.target.files[0]) return

    console.log(event.target.files)

    // HTML5 FileReader API
    let reader = new FileReader()
    reader.onload = (e) => {
      saveDocument(e.target.result)
    }
    reader.readAsDataURL(event.target.files[0])
  }

  return (
    <form>
      <div className="fileUpload text-center">
        <p>
          <strong>{uploadObj.label}</strong>
        </p>
        <input type="file" id={uploadObj.id} hidden onChange={handleChange} />
        <label
          className="lablef"
          for="actual-"
          id="displayed-btn"
          onClick={handleClick}
        >
          {documentStatus[uploadObj.statusField] === 1 ? (
            <>
              <i style={{ fontSize: "20px" }} className="fa fa-check"></i> Done
            </>
          ) : (
            <>
              <Image fluid src={upload} /> Upload
            </>
          )}
        </label>
      </div>
    </form>
  )
}

export default FileUpload
