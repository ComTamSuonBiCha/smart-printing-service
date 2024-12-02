import React, { useState } from "react";
import "./printdocument.css";
import Header from "./header";
import logo from './component/BachKhoaLogo.png';
import upload from './component/File-upload.png';
import printer from './component/Printer2.png';
import properties from './component/Settings-adjust.png';

function PrintDocument() {
  return (
    <div className="container">
    <div className="print-document">
      <Header logo={logo}/>
      <main className="main-content">
        <div className="left-side">
        <h1>Print Document</h1>
        <p>Please fill out 3 components below before proceeding to the next step!</p>
        <div className="action-list">
            <div className="action-item">
                <div className="display-item">
                    <img src={upload} alt="File-Upload" className="icon"></img>
                    <p className="icon-title">UPLOAD FILE</p>
                </div>
                <p className="action-desciption">Upload your document here (PDF, DOCX, XLS, XLSX)</p>
                <div className="display-item">
                    <p className="action-desciption">NAME</p> <div className="info-box"></div>
                </div>

            </div>
            <div className="action-item">
                <div className="display-item">
                    <img src={properties} alt="Properties" className="icon"></img>
                    <p className="icon-title">SET UP YOUR PROPERTIES</p>
                </div>
                <p className="action-desciption">Set up your printing properties</p>

            </div>
            <div className="action-item">
                <div className="display-item">
                    <img src={printer} alt="Printer" className="icon"></img>
                    <p className="icon-title">CHOOSE PRINTER</p>
                </div>
                <p className="action-desciption">Choose available printer</p>

            </div>
        </div>
        <button className="print-btn">
          <b>PRINT</b>
        </button>
        </div>
        <div className="right-side">
            <p>Hi guys</p>
        </div>
      </main>
    </div>
    </div>
  );
}

export default PrintDocument;