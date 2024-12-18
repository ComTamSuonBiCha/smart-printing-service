import React, { useEffect, useState } from "react";
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
import axios from "axios";

function PrintDocument() {
  const backend = process.env.REACT_APP_BACKEND_PORT;
  const studentID = localStorage.getItem("userid");

  const [isUploadPopupOpen, setUploadPopupOpen] = useState(false);
  const [isPropertiesPopupOpen, setPropertiesPopupOpen] = useState(false);
  const [isChoosePopupOpen, setChoosePopupOpen] = useState(false);

  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);

  const [isSuccPrintPopupOpen, setSuccPrintPopupOpen] = useState(false);
  const [fromPage, setFromPage] = useState(1);
  const [toPage, setToPage] = useState(1);
  const handleFromPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1) {
      setFromPage(value);

      if (value > toPage) {
        setError("'From' page cannot be greater than 'To' page.");
      } else {
        setError("");
      }
    }
  };

  const handleToPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1) {
      setToPage(value);

      if (value < fromPage) {
        setError("'To' page cannot be less than 'From' page.");
      } else {
        setError("");
      }
    }
  };

  const [selectedPrinter, setSelectedPrinter] = useState({
    id: "",
    location: "",
  });
  const [fileDetails, setFileDetails] = useState({
    name: "",
    size: "",
    type: "",
  });
  const [printerData, setPrinterData] = useState([]);

  // @ts-ignore
  const [error, setError] = useState("");

  const fetchPrinter = async () => {
    try {
      const response = await axios.get(`${backend}/api/printer`);
      if (response.data) {
        setPrinterData(response.data);
      } else {
        setError("No printer data found.");
      }
    } catch (err) {
      setError("Failed to fetch printer data.");
      console.error(err);
    }
  };
  const [margins, setMargins] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
  const handleUpdatePageBalance = async () => {
    try {
      const pages = toPage - fromPage;
      const body = { pages_minus: pages };

      const response = await axios.put(
        `${backend}/api/print/${studentID}/updateBalance`,
        body
      );

      if (response.data) {
        console.log(response.data);
      } else {
        setError("No printer data found.");
      }
    } catch (err) {
      setError("Failed to fetch printer data.");
      console.error(err);
    }
  };
  const handleSubmit = async () => {
    try {
      const body = {
        file: {
          file_name: fileDetails.name,
          file_size: fileDetails.size,
          file_type: fileDetails.type,
          no_of_pages: 10,
        },
        printer_id: selectedPrinter.id,
        time: "2024-12-12",
        side: "1",
        no_of_copies: 1,
        pages_per_sheet: 1,
        orientation: "portrait",
        page_size: "A4",
        left_margin: 1,
        right_margin: 1,
        top_margin: 1,
        bottom_margin: 1,
        page_from: fromPage,
        page_to: toPage,
      };

      const response = await axios.post(
        `${backend}/api/print/${studentID}/confirm`,
        body
      );

      if (response.data) {
        console.log(response.data);
      } else {
        setError("No printer data found.");
      }
    } catch (err) {
      setError("Failed to fetch printer data.");
      console.error(err);
    }
  };
  const handlePressButton = async () => {
    handleUpdatePageBalance();
    handleSubmit();
  };

  useEffect(() => {
    fetchPrinter();
  }, []);

  const [selectedPage, setSelectedPage] = useState(null);

  const handleButtonClick = (page) => {
    setSelectedPage(page);
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

  const handleSuccPrintClick = async () => {
    setSuccPrintPopupOpen(true);
    await handlePressButton();
  };
  const closeSuccPrintPopup = () => setSuccPrintPopupOpen(false);

  const navigate = useNavigate();

  const handleBackToMain = () => {
    navigate("/main");
    closeSuccPrintPopup();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const sizeInMB = file.size / (1024 * 1024);
      const roundedSizeInMB = Math.round(sizeInMB);
      const type = file.type.split("/")[1] || "Unknown";
      setFileDetails({
        name: file.name,
        // @ts-ignore
        size: roundedSizeInMB,
        type: type,
      });

      const url = URL.createObjectURL(file);

      // @ts-ignore
      setPreviewUrl(url);
    }
  };

  // @ts-ignore
  const formatFileSize = (sizeInMB) => {
    if (sizeInMB < 1) {
      return `${(sizeInMB * 1024).toFixed(2)} KB`;
    } else if (sizeInMB < 1024) {
      return `${sizeInMB.toFixed(2)} MB`;
    } else {
      return `${(sizeInMB / 1024).toFixed(2)} GB`;
    }
  };

  const handleMarginChange = (side, value) => {
    setMargins((prev) => ({ ...prev, [side]: value }));
  };

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
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
              <button
                className={docustyle.print_btn}
                onClick={handleConfirmClick}
              >
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
                  // @ts-ignore
                  onClick={() => document.getElementById("fileUpload").click()}
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
                  // @ts-ignore
                  onClick={() => closeUploadPopup(true)}
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
                  disabled={!fileDetails.name}
                  // @ts-ignore
                  onClick={() => closeUploadPopup(false)}
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
                      <option value="inch" className={docustyle.margin_result}>
                        inch
                      </option>
                      <option value="cm" className={docustyle.margin_result}>
                        cm
                      </option>
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
                        src={
                          selectedPage === "onepage" ? onepage_after : onepage
                        }
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
                        src={
                          selectedPage === "twopages"
                            ? twopages_after
                            : twopages
                        }
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
                        src={
                          selectedPage === "fourpages"
                            ? fourpages_after
                            : fourpages
                        }
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
                        src={
                          selectedPage === "sixpages"
                            ? sixpages_after
                            : sixpages
                        }
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
                    <button className={docustyle.margin_specific_button}>
                      150
                    </button>
                    <div className={docustyle.printrange}>
                      <input
                        type="number"
                        min="1"
                        value={fromPage}
                        onChange={handleFromPageChange}
                        className={docustyle.margin_specific_button}
                      />
                      <p className={docustyle.page_setup_description_sheet}>
                        TO
                      </p>
                      <input
                        type="number"
                        min="1"
                        value={toPage}
                        onChange={handleToPageChange}
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
            <button className={docustyle.done} onClick={closePropertiesPopup}>
              DONE
            </button>
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
              {printerData.map((printer, index) => (
                <div className={docustyle.grid_row} key={index}>
                  <div className={docustyle.grid_item}>
                    {
                      // @ts-ignore
                      printer.printer_id
                    }
                  </div>
                  <div className={docustyle.grid_item}>
                    {
                      // @ts-ignore
                      printer.location
                    }
                  </div>
                  <div className={docustyle.status_available}>Available</div>
                  <div className={docustyle.grid_item}>
                    {
                      // @ts-ignore
                      printer.paper_left
                    }
                  </div>
                  <div className={docustyle.grid_item}>
                    <button
                      className={
                        // @ts-ignore
                        selectedPrinter.id === printer.printer_id
                          ? `${docustyle.grid_button} ${docustyle.selected_button}`
                          : docustyle.grid_button
                      }
                      onClick={() =>
                        handleChoosePrinterClick(
                          // @ts-ignore
                          printer.printer_id,

                          // @ts-ignore
                          printer.paper_left
                        )
                      }
                    >
                      Choose
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
          open={isConfirmPopupOpen}
          onClose={closeConfirmPopup}
          modal
          contentStyle={{
            backgroundColor: "#ffffff",

            borderRadius: "20px",
            padding: "20px",
            height: "60%",
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
              src={confirm}
              alt="Sticker"
              style={{
                width: "250px",
                height: "200px",
                marginBottom: "10px",
                marginTop: "20px",
              }}
            />

            {/* Title */}
            <h2
              style={{ color: "#032B91", fontSize: "35px", fontWeight: "bold" }}
            >
              Confirmation
            </h2>

            {/* Message */}
            <p
              style={{
                color: "#032B91",
                fontSize: "22px",
                marginTop: "10px",
                maxWidth: "600px",
                margin: "10px auto",
                lineHeight: "1.5",
              }}
            >
              When you accept the print, the system will automatically print and
              deduct your paper balance.
            </p>

            {/* Buttons */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                gap: "100px",
              }}
            >
              <button
                style={{
                  width: "150px",
                  height: "50px",
                  backgroundColor: "#032B91",
                  color: "white",
                  border: "2px solid #032B91",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                onClick={closeConfirmPopup}
              >
                CANCEL
              </button>
              <button
                style={{
                  width: "150px",
                  height: "50px",
                  backgroundColor: "#032B91",
                  color: "white",
                  border: "2px solid #032B91",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
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
          open={isSuccPrintPopupOpen}
          onClose={closeSuccPrintPopup}
          modal
          contentStyle={{
            backgroundColor: "#ffffff",

            borderRadius: "20px",
            padding: "20px",
            height: "60%",
            width: "50%",
            textAlign: "center",
          }}
          overlayStyle={{
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div>
            <img
              src={printSucc}
              alt="Print Succefully"
              style={{
                width: "270px",
                height: "210px",
                marginBottom: "10px",
                marginTop: "40px",
              }}
            />

            <h2
              style={{
                marginTop: "35px",
                color: "#032B91",
                fontSize: "30px",
                fontWeight: "500",
              }}
            >
              Your file is printed successfully!
            </h2>

            <div
              style={{
                marginTop: "40px",
                display: "flex",
                justifyContent: "center",
                gap: "100px",
              }}
            >
              <button
                style={{
                  width: "300px",
                  height: "50px",
                  backgroundColor: "#032B91",
                  color: "white",
                  border: "2px solid #032B91",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
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
