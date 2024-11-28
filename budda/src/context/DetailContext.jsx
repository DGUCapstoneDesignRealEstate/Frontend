import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";

const DetailContext = createContext();
export const useDetailContext = () => useContext(DetailContext);

export const DetailProvider = ({ children }) => {
  const dataId = parseInt(useParams().id);
  const [aptInfo, setAptInfo] = useState(null);

  useEffect(() => {
    fetchAptDetail();
  }, [dataId]);

  const fetchAptDetail = async () => {
    try {
      const response = await axios.get(`apartment-transactions/${dataId}`);
      console.log(response.data);
      setAptInfo(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DetailContext.Provider
      value={{
        aptInfo,
        dataId,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
};
