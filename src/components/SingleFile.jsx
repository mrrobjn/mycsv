import React, { useContext, useEffect, useState } from "react";
import "../assets/SingleFile.scss";
import { useParams } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import { CSVLink } from "react-csv";
const SingleFile = () => {
  const { tableId } = useParams();
  const { fileData, updateData } = useContext(DataContext);
  const singleTable = fileData && fileData.find((data) => data.id === tableId);
  const [data, setData] = useState([]);
  let timer = null;
  const headers = singleTable?.data.columnArr.map((s) => {
    return {
      label: s,
      key: s,
    };
  });
  useEffect(() => {
    setData(singleTable?.data.data);
  }, [singleTable]);
  const handleDataChange = (index, event, label) => {
    clearTimeout(timer);
    const newData = [...data];
    newData[index][label] = event.target.value;
    timer = setTimeout(() => {
      updateData(tableId, newData);
    }, 1000);
  };
  return (
    <>
      <div className="single-file-container">
        <div className="file-name">
          <p>
            Đang mở: <span>{singleTable?.data.filename}</span>
          </p>
          <div className="button-container">
            {singleTable && (
              <CSVLink
                data={singleTable.data.data}
                filename={singleTable.data.filename}
                className="export-btn"
                headers={headers}
              >
                Tải về <i className="fa-solid fa-download"></i>
              </CSVLink>
            )}
          </div>
        </div>
        <div className="table-box">
          <table>
            <thead>
              <tr>
                {singleTable?.data.columnArr.map((col, index) => {
                  return <th key={index}>{col}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data?.map((value, index) => {
                return (
                  <tr key={index}>
                    {headers.map((v, i) => {
                      return (
                        <td key={i}>
                          <input
                            type="text"
                            defaultValue={value[v.label]}
                            onChange={(e) =>
                              handleDataChange(index, e, v.label)
                            }
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SingleFile;
