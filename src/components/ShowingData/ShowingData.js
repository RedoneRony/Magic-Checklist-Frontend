import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { Tab, Tabs, Col, Row, Nav, Spinner, Button } from "react-bootstrap";
import { FaHandshake, FaRegDotCircle, FaRocket } from "react-icons/fa";
import "./ShowingData.css";

function ShowingData() {
  const { user } = useContext(AuthContext);
  const [salesActivity, setSalesActivity] = useState([]);
  const [marketPlace, setMarketPlace] = useState([]);
  const [webDirectories, setWebDirectories] = useState([]);
  const [contentPlan, setContentPlan] = useState([]);
  
  const [bdData, setBdData] = useState([]);
  const [bdFullData, setBdFullData] = useState([]);

  const [bdDataId, setBdDataId] = useState("");

  const [mData, setMData] = useState([]);
  const [mDataFull, setMDataFull] = useState([]);
  const [mDataId, setMDataId] = useState("");

  const [okrData, setOkrData] = useState([]);
  const [okrDataFull, setOkrDataFull] = useState([]);
  const [okrDataId, setOkrDataBd] = useState("");
  const navigate = useNavigate();
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
        setBdData([])
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
        setMData([])
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
        setOkrData([])
      })
      .catch((error) => {
        console.log(error);
      });

    if (response1 === 200 && response2 === 200 && response3 === 200) {
      navigate("/db/home");
    }
  };

  function formatData(data) {
    // const res1 = data[0];
    // const res2 = res1?.replace("\n\n", "\n");
    const formatedIdeas = data[0]?.split("\n");
    const array = [];
    const test = formatedIdeas?.map((item) => {
      if (item !== "") {
        array.push(item);
      }
    });
    return array;
  }

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
          setBdFullData(response.data[0]);
          const bdData = formatData(response?.data[0]?.bdCheckList);
          const salesData = formatData(response?.data[0]?.salesActivity);
          const marketPlaceData = formatData(response?.data[0]?.marketPlace);
          if (bdData) {
            setBdData(bdData);
            setSalesActivity(salesData);
            setMarketPlace(response?.data[0]?.marketPlace);
            setBdDataId(response?.data[0]?._id);
          }
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
          const salesData = formatData(response?.data[0]?.marketingCheckList);
          const webDirectories = formatData(response?.data[0]?.webDirectories);
          setMDataFull(response.data[0]);
          setMData(salesData);
          setContentPlan(response?.data[0]);
          setWebDirectories(webDirectories);
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
          setOkrDataFull(response.data[0]);
          setOkrData(response?.data[0]);
          setOkrDataBd(response?.data[0]?._id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getEmployeeEmails();
  }, [!bdData, !mData, !okrData]);

  return (
    <>
      <div className="mt-4 rt-showing-data">
        <Tab.Container defaultActiveKey="businessDevelopment">
          <Row>
            <Col sm={10}>
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="businessDevelopment" className="rt-btn">
                    <FaHandshake /> Business Development
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="marketing" className="rt-btn">
                    <FaRocket /> Marketing
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="okr" className="rt-btn">
                    <FaRegDotCircle /> OKR
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col>
              <div className="mb-3">
                <Button onClick={deleteData} className="rt-btn">
                  Delete & Regenerate
                </Button>
              </div>
            </Col>
            <Col sm={12}>
              <Tab.Content className="my-4 bg-white rounded-4 shadow p-4">
                {bdData && mData && okrData ? (
                  <>
                    <Tab.Pane eventKey="businessDevelopment">
                      <h4 className="rt-result-hading brand-color p-4">
                        {bdFullData?.bdCheckListTitle}
                      </h4>
                      <div className="mb-4 p-4">
                        {bdData ? (
                          bdData?.slice(0, 20).map((item, index) => (
                            <>
                              <p key={index}>{item}</p>
                            </>
                          ))
                        ) : (
                          <h4>
                            Calculating...
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          </h4>
                        )}
                      </div>
                      <h4 className="rt-result-hading brand-color p-4">
                      {bdFullData?.salesActivityTitle}
                      </h4>
                      <div className="mb-4 p-4">
                        {salesActivity ? (
                          salesActivity?.slice(0, 5).map((item, index) => (
                            <>
                              <p key={index}>{item}</p>
                            </>
                          ))
                        ) : (
                          <h4>
                            Calculating...
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          </h4>
                        )}
                      </div>
                      <h4 className="rt-result-hading brand-color p-4">
                       {bdFullData?.marketPlaceTitle}
                      </h4>
                      <div className="mb-4 p-4">
                        {marketPlace ? (
                          marketPlace?.map((item, index) => (
                            <>
                              <p key={index}>{item}</p>
                            </>
                          ))
                        ) : (
                          <h4>
                            Calculating...
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          </h4>
                        )}
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="marketing">
                      <h4 className="rt-result-hading brand-color p-4">
                        {mDataFull?.marketingCheckListTitle}
                      </h4>
                      <div className="mb-4 p-4">
                        {mData ? (
                          mData?.map((item, index) => (
                            <>
                              <p key={index}>{item}</p>
                            </>
                          ))
                        ) : (
                          <h4>
                            Calculating...
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          </h4>
                        )}
                      </div>
                      <h4 className="rt-result-hading brand-color p-4">
                        {mDataFull.webDirectoriesTitle}
                      </h4>
                      <div className="mb-4 p-4">
                        {webDirectories ? (
                          webDirectories?.map((item, index) => (
                            <>
                              <p key={index}>{item}</p>
                            </>
                          ))
                        ) : (
                          <h4>
                            Calculating...
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          </h4>
                        )}
                      </div>

                      <h4 className="rt-result-hading brand-color p-4">
                        {mDataFull.contentPlanTitle}
                      </h4>
                      <pre>{contentPlan?.contentPlan}</pre>
                    </Tab.Pane>
                    <Tab.Pane eventKey="okr">
                      <h4 className="rt-result-hading brand-color p-4">
                        {okrDataFull.okr1Title}
                      </h4>
                      <pre>{okrData?.okrQ1}</pre>
                      <h4 className="rt-result-hading brand-color p-4">
                        {okrDataFull.okrYearTitle}
                      </h4>
                      <pre>{okrData?.okrYear}</pre>
                    </Tab.Pane>
                  </>
                ) : (
                  <h5>
                    Please <Link to="/db/home">Generate</Link> your Magic
                    Checklist First
                  </h5>
                )}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>


    </>
  );
}

export default ShowingData;
