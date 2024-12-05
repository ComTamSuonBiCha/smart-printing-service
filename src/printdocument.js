import React, { useState } from "react";
import Popup from "reactjs-popup";
import docustyle from "./printdocument.module.css";
import upload from "./component/File-upload.png";
import printer from "./component/Printer2.png";
import properties from "./component/Settings-adjust.png";
import arrow from "./component/arrow.png";
import uploadsticker from "./component/uploadsticker.png";
import onepage from "./component/onepage.png";
import twopages from "./component/twopages.png";
import fourpages from "./component/fourpages.png";
import sixpages from "./component/sixpages.png";

function PrintDocument() {
  const [isUploadPopupOpen, setUploadPopupOpen] = useState(false); // Upload popup state
  const [isPropertiesPopupOpen, setPropertiesPopupOpen] = useState(false); // Properties popup state

  const [previewUrl, setPreviewUrl] = useState(null);
  // Handlers for upload popup
  const handleUploadClick = () => setUploadPopupOpen(true);
  const closeUploadPopup = () => setUploadPopupOpen(false);

  // Handlers for properties popup
  const handlePropertiesClick = () => setPropertiesPopupOpen(true);
  const closePropertiesPopup = () => setPropertiesPopupOpen(false);

  const [fileDetails, setFileDetails] = useState({
    name: '',
    size: '',
    type: '',
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      let count = 0;
      let filesize = file.size; // File size in bytes
  
      // Calculate the appropriate size unit (B, KB, MB, etc.)
      while (filesize > 1024) {
        filesize = filesize / 1024;
        count++;
      }
      const type = file.type.split('/')[1] || 'Unknown';
      // Determine the size unit
      let result;
      if (count === 0) result = `${filesize.toFixed(2)} B`;
      else if (count === 1) result = `${filesize.toFixed(2)} KB`;
      else if (count === 2) result = `${filesize.toFixed(2)} MB`;
      else if (count === 3) result = `${filesize.toFixed(2)} GB`;
      else result = `${filesize.toFixed(2)} TB`;
  
      // Update file details state
      setFileDetails({
        name: file.name,
        size: result, // Dynamic file size with unit
        type: type, // Handle cases where type is undefined
      });

      const url = URL.createObjectURL(file);
      setPreviewUrl(url); 
    }
  };

  const [margins, setMargins] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
  
  // Update the margin value dynamically
  const handleMarginChange = (side, value) => {
    setMargins((prev) => ({ ...prev, [side]: value }));
  };

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // Release memory
      }
    };
  }, [previewUrl]);

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
                    <div className={docustyle.info_box}>{fileDetails.name || ''}</div>
                  </div>
                  <div className={docustyle.display_item}>
                    <p className={docustyle.action_desciption}>SIZE</p>{" "}
                    <div className={docustyle.info_box_size}>{fileDetails.size || ''}</div>
                    <p className={docustyle.action_desciption}>FILE TYPE</p>
                    <div className={docustyle.info_box_size}>{fileDetails.type || ''}</div>
                  </div>
                  <div className={docustyle.bottom}></div>
                </div>
              </div>
              <div className={docustyle.action_item}>
                <div className={docustyle.display_item} onClick={handlePropertiesClick}>
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
          <div className={docustyle.right_side}>
              {previewUrl && (
              <div className={docustyle.preview_section}>
                {fileDetails.type.includes("image") ? (
                  <img
                    src={previewUrl}
                    alt="File Preview"
                    className={docustyle.preview_image}
                  />
                ) : fileDetails.type.includes("pdf") ? (
                  <embed
                    src={previewUrl}
                    type="application/pdf"
                    className={docustyle.preview_pdf}
                  />
                ) : (
                  <p>Preview not available for this file type.</p>
                )}
              </div>)}
              </div>    
        </main>
        {/* Popup */}
        <Popup
          open={isUploadPopupOpen}
          onClose={closeUploadPopup}
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
                <img
                  src={uploadsticker}
                  alt="Sticker"
                  className={docustyle.sticker}
                  
                ></img>
                <p className={docustyle.titleupload}>
                  UPLOAD FILE FROM YOUR BROWSER
                </p>
                <p className={docustyle.description}>
                  Accepted file types: PDF, DOCX, XLS, XLSX
                </p>
                <div className={docustyle.bottom}></div>
              </div>
              <div className={docustyle.display_button}>
                <button className={docustyle.upload_btn} onClick={closeUploadPopup}>
                  <b>CANCEL</b>
                </button>
                <input
                  type="file"
                  id="fileUpload"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e)}
                /> 
                <button className={docustyle.upload_btn} onClick={() => document.getElementById("fileUpload").click()}>
                  <b>UPLOAD</b>
                </button>
              </div>
            </div>
          </div>
        </Popup>
        <Popup
          open={isPropertiesPopupOpen}
          onClose={closePropertiesPopup}
          modal
          contentStyle={{
            backgroundColor: "#ffffff",
            padding: "20px",
            height: "94%",
            width: "80%",
            alignItems: "normal",
          }}
          overlayStyle={{
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div>
            <h2 className={docustyle.title}>Print Properties</h2>
            <div className={docustyle.properties_container}>
              <div className={docustyle.left_properties}>
                {/*FIRST LINE*/}
                <div className={docustyle.properties_container_title}>
                  <div className={docustyle.properties_container_title_button}>
                    <p className={docustyle.description_properties}>COPIES</p>
                    <button className={docustyle.description_properties_button}>
                      1
                    </button>
                  </div>
                  <div className={docustyle.properties_container_title_button}>
                    <p className={docustyle.description_properties}>
                      PAPER SIZE
                    </p>
                    <button className={docustyle.description_properties_button}>
                      SELECT
                    </button>
                  </div>
                  <div className={docustyle.properties_container_title_button}>
                    <p className={docustyle.description_properties}>SIDED</p>
                    <button className={docustyle.description_properties_button}>
                      1
                    </button>
                  </div>
                </div>
                <div className={docustyle.blue_line}></div>
                {/*SECOND LINE*/}
                <div className={docustyle.page_setup_container}>
                  <p className={docustyle.page_setup_title}>PAGE SETUP</p>
                  <div className={docustyle.margin}>
                    <p className={docustyle.page_setup_description}>MARGIN</p>
                    <button className={docustyle.margin_button}>SELECT</button>
                  </div>
                  <div className={docustyle.margin}>
                    <div className={docustyle.margin_title}>
                      <p>Left:</p>
                      <p>Top:</p>
                    </div>
                    <div className={docustyle.margin_title}>
                      <input
                        type="number"
                        className={docustyle.margin_specific_button}
                        placeholder="0"
                        min="0"
                        value={margins.left}
                        onChange={(e) => handleMarginChange("left", e.target.value)}
                      />
                      <input
                        type="number"
                        className={docustyle.margin_specific_button}
                        placeholder="0"
                        min="0"
                        value={margins.top}
                        onChange={(e) => handleMarginChange("top", e.target.value)}
                      />
                    </div>
                    <div className={docustyle.margin_title}>
                      <p>Right:</p>
                      <p>Bottom:</p>
                    </div>
                    <div className={docustyle.margin_title}>
                    <input
                        type="number"
                        className={docustyle.margin_specific_button}
                        placeholder="0"
                        min="0"
                        value={margins.right}
                        onChange={(e) => handleMarginChange("right", e.target.value)}
                      />
                      <input
                        type="number"
                        className={docustyle.margin_specific_button}
                        placeholder="0"
                        min="0"
                        value={margins.bottom}
                        onChange={(e) => handleMarginChange("bottom", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className={docustyle.blue_line}></div>
                {/*THIRD LINE*/}
                <div className={docustyle.orientation}>
                  <p className={docustyle.page_setup_description}>
                    ORIENTATION
                  </p>
                  <label>
                    <input type="radio" name="orientation" />
                    <span>Portrait</span>
                  </label>
                  <label>
                    <input type="radio" name="orientation" />
                    <span>Landscape</span>
                  </label>
                </div>
                <div className={docustyle.blue_line}></div>
                {/*FOURTH LINE*/}
                <div className={docustyle.sheet}>
                  <p className={docustyle.page_setup_description}>
                    PAGE PER SHEET
                  </p>
                  <div className={docustyle.sheet_button_list}>
                    <button className={docustyle.sheet_button}>
                      <img
                        src={onepage}
                        alt="OnePage"
                        className={docustyle.sheet_sticker}
                      ></img>
                    </button>
                    <button className={docustyle.sheet_button}>
                      <img
                        src={twopages}
                        alt="TwoPages"
                        className={docustyle.sheet_sticker}
                      ></img>
                    </button>
                    <button className={docustyle.sheet_button}>
                      <img
                        src={fourpages}
                        alt="FourPages"
                        className={docustyle.sheet_sticker}
                      ></img>
                    </button>
                    <button className={docustyle.sheet_button}>
                      <img
                        src={sixpages}
                        alt="SixPages"
                        className={docustyle.sheet_sticker}
                      ></img>
                    </button>
                  </div>
                </div>
                <div className={docustyle.blue_line}></div>
                <div className={docustyle.numberpage_container}>
                  <div className={docustyle.numberpage}>
                    <p className={docustyle.page_setup_description}>
                      NUMBER OF PAGE LEFT
                    </p>
                    <p className={docustyle.page_setup_description}>
                      PRINT RANGE FROM
                    </p>
                  </div>
                  <div className={docustyle.numberpage}>
                    <button
                      className={docustyle.margin_specific_button}
                    ></button>
                    <div className={docustyle.printrange}>
                      <button
                        className={docustyle.margin_specific_button}
                      ></button>
                      <p className={docustyle.page_setup_description_sheet}>
                        TO
                      </p>
                      <button
                        className={docustyle.margin_specific_button}
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={docustyle.right_properties}>
                <p className={docustyle.page_setup_description}>PREVIEW</p>
                <div className={docustyle.print_preview}></div>
              </div>
            </div>
            <button className={docustyle.done}>DONE</button>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default PrintDocument;
