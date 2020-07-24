import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  
  const getData = () => {

    axiosWithAuth()
      .get('/api/colors')
      .then(response => {

        setColorList(response.data);

      })
      .catch(error => {

        console.log(error);

      });

  };

  useEffect(() => {

    getData();

  }, []);



  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
