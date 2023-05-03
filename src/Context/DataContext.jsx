import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";
import Papa from "papaparse";

export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [fileData, setFileData] = useState([]);
  const [data, setData] = useState([]);
  const [columnArr, setColumn] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  // file state
  const [fileLoading, setFileLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const dataRef = collection(db, "data");
      const q = query(dataRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (querySnapshot) => {
        const dt = querySnapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setFileData(dt);
      });
    };
    getData();
  }, []);
  // read file
  const importFile = async (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const columnArr = [];
        const valueArr = [];
        result.data.map((d) => {
          columnArr.push(Object.keys(d));
          valueArr.push(Object.values(d));
          return d;
        });
        setData(result.data);
        setColumn(columnArr[0]);
      },
    });
  };
  const uploadData = async (file) => {
    setFileLoading(true);
    await addDoc(collection(db, "data"), {
      filename: file.name,
      filesize: file.size,
      data: data,
      columnArr: columnArr,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        console.log("ok");
      })
      .catch((err) => {
        console.error(err.message);
      });
    setFileLoading(false);
  };
  const deleteFile = async (id) => {
    setDeleteLoading(true);
    await deleteDoc(doc(db, "data", id))
      .then(() => {
        console.log("Xóa thành công");
        setDeleteLoading(false);
        setDeleteModal(false);
      })
      .catch((err) => {
        console.error(err.message);
        setDeleteLoading(false);
      });
  };
  const updateData = async (id, data) => {
    setUpdateLoading(true);
    const dataRef = doc(db, "data", id);
    await updateDoc(dataRef, {
      data: data,
    })
      .then(() => {
        console.log("Update thành công");
      })
      .catch((err) => {
        console.error(err.message);
      });
    setUpdateLoading(false);
  };
  return (
    <DataContext.Provider
      value={{
        fileData,
        importFile,
        uploadData,
        fileLoading,
        deleteFile,
        deleteLoading,
        deleteModal,
        setDeleteModal,
        updateData,
        updateLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
