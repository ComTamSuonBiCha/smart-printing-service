import React, { useState } from "react";
import Popup from "reactjs-popup";
import docustyle from "./printdocument.module.css";
import upload from "./component/File-upload.png";
import printer from "./component/Printer2.png";
import properties from "./component/Settings-adjust.png";
import arrow from "./component/arrow.png";
import uploadsticker from "./component/uploadsticker.png";
import confirm from "./component/confirm.png";
import onepage from "./component/onepage.png";
import twopages from "./component/twopages.png";
import fourpages from "./component/fourpages.png";
import sixpages from "./component/sixpages.png";
import printSucc from "./component/printsucc.png";
import onepage_after from "./component/onepage_after.png";
import twopages_after from "./component/twopages_after.png";
import fourpages_after from "./component/fourpages_after.png";
import sixpages_after from "./component/sixpages_after.png";
import { useNavigate } from "react-router-dom";



function PrintDocument() {
  const [isUploadPopupOpen, setUploadPopupOpen] = useState(false); // Upload popup state
  const [isPropertiesPopupOpen, setPropertiesPopupOpen] = useState(false); // Properties popup state
  const [isChoosePopupOpen, setChoosePopupOpen] = useState(false); // Properties popup state
  
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);

  const [isSuccPrintPopupOpen, setSuccPrintPopupOpen] = useState(false); 

  const [selectedPrinter, setSelectedPrinter] = useState({
    id: "",
    location: "",
  });

  const printers = [
    { id: "Printer#1", location: "A4 - 504", status: "Available", paper: 230 },
    { id: "Printer#2", location: "B4 - 202", status: "Available", paper: 155 },
    { id: "Printer#3", location: "C4 - 403", status: "Available", paper: 505 },
    { id: "Printer#4", location: "C6 - 103", status: "Available", paper: 696 },
    { id: "Printer#5", location: "Library", status: "Available", paper: 255 },
    { id: "Printer#6", location: "C5 - 301", status: "Available", paper: 400 },
    { id: "Printer#7", location: "B6 - 402", status: "Available", paper: 555 },
    { id: "Printer#8", location: "B1 - 202", status: "Available", paper: 555 },
    { id: "Printer#9", location: "B1 - 202", status: "Available", paper: 555 },
  ];

  const [selectedPage, setSelectedPage] = useState(null);

  const handleButtonClick = (page) => {
    setSelectedPage(page); // Cập nhật trạng thái nút được chọn
  };

  const handleChoosePrinterClick = (id, location) => {
    setSelectedPrinter({ id, location });
  };
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleUploadClick = () => setUploadPopupOpen(true);
  const closeUploadPopup = () => setUploadPopupOpen(false);

  const handlePropertiesClick = () => setPropertiesPopupOpen(true);
  const closePropertiesPopup = () => setPropertiesPopupOpen(false);

  const handleChooseClick = () => setChoosePopupOpen(true);
  const closeChoosePopup = () => setChoosePopupOpen(false);

  const handleConfirmClick = () => setConfirmPopupOpen(true);
  const closeConfirmPopup = () => setConfirmPopupOpen(false);

  const handleSuccPrintClick = () => setSuccPrintPopupOpen(true);
  const closeSuccPrintPopup = () => setSuccPrintPopupOpen(false);


  const [fileDetails, setFileDetails] = useState({
    name: "",
    size: "",
    type: "",
  });

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleBackToMain = () => {
    navigate("/main"); // Navigate to the 'main' page route
    closeSuccPrintPopup(); // Close the popup
  };

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
      const type = file.type.split("/")[1] || "Unknown";
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
                    <div className={docustyle.info_box}>
                      {fileDetails.name || ""}
                    </div>
                  </div>
                  <div className={docustyle.display_item}>
                    <p className={docustyle.action_desciption}>SIZE</p>{" "}
                    <div className={docustyle.info_box_size}>
                      {fileDetails.size || ""}
                    </div>
                    <p className={docustyle.action_desciption}>FILE TYPE</p>
                    <div className={docustyle.info_box_size}>
                      {fileDetails.type || ""}
                    </div>
                  </div>
                  <div className={docustyle.bottom}></div>
                </div>
              </div>
              <div className={docustyle.action_item}>
                <div
                  className={docustyle.display_item}
                  onClick={handlePropertiesClick}
                >
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
              <div
                className={docustyle.action_item}
                onClick={handleChooseClick}
              >
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
                  <div className={docustyle.info_box_printer}>
                    {selectedPrinter.id}
                  </div>
                  <div className={docustyle.info_box_location}>
                    {selectedPrinter.location}
                  </div>
                </div>
                <div className={docustyle.bottom}></div>
              </div>
              <button className={docustyle.print_btn} onClick={handleConfirmClick}>
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
              </div>
            )}
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
                <button
                  className={docustyle.upload_btn}
                  onClick={closeUploadPopup}
                >
                  <b>CANCEL</b>
                </button>
                <input
                  type="file"
                  id="fileUpload"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e)}
                />
                <button
                  className={docustyle.upload_btn}
                  onClick={() => document.getElementById("fileUpload").click()}
                >
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
                        <input
                        type="number"
                        min="1"
                        defaultValue="1"
                        className={docustyle.description_properties_button}
                      />
                  </div>
                  <div className={docustyle.properties_container_title_button}>
                    <p className={docustyle.description_properties}>
                      PAPER SIZE
                    </p>
                      <select className={docustyle.description_properties_button}>
                        <option value="A4">A4</option>
                        <option value="A3">A3</option>
                      </select>
                  </div>
                  <div className={docustyle.properties_container_title_button}>
                    <p className={docustyle.description_properties}>SIDED</p>
                    <select className={docustyle.description_properties_button}>
                    <option value="1">1-Sided</option>
                    <option value="2">2-Sided</option>
                  </select>
                  </div>
                </div>
                <div className={docustyle.blue_line}></div>
                {/*SECOND LINE*/}
                <div className={docustyle.page_setup_container}>
                  <p className={docustyle.page_setup_title}>PAGE SETUP</p>
                  <div className={docustyle.margin}>
                    <p className={docustyle.page_setup_description}>MARGIN</p>
                    <select className={docustyle.margin_button}>
                    <option value="inch" className={docustyle.margin_result}>inch</option>
                    <option value="cm" className={docustyle.margin_result}>cm</option>
                  </select>
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
                        onChange={(e) =>
                          handleMarginChange("left", e.target.value)
                        }
                      />
                      <input
                        type="number"
                        className={docustyle.margin_specific_button}
                        placeholder="0"
                        min="0"
                        value={margins.top}
                        onChange={(e) =>
                          handleMarginChange("top", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleMarginChange("right", e.target.value)
                        }
                      />
                      <input
                        type="number"
                        className={docustyle.margin_specific_button}
                        placeholder="0"
                        min="0"
                        value={margins.bottom}
                        onChange={(e) =>
                          handleMarginChange("bottom", e.target.value)
                        }
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
                  <button
                    className={docustyle.sheet_button}
                    onClick={() => handleButtonClick("onepage")}
                  >
                    <img
                      src={selectedPage === "onepage" ? onepage_after : onepage}
                      alt="OnePage"
                      className={docustyle.sheet_sticker}
                    />
                  </button>
                  
                  {/* Button 2 */}
                  <button
                    className={docustyle.sheet_button}
                    onClick={() => handleButtonClick("twopages")}
                  >
                    <img
                      src={selectedPage === "twopages" ? twopages_after : twopages}
                      alt="TwoPages"
                      className={docustyle.sheet_sticker}
                    />
                  </button>
                  
                  {/* Button 3 */}
                  <button
                    className={docustyle.sheet_button}
                    onClick={() => handleButtonClick("fourpages")}
                  >
                    <img
                      src={selectedPage === "fourpages" ? fourpages_after : fourpages}
                      alt="FourPages"
                      className={docustyle.sheet_sticker}
                    />
                  </button>
                  
                  {/* Button 4 */}
                  <button
                    className={docustyle.sheet_button}
                    onClick={() => handleButtonClick("sixpages")}
                  >
                    <img
                      src={selectedPage === "sixpages" ? sixpages_after : sixpages}
                      alt="SixPages"
                      className={docustyle.sheet_sticker}
                    />
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
                    >150</button>
                    <div className={docustyle.printrange}>
                    <input
                        type="number"
                        min="1"
                        defaultValue="1"
                        className={docustyle.margin_specific_button}
                      />
                      <p className={docustyle.page_setup_description_sheet}>
                        TO
                      </p>
                      <input
                        type="number"
                        min="1"
                        defaultValue="1"
                        className={docustyle.margin_specific_button}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={docustyle.right_properties}>
                <p className={docustyle.page_setup_description}>PREVIEW</p>
                <div className={docustyle.print_preview}>
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
                </div>
              )}
                </div>
              </div>
            </div>
            <button className={docustyle.done} onClick={closePropertiesPopup}>DONE</button>
          </div>
        </Popup>
        <Popup
          open={isChoosePopupOpen}
          onClose={closeChoosePopup}
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
          <h2 className={docustyle.title}>Printer List</h2>
          <div className={docustyle.grid_container_header}>
            <div className={docustyle.grid_header}>Printer ID</div>
            <div className={docustyle.grid_header}>Location</div>
            <div className={docustyle.grid_header}>Status</div>
            <div className={docustyle.grid_header}>Paper</div>
            <div className={docustyle.grid_header}>Select</div>
          </div>
          <div className={docustyle.scrollable_container}>
            <div className={docustyle.grid_container}>
              {printers.map((printer, index) => (
                <div className={docustyle.grid_row} key={index}>
                  <div className={docustyle.grid_item}>{printer.id}</div>
                  <div className={docustyle.grid_item}>{printer.location}</div>
                  <div className={docustyle.status_available}>Available</div>
                  <div className={docustyle.grid_item}>{printer.paper}</div>
                  <div className={docustyle.grid_item}>
                    <button
                      className={
                        selectedPrinter.id === printer.id
                          ? `${docustyle.grid_button} ${docustyle.selected_button}`
                          : docustyle.grid_button
                      }
                      onClick={() =>
                        handleChoosePrinterClick(printer.id, printer.location)
                      }
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={docustyle.parent_container}>
            <button
              className={docustyle.done_choose}
              onClick={closeChoosePopup}
            >
              DONE
            </button>
          </div>
        </Popup>
          {/* Popup Confirmation */}
          <Popup
  open={isConfirmPopupOpen} // State to control popup visibility
  onClose={closeConfirmPopup} // Function to close popup
  modal
  contentStyle={{
    backgroundColor: "#ffffff",
    // border: "1px solid #032B91",
    borderRadius: "20px",
    padding: "20px",
    height: "60%", // Adjusted height for smaller confirmation popup
    width: "50%",
    textAlign: "center",
  }}
  overlayStyle={{
    background: "rgba(0, 0, 0, 0.5)",
  }}
>
  <div>
    {/* Sticker */}
    <img
      src={confirm} // Replace this with the actual path or URL of your sticker
      alt="Sticker"
      style={{
        width: "250px", // Adjust size as needed
        height: "200px",
        marginBottom: "10px",
        marginTop: "20px",
      }}
    />

    {/* Title */}
    <h2 style={{ color: "#032B91", fontSize: "35px", fontWeight: "bold" }}>Confirmation</h2>

    {/* Message */}
    <p
  style={{
    color: "#032B91",
    fontSize: "22px",
    marginTop: "10px",
    maxWidth: "600px", // Giới hạn chiều rộng của đoạn văn bản
    margin: "10px auto", // Căn giữa đoạn văn bản
    lineHeight: "1.5", // Tăng khoảng cách dòng để dễ đọc hơn
  }}
>
  When you accept the print, the system will automatically print and deduct your paper balance.
</p>

    {/* Buttons */}
<div
  style={{
    marginTop: "20px",
    display: "flex", // Enable flexbox for layout
    justifyContent: "center", // Center buttons horizontally
    gap: "100px", // Large gap between buttons
  }}
>
  <button
    style={{
      width: "150px", // Fixed width for equal-sized buttons
      height: "50px", // Fixed height for equal button size
      backgroundColor: "#032B91",
      color: "white",
      border: "2px solid #032B91", // Blue border
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "center", // Center text inside button
    }}
    onClick={closeConfirmPopup}
  >
    CANCEL
  </button>
  <button
    style={{
      width: "150px", // Fixed width for equal-sized buttons
      height: "50px", // Fixed height for equal button size
      backgroundColor: "#032B91",
      color: "white",
      border: "2px solid #032B91", // Blue border
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "center", // Center text inside button
    }}
    onClick={handleSuccPrintClick}
  >
    PRINT
  </button>
</div>
  </div>
</Popup>
 {/* Succefully Print */}
 <Popup
  open={isSuccPrintPopupOpen} // State to control popup visibility
  onClose={closeSuccPrintPopup} // Function to close popup
  modal
  contentStyle={{
    backgroundColor: "#ffffff",
    // border: "1px solid #032B91",
    borderRadius: "20px",
    padding: "20px",
    height: "60%", // Adjusted height for smaller confirmation popup
    width: "50%",
    textAlign: "center",
  }}
  overlayStyle={{
    background: "rgba(0, 0, 0, 0.5)",
  }}
>
  <div>
    {/* Sticker */}
    <img
      src={printSucc} // Replace this with the actual path or URL of your sticker
      alt="Print Succefully"
      style={{
        width: "270px", // Adjust size as needed
        height: "210px",
        marginBottom: "10px",
        marginTop: "40px",
      }}
    />

    {/* Title */}
    <h2 style={{ marginTop: "35px", color: "#032B91", fontSize: "30px", fontWeight: "500" }}>Your file is printed successfully!</h2>

    {/* Buttons */}
<div
  style={{
    marginTop: "40px",
    display: "flex", // Enable flexbox for layout
    justifyContent: "center", // Center buttons horizontally
    gap: "100px", // Large gap between buttons
  }}
>
  <button
    style={{
      width: "300px", // Fixed width for equal-sized buttons
      height: "50px", // Fixed height for equal button size
      backgroundColor: "#032B91",
      color: "white",
      border: "2px solid #032B91", // Blue border
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "center", // Center text inside button
    }}
    onClick={handleBackToMain}
  >
    BACK TO MAIN
  </button>
</div>
  </div>
</Popup>

      </div>
    </div>
  );
}

export default PrintDocument;
