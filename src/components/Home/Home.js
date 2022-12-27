import React, { useState } from "react";
import { Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Home.css";
import Result from "../Result/Result";

const { Configuration, OpenAIApi } = require("openai");

function Home() {
  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);
  const [bdData, setBdData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [marketing, setMarketing] = useState([]);
  const [goals, setGoals] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // const querry = `Create business checklist for a company of ${15} employees providing ${Web - development} services using ${DrupalMagneto} frameworks working in the ${Healthcare - Education} industries.`

  const onSubmit = async (data) => {
    setUserData(data);
    setLoading(true);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write 10 business development Activity ${data?.selectedServices?.toString()} agency should do to get new clients for agency`,
      max_tokens: 450,
      temperature: 1,
    });
    setBdData(completion?.data?.choices);

    const completion2 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write  10 points on how an ${data?.selectedFramework?.toString()} agency can make a marketing plan for their business:`,
      max_tokens: 450,
      temperature: 1,
    });
    setMarketing(completion2?.data?.choices);

    const completion3 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `3 sample okr for year 2023 ${data?.selectedServices?.toString()} agency niching industry ${data?.selectedIndustry?.toString()}`,
      max_tokens: 450,
      temperature: 1,
    });
    setGoals(completion3?.data?.choices);

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
  ];

  const industry = [
    "Advertising & Marketing ",
    "Arts, Entertainment & Music ",
    "Automotive",
    "Business Services",
    "Consumer Products & Services Dental",
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
    "Information Technology Legal Legal Cannabis Manufacturing Media",
    "Non-Profit X Politics Real Estate Retail",
    "Telecommunications",
    "Transportation",
    "Utilities",
    "Other Industries",
  ];

  return (
    <div className="rt-home mt-5">
      {bdData.length === 0 ? (
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h3>Please fill up the below information to proceed:</h3>

            <Form
              className="mt-3 bg-light p-4 shadow mb-3 rounded"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                      placeholder="xyz co"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlInput1"
                  >
                    {/* <Form.Label>Agency Size:</Form.Label>
                    <Form.Control
                  {...register("agencySize", { required: true })}
                  onChange={(e) => setAgencySize(e.target.value)}
                  type="number"
                  placeholder="Number of peoples"
                /> */}

                    <Form.Label>Agency Size: </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      {...register("agencySize", { required: true })}
                    >
                      <option>Select your Agency Size</option>
                      <option value="small">(1-10) Persons</option>
                      <option value="small">(11-20) Persons</option>
                      <option value="medium">(21-50) Persons</option>
                      <option value="large">50+ Persons</option>
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

              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      ) : (
        <Result
          bdData={bdData}
          userData={userData}
          marketing={marketing}
          goals={goals}
        ></Result>
      )}
    </div>
  );
}

export default Home;
