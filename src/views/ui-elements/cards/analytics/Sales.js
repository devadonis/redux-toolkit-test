// ** Third Party Components
import Chart from "react-apexcharts";
import { Circle } from "react-feather";

// ** Reactstrap Imports
import { Card, CardBody, CardHeader, CardTitle, Col } from "reactstrap";
import React from "react";

const PieChart = ({ series, primary, info }) => {
  const options = {
    chart: {
      type: "pie",
      height: 500,
    },
    labels: ["Quotes", "Sales"],
    colors: [info, primary],
    legend: {
      position: "bottom",
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      height={400}
      width={"100%"}
    />
  );
};

const Sales = ({ data, primary, info }) => {
  const series = [
    parseFloat(data.totalQuotesLines.reduce((a, b) => a + b, 0)),
    parseFloat(data.totalSalesLines.reduce((a, b) => a + b, 0)),
  ];
  const seriesSales = [
    parseFloat(
      data.quotesData.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    ),
    parseFloat(
      data.salesData.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    ),
  ];

  return (
    <div
      className={"justify-content-between"}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignContent: "space-between",
      }}
    >
      <Col xl={6} lg={6} sm={12}>
        <Card style={{ width: "100%" }}>
          <CardHeader className="d-flex justify-content-between align-items-start pb-1">
            <div>
              <CardTitle className="mb-25" tag="h4">
                Quote to Order Ratio
              </CardTitle>
            </div>
          </CardHeader>

          <CardBody>
            <div className="d-inline-block me-1">
              <div className="d-flex align-items-center">
                <Circle size={13} className="text-primary me-50" />
                <h6 className="mb-0">Sales</h6>
              </div>
            </div>
            <div className="d-inline-block">
              <div className="d-flex align-items-center">
                <Circle size={13} className="text-info me-50" />
                <h6 className="mb-0">Quotes</h6>
              </div>
            </div>
            <PieChart
              data={data}
              primary={primary}
              info={info}
              series={series}
            />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6} lg={6} sm={12}>
        <Card className={"w-100"} style={{ width: "100%" }}>
          <CardHeader className="d-flex justify-content-between align-items-start pb-1">
            <div>
              <CardTitle className="mb-25" tag="h4">
                Quote to Order Ratio by amount
              </CardTitle>
            </div>
          </CardHeader>

          <CardBody>
            <div className="d-inline-block me-1">
              <div className="d-flex align-items-center">
                <Circle size={13} className="text-primary me-50" />
                <h6 className="mb-0">Sales</h6>
              </div>
            </div>
            <div className="d-inline-block">
              <div className="d-flex align-items-center">
                <Circle size={13} className="text-info me-50" />
                <h6 className="mb-0">Quotes</h6>
              </div>
            </div>
            <PieChart
              data={data}
              primary={primary}
              info={info}
              series={seriesSales}
            />
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Sales;
