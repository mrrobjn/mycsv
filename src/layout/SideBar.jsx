import React, { useContext, useEffect, useState } from "react";
import "../assets/SideBar.scss";
import { DataContext } from "../Context/DataContext";
import Loading from "./Loading";

const SideBar = () => {
  const [file, setFile] = useState();
  const { importFile, uploadData, fileLoading } = useContext(DataContext);
  useEffect(() => {
      file && importFile(file);
  }, [file]);
  const handleFile = (e) => {
    e.preventDefault();
    uploadData(file);
  };
  return (
    <div className="sidebar-container">
      <div className="heading">
        <h1>MY <i className="fa-solid fa-file-csv"></i></h1>
      </div>
      <form onSubmit={handleFile}>
        <div className="input-field">
          <label htmlFor="file">Chọn file</label>
          <span>{file?.name||"Tên file..."}</span>
          <input
            id="file"
            type="file"
            name="file"
            accept=".csv"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {file ? (
          <button type="submit" disabled={fileLoading}>
            {fileLoading ? <Loading /> : ""}
            <p style={{ paddingLeft: fileLoading ? 10 : "" }}>Tải lên</p>
          </button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default SideBar;
