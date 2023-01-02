import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
function ShowingData() {
  const { user } = useContext(AuthContext);
  const [bdData, setBdData] = useState([]);
  const [bdDataId, setBdDataId] = useState("");
  const [mData, setMData] = useState([]);
  const [mDataId, setMDataId] = useState("");
  const [okrData, setOkrData] = useState([]);
  const [okrDataId, setOkrDataBd] = useState("");
  const navigate = useNavigate();
  console.log("Bd Data", bdData);
  console.log("mData", mData);
  console.log("okrData", okrData);

  let response1 = "";
  let response2 = "";
  let response3 = "";

  const deleteData = async () => {
    // delete business data
    await axios
      .delete(`${process.env.REACT_APP_SITE_API}/api/bd/delete`, {
        headers: {
          "Content-Type": "application/json",
          id: `${bdDataId}`,
        },
      })
      .then((response) => {
        response1 = response.status;
      })
      .catch((error) => {
        console.log(error);
      });
    // delete marketing data
    await axios
      .delete(`${process.env.REACT_APP_SITE_API}/api/marketing/delete`, {
        headers: {
          "Content-Type": "application/json",
          id: `${mDataId}`,
        },
      })
      .then((response) => {
        response2 = response.status;
      })
      .catch((error) => {
        console.log(error);
      });
    // delete okr data
    await axios
      .delete(`${process.env.REACT_APP_SITE_API}/api/okr/delete`, {
        headers: {
          "Content-Type": "application/json",
          id: `${okrDataId}`,
        },
      })
      .then((response) => {
        response3 = response.status;
      })
      .catch((error) => {
        console.log(error);
      });

    if (response1 === 200 && response2 === 200 && response3 === 200) {
      navigate("/db/home");
    }
  };

  useEffect(() => {
    const getEmployeeEmails = async () => {
      // business data
      await axios
        .get(`${process.env.REACT_APP_SITE_API}/api/bd/getAll`, {
          headers: {
            "Content-Type": "application/json",
            email: `${user?.email}`,
          },
        })
        .then((response) => {
          setBdData(response);
          setBdDataId(response?.data[0]?._id);
        })
        .catch((error) => {
          console.log(error);
        });

      // marketing data
      await axios
        .get(`${process.env.REACT_APP_SITE_API}/api/marketing/getAll`, {
          headers: {
            "Content-Type": "application/json",
            email: `${user?.email}`,
          },
        })
        .then((response) => {
          setMData(response);
          setMDataId(response?.data[0]?._id);
        })
        .catch((error) => {
          console.log(error);
        });

      // okr data
      await axios
        .get(`${process.env.REACT_APP_SITE_API}/api/okr/getAll`, {
          headers: {
            "Content-Type": "application/json",
            email: `${user?.email}`,
          },
        })
        .then((response) => {
          setOkrData(response);
          setOkrDataBd(response?.data[0]?._id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getEmployeeEmails();
  }, []);

  return (
    <div>
      <button onClick={deleteData}>Delete Data</button>
    </div>
  );
}

export default ShowingData;
