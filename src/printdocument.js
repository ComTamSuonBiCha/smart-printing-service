import React, { useState } from "react";
import Popup from "reactjs-popup";
import docustyle from "./printdocument.module.css";
import upload from "./component/File-upload.png";
import printer from "./component/Printer2.png";
import properties from "./component/Settings-adjust.png";
import arrow from "./component/arrow.png";
import uploadsticker from "./component/uploadsticker.png";

function PrintDocument() {
  const [isPopupOpen, setPopupOpen] = useState(false); // Popup state

  const handleUploadClick = () => {
    setPopupOpen(true); // Open the popup
  };

  const closePopup = () => {
    setPopupOpen(false); // Close the popup
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      console.log("Selected file:", file);
    }
  };

  return (
    <div className={docustyle.container}>
      <div className={docustyle.print_document}>
        <main className={docustyle.main_content}>
          <div className={docustyle.left_side}>
            <h1>Print Document</h1>
            <p className={docustyle.greeting}>
              Please fill out 3 components below before proceeding to the next
              step!
            </p>
            <div className={docustyle.action_list}>
              <div
                className={docustyle.action_item}
                onClick={handleUploadClick}
              >
                <div>
                  <div className={docustyle.display_item}>
                    <img
                      src={upload}
                      alt="File-Upload"
                      className={docustyle.icon}
                    ></img>
                    <p className={docustyle.icon_title}>UPLOAD FILE</p>
                    <img
                      src={arrow}
                      alt="arrow"
                      className={docustyle.arrow}
                    ></img>
                  </div>
                  <p className={docustyle.action_desciption}>
                    Upload your document here (PDF, DOCX, XLS, XLSX)
                  </p>
                  <div className={docustyle.display_item}>
                    <p className={docustyle.action_desciption}>NAME</p>{" "}
                    <div className={docustyle.info_box}></div>
                  </div>
                  <div className={docustyle.display_item}>
                    <p className={docustyle.action_desciption}>SIZE</p>{" "}
                    <div className={docustyle.info_box_size}></div>
                    <p className={docustyle.action_desciption}>FILE TYPE</p>
                    <div className={docustyle.info_box_size}></div>
                  </div>
                  <div className={docustyle.bottom}></div>
                </div>
              </div>
              <div className={docustyle.action_item}>
                <div className={docustyle.display_item}>
                  <img
                    src={properties}
                    alt="Properties"
                    className={docustyle.icon}
                  ></img>
                  <p className={docustyle.icon_title}>SET UP YOUR PROPERTIES</p>
                  <img
                    src={arrow}
                    alt="arrow"
                    className={docustyle.arrow}
                  ></img>
                </div>
                <p className={docustyle.action_desciption}>
                  Set up your printing properties
                </p>
                <div className={docustyle.bottom}></div>
              </div>
              <div className={docustyle.action_item}>
                <div className={docustyle.display_item}>
                  <img
                    src={printer}
                    alt="Printer"
                    className={docustyle.icon}
                  ></img>
                  <p className={docustyle.icon_title}>CHOOSE PRINTER</p>
                  <img
                    src={arrow}
                    alt="arrow"
                    className={docustyle.arrow}
                  ></img>
                </div>
                <p className={docustyle.action_desciption}>
                  Choose available printer
                </p>
                <div className={docustyle.display_item}>
                  <p className={docustyle.action_desciption}>Printer ID</p>
                  <p className={docustyle.space}></p>
                  <p className={docustyle.action_desciption}>Location</p>
                </div>
                <div className={docustyle.display_item}>
                  <div className={docustyle.info_box_printer}></div>
                  <div className={docustyle.info_box_location}></div>
                </div>
                <div className={docustyle.bottom}></div>
              </div>
              <button className={docustyle.print_btn}>
                <b>PRINT</b>
              </button>
            </div>
          </div>
          <div className={docustyle.right_side}></div>
        </main>
        {/* Popup */}
        <Popup
          open={isPopupOpen}
          onClose={closePopup}
          modal
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #1488db",
            borderRadius: "10px",
            padding: "20px",
            height: "90%",
            width: "80%",
          }}
          overlayStyle={{
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div>
            <h2 className={docustyle.title}>Upload File</h2>
            <div className={docustyle.outsidebox}>
              <div className={docustyle.bluebox}>
                <input
                  type="file"
                  id="fileUpload"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e)}
                />
                <img
                  src={uploadsticker}
                  alt="Sticker"
                  className={docustyle.sticker}
                  onClick={() => document.getElementById("fileUpload").click()}
                ></img>
                <p className={docustyle.titleupload}>
                  {" "}
                  UPLOAD FILE FROM YOUR BROWSER
                </p>
                <p className={docustyle.description}>
                  Accepted file types: PDF, DOCX, XLS, XLSX
                </p>
                <div className={docustyle.bottom}></div>
              </div>
              <div className={docustyle.display_button}>
                <button className={docustyle.upload_btn} onClick={closePopup}>
                  <b>CANCEL</b>
                </button>
                <button className={docustyle.upload_btn} onClick={closePopup}>
                  <b>UPLOAD</b>
                </button>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default PrintDocument;
