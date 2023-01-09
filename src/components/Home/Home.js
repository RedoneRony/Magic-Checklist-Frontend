/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useEffect, useContext } from "react";
import { Col, Row, Form, Button, Spinner } from "react-bootstrap";
import countryList from "react-select-country-list";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";

import "./Home.css";
import Result from "../Result/Result";
import axios from "axios";
import { Link } from "react-router-dom";

const { Configuration, OpenAIApi } = require("openai");

function Home() {
  const { user } = useContext(AuthContext);
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_CHAT_GPT_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const [bdData, setBdData] = useState([]);
  const [bdData1, setBdData1] = useState([]);
  const [bdData2, setBdData2] = useState([]);
  const [userData, setUserData] = useState([]);
  const [marketing, setMarketing] = useState([]);
  const [marketing1, setMarketing1] = useState([]);
  const [marketing2, setMarketing2] = useState([]);
  const [goals, setGoals] = useState([]);
  const [goals1, setGoals1] = useState([]);
  const [service, setService] = useState("");
  const [framework, setFramework] = useState("");
  const [dbInfo, setDbInfo] = useState("");
  console.log("Hello");
  const [isLoading, setLoading] = useState(false);

  // storing questions
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [question4, setQuestion4] = useState("");
  const [question5, setQuestion5] = useState("");
  const [question6, setQuestion6] = useState("");
  const [question7, setQuestion7] = useState("");
  const [question8, setQuestion8] = useState("");

  const { register, handleSubmit, reset } = useForm();
  // country options
  const options = useMemo(() => countryList().getData(), []);

  const insertOtherInformationToDb = async (data) => {
    const addUserOtherInformation = {
      email: user.email,
      agencyName: data.agencyName,
      agencySize: data.agencySize,
      location: data.agencyLocation,
    };

    await axios
      .post(
        `${process.env.REACT_APP_SITE_API}/api/userOtherInformation/createList`,
        addUserOtherInformation
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = async (data) => {
    setUserData(data);
    setService(data?.selectedServices?.toString());
    setFramework(data?.selectedFramework?.toString());
    setLoading(true);

    // store user other information to db
    insertOtherInformationToDb(data);

    // storing data to the state
    setQuestion1(
      `Write 21 points on business development Activity a ${data?.selectedServices?.toString()} agency should do to get new clients for agency`
    );
    setQuestion2(
      `Write 6 types of sales activities that a ${data?.selectedServices?.toString()} agency can do`
    );
    setQuestion3(
      `List of 5 market place ${data?.selectedServices?.toString()} agency can find work with link to those website. Do not include Linkedin`
    );
    setQuestion4(
      `Write 10 points on how an ${
        framework === "Others" ? "Web application framework" : framework
      } agency can make a marketing plan for their business:`
    );
    setQuestion5(
      `Write  5  points ${framework} agency where they can submit their business to collect reviews and get new business including Clutch, Goodfirms, Google, Upcity, trustpilot`
    );
    setQuestion6(
      `Write me a 6 months Content plan in numbered format for ${data?.selectedServices?.toString()} Agency writing about ${framework}`
    );
    setQuestion7(
      `3 sample okr for ${data?.agencySize?.toString()} web development agency For Q1 to get more leads and warm leads for ${data?.selectedIndustry?.toString()}`
    );
    setQuestion8(
      `3 sample okr for year 2023 ${data?.selectedServices?.toString()} agency niching industry ${data?.selectedIndustry?.toString()}`
    );

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write 21 points on business development Activity a ${data?.selectedServices?.toString()} agency should do to get new clients for agency`,
      max_tokens: 1500,
      temperature: 1,
    });
    setBdData(completion?.data?.choices);

    const completion2 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write 6 types of sales activities that a ${data?.selectedServices?.toString()} agency can do`,
      max_tokens: 1500,
      temperature: 1,
    });
    setBdData1(completion2?.data?.choices);

    const completion3 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `List of 5 market place ${data?.selectedServices?.toString()} agency can find work with link to those website. Do not include Linkedin`,
      max_tokens: 1500,
      temperature: 1,
    });
    setBdData2(completion3?.data?.choices);

    const completion4 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write 10 points on how an ${
        framework === "Others" ? "Web application framework" : framework
      } agency can make a marketing plan for their business:`,
      max_tokens: 1500,
      temperature: 1,
    });
    setMarketing(completion4?.data?.choices);

    const completion5 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write  5  points ${
        framework === "Others" ? "Web application framework" : framework
      } agency where they can submit their business to collect reviews and get new business including Clutch, Goodfirms, Google, Upcity, trustpilot`,
      max_tokens: 1500,
      temperature: 1,
    });
    setMarketing1(completion5?.data?.choices);

    const completion6 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write me a 6 months Content plan in numbered format for ${data?.selectedServices?.toString()} Agency writing about ${
        framework === "Others" ? "Web application framework" : framework
      }`,
      max_tokens: 1500,
      temperature: 1,
    });
    setMarketing2(completion6?.data?.choices);

    const completion7 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `3 sample okr for ${data?.agencySize?.toString()} web development agency For Q1 to get more leads and warm leads for ${data?.selectedIndustry?.toString()}`,
      max_tokens: 1500,
      temperature: 1,
    });

    setGoals(completion7?.data?.choices);

    const completion8 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `3 sample okr for year 2023 ${data?.selectedServices?.toString()} agency niching industry ${data?.selectedIndustry?.toString()}`,
      max_tokens: 1500,
      temperature: 1,
    });
    setGoals1(completion8?.data?.choices);

    setLoading(false);
    reset();
  };

  const services = [
    "General Marketing",
    "Social media Marketing",
    "SEO",
    "General Web Development",
    "Custom Software Development",
    "Mobile App Development",
    "E- Commerce Development",
    "Graphics Design",
    "Quality Assurance",
    "UX / UI Design",
  ];

  const frameWorks = [
    "WordPress",
    "HubSpot",
    "WooCommerce",
    "Drupal",
    "Wix",
    "Magento",
    "Shopify",
    "Squarespace",
    "Angular",
    "ASP.NETCore",
    "Django",
    "Express",
    "jQuery",
    "Laravel",
    "React",
    "Ruby on Rails",
    "Vue.js",
    "GoHighLevel",
    "Others",
  ];

  const industry = [
    "Advertising & Marketing ",
    "Arts, Entertainment & Music",
    "Automotive",
    "Business Services",
    "Consumer Products & Services",
    "ECommerce",
    "Education ",
    "Energy",
    "Energy & Natural Resources",
    "Financial Services",
    "Gambling",
    "Gaming",
    "Government",
    "GPS, Navigation & GIS",
    "Health Care & Medical ",
    "Hospitality & Leisure ",
    "Information Technology",
    "Manufacturing",
    "Non-Profit",
    "Real Estate",
    "Telecommunications",
    "Transportation",
    "Utilities",
    "Other Industries",
  ];

  useEffect(() => {
    const getEmployeeEmails = async () => {
      await axios
        .get(`${process.env.REACT_APP_SITE_API}/api/okr/getAll`, {
          headers: {
            "Content-Type": "application/json",
            email: `${user?.email}`,
          },
        })
        .then((response) => {
          setDbInfo(response?.data[0]?.email);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getEmployeeEmails();
  }, []);

  return (
    <div className="rt-home mt-5">
      {bdData.length === 0 ? (
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Form
              className="my-4 bg-white rounded-4 shadow p-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Row>
                <Col>
                  <h4 className="brand-color mb-4">
                    <small>Welcome To Magic Checklist!</small>
                    <br /> Get started with Magic Checklist by filling out the
                    form below
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Agencey Name:</Form.Label>
                    <Form.Control
                      {...register("agencyName", { required: true })}
                      type="text"
                      placeholder="Your agency name"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Agency Size: </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      {...register("agencySize", { required: true })}
                    >
                      <option>Select your agency size</option>
                      <option value="small">(1-10)</option>
                      <option value="small">(11-20)</option>
                      <option value="medium">(21-50)</option>
                      <option value="large">50+</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Location: </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      {...register("agencyLocation", { required: true })}
                    >
                      <option>United Sates</option>
                      {options.map((x) => (
                        <option key={x.value}>{x.label}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="mb-4">
                    <Form.Label>
                      {" "}
                      Choose Your Services : (Pick 2 For Best Result ){" "}
                    </Form.Label>
                    {services.map((item, index) => (
                      <Form.Check
                        key={index}
                        id={item}
                        label={item}
                        value={item}
                        {...register("selectedServices", { required: true })}
                      />
                    ))}
                  </div>
                </Col>
                <Col>
                  <div className="mb-4">
                    <Form.Label>
                      {" "}
                      Choose Your Framework : (Pick 2 For Best Result ){" "}
                    </Form.Label>
                    {frameWorks.map((item, index) => (
                      <Form.Check
                        key={index}
                        id={item}
                        label={item}
                        value={item}
                        {...register("selectedFramework", { required: true })}
                      />
                    ))}
                  </div>
                </Col>
              </Row>

              <div className="mb-4">
                <Form.Label>
                  {" "}
                  Choose Your Industry : (Pick 2 For Best Result ){" "}
                </Form.Label>{" "}
                <br />
                {industry.map((item, index) => (
                  <Form.Check
                    inline
                    key={index}
                    id={item}
                    label={item}
                    value={item}
                    {...register("selectedIndustry", { required: true })}
                  />
                ))}
              </div>
              <div className="d-flex justify-content-center">
                {isLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : dbInfo === user?.email ? (
                  <h5>
                    If you wants to generate your magic checklist again please
                    remove the old data from <Link to="/db/result">here</Link>
                  </h5>
                ) : (
                  <Button type="submit" className="rt-btn-on">
                    Magic Checklist
                  </Button>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      ) : (
        <Result
          bdData={bdData}
          bdData1={bdData1}
          bdData2={bdData2}
          userData={userData}
          marketing={marketing}
          marketing1={marketing1}
          marketing2={marketing2}
          goals={goals}
          goals1={goals1}
          service={service}
          framework={framework}
          question1={question1}
          question2={question2}
          question3={question3}
          question4={question4}
          question5={question5}
          question6={question6}
          question7={question7}
          question8={question8}
        ></Result>
      )}
    </div>
  );
}

export default Home;
