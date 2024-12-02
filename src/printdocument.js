import React, { useState } from "react";
import docustyle from "./printdocument.module.css";
import Header from "./header";
import logo from './component/BachKhoaLogo.png';
import upload from './component/File-upload.png';
import printer from './component/Printer2.png';
import properties from './component/Settings-adjust.png';
import arrow from './component/arrow.png';

function PrintDocument() {
  return (
    <div className={docustyle.container}>
    <div className={docustyle.print_document}>
      <Header logo={logo}/>
      <main className={docustyle.main_content}>
        <div className={docustyle.left_side}>
        <h1>Print Document</h1>
        <p className={docustyle.greeting}>Please fill out 3 components below before proceeding to the next step!</p>
        <div className={docustyle.action_list}>
            <div className={docustyle.action_item}>
                <div>
                <div className={docustyle.display_item}>
                    <img src={upload} alt="File-Upload" className={docustyle.icon}></img>
                    <p className={docustyle.icon_title}>UPLOAD FILE</p>
                    <img src={arrow} alt="arrow" className={docustyle.arrow}></img>
                </div>
                <p className={docustyle.action_desciption}>Upload your document here (PDF, DOCX, XLS, XLSX)</p>
                <div className={docustyle.display_item}>
                    <p className={docustyle.action_desciption}>NAME</p> <div className={docustyle.info_box}></div>
                </div>
                <div className={docustyle.display_item}>
                    <p className={docustyle.action_desciption}>SIZE</p> <div className={docustyle.info_box_size}></div>
                    <p className={docustyle.action_desciption}>FILE TYPE</p><div className={docustyle.info_box_size}></div>
                </div>
                <div className={docustyle.bottom}></div>
                </div>

            </div>
            <div className={docustyle.action_item}>
                <div className={docustyle.display_item}>
                    <img src={properties} alt="Properties" className={docustyle.icon}></img>
                    <p className={docustyle.icon_title}>SET UP YOUR PROPERTIES</p>
                    <img src={arrow} alt="arrow" className={docustyle.arrow}></img>
                </div>
                <p className={docustyle.action_desciption}>Set up your printing properties</p>
                <div className={docustyle.bottom}></div>

            </div>
            <div className={docustyle.action_item}>
                <div className={docustyle.display_item}>
                    <img src={printer} alt="Printer" className={docustyle.icon}></img>
                    <p className={docustyle.icon_title}>CHOOSE PRINTER</p>
                    <img src={arrow} alt="arrow" className={docustyle.arrow}></img>
                </div>
                <p className={docustyle.action_desciption}>Choose available printer</p>
                <div className={docustyle.display_item}>
                    <p className={docustyle.action_desciption}>Printer ID</p> 
                    <p className={docustyle.space}></p>
                    <p className={docustyle.action_desciption} >Location</p>
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
        </div>
      </main>
    </div>
    
    </div>
  );
}

export default PrintDocument;