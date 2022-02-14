import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const tempUrl =
  "https://opentssdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchQuestions = async () => {
    setLoading(true);
    setWaiting(false);
    // ***** axios with async await and try catch block *****
    // try {
    //   const response = await axios.get(tempUrl);
    //   console.log("hello");
    //   const data = response.data.results;
    //   console.log(response);
    //   if (data.length > 0) {
    //     setQuestions(data);
    //     setLoading(false);
    //     setWaiting(false);
    //     setError(false);
    //   } else {
    //     setWaiting(true);
    //     setError(true);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   setWaiting(true);
    //   setError(true);
    // }

    // ***** axios with async await and normal catch *****
    const response = await axios.get(tempUrl).catch((error) => {
      console.log(error);
    });
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      console.log("caners");
      setWaiting(true);
      setError(true);
    }
    console.log(response);
  };
  useEffect(() => {
    fetchQuestions(tempUrl);
    // ***** axios with then *****
    // axios
    //   .get(tempUrl)
    //   .then((response) => {
    //     const data = response.data.results;
    //     if (data.length > 0) {
    //       setQuestions(data);
    //       setLoading(false);
    //       setWaiting(false);
    //       setError(false);
    //     } else {
    //       setWaiting(true);
    //       setError(true);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
