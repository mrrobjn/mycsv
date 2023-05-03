import React, { useContext, useState } from "react";
import "../assets/FileList.scss";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context/DataContext";
import Loading from "../layout/Loading";
const FileList = () => {
  const { fileData, deleteFile, deleteLoading, deleteModal, setDeleteModal } =
    useContext(DataContext);
  const [deleteId, setDeleteId] = useState();
  const navigate = useNavigate();
  //
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 8;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const record = fileData?.slice(firstIndex, lastIndex);
  const pageNumber = Math.ceil(fileData.length / recordPerPage);
  const numbers = [...Array(pageNumber + 1).keys()].slice(1);
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDeleteId();
  };
  const handleDelete = () => {
    deleteFile(deleteId);
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== pageNumber) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changPage = (id) => {
    setCurrentPage(id);
  };
  return (
    <>
      <div className="list-container">
        {deleteModal ? (
          <>
            <div className="modal-background"></div>
            {/* delete modal */}
            <div className="delete-modal">
              <p className="confirm-text">Xóa vĩnh viễn file?</p>
              <div className="btn-handle">
                <button
                  className="avoid-btn"
                  onClick={() => closeDeleteModal()}
                >
                  Hủy
                </button>
                <button className="confirm-btn" disabled={deleteLoading} onClick={() => handleDelete()}>
                  {deleteLoading ? <Loading color={"#fff"} /> : ""}
                  <p style={{ paddingLeft: deleteLoading ? 10 : 0 }}>
                    Xác nhận
                  </p>
                </button>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Ngày tải lên</th>
              <th>Kích cỡ tệp</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {record?.map((data) => {
              const date = data.data.timestamp?.toDate();
              const formattedDate =
                date &&
                `${
                  date.getDate() + 1
                } thg ${date.getMonth()}, ${date.getFullYear()}`;
              return (
                <tr key={data.id}>
                  <td onClick={() => navigate(`/${data.id}`)}>
                    {data.data.filename}
                  </td>
                  <td onClick={() => navigate(`/${data.id}`)}>
                    {formattedDate}
                  </td>
                  <td onClick={() => navigate(`/${data.id}`)}>
                    {Math.round(data.data.filesize / 1000)} kb
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => openDeleteModal(data.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <button onClick={() => prevPage()} type="button">
                <i className="fa-solid fa-angle-left"></i> Xóa
              </button>
            </li>
            {numbers.map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={i}
              >
                <button onClick={() => changPage(n)} type="button">
                  {n}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button onClick={() => nextPage()} type="button">
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default FileList;
