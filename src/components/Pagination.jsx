import React, { useContext, useState } from "react";
import { DataContext } from "../Context/DataContext";

const Pagination = ({
  numbers,
  currentPage,
  setCurrentPage,
  firstIndex,
  lastIndex,
}) => {
  const prevPage = () => {};
  const nextPage = () => {};
  const changPage = (id) => {
    setCurrentPage(id);
  };
  return (
    <></>
  );
};

export default Pagination;
