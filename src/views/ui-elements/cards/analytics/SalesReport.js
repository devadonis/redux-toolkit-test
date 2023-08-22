import React from "react";
import Chart from "react-apexcharts";
import { Card, Col, Row } from "reactstrap";

const SalesReport = ({ data }) => {
  const {
    categories,
    salesData,
    quotesData,
    totalSalesLines,
    totalQuotesLines,
  } = data;

  const revenueOptions = {
    chart: {
      stacked: false,
      type: "area",
      toolbar: { show: true },
    },
    grid: {
      padding: {
        top: -20,
        bottom: -10,
      },
      yaxis: {
        lines: { show: true },
      },
      xaxis: {
        lines: { show: true },
      },
    },
    xaxis: {
      categories: categories.map((category) => category.label),
      labels: {
        style: {
          colors: "#b9b9c3",
          fontSize: "0.86rem",
        },
      },
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
      },
    },
    legend: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#556ee6", "#f1b44c"],
    plotOptions: {
      bar: {
        columnWidth: "17%",
        borderRadius: [5],
      },
      distributed: true,
    },
    yaxis: {
      labels: {
        style: {
          colors: "#b9b9c3",
          fontSize: "0.86rem",
        },
      },
    },
  };

  const revenueSeries = [
    {
      name: "Total Quotes £",
      data: quotesData,
    },
    {
      name: "Total Sales £",
      data: salesData,
    },
  ];
  const salesToQuoteRatioData = [
    {
      name: "Quotes Lines",
      data: totalQuotesLines,
    },
    {
      name: "Sales Lines",
      data: totalSalesLines,
    },
  ];
  const barRevenueOptions = {
    ...revenueOptions,
    chart: {
      ...revenueOptions.chart,
      brush: {
        enabled: true,
        target: "syncChartsBrush",
      },
    },
  };

  return (
    <Card className="card-revenue-budget">
      <Row className="mx-0">
        <Col className="revenue-report-wrapper" md="12" xs="12">
          <div className={"h1"}> Sales and Order value</div>

          <Chart
            id="revenue-report-chart"
            type={"line"}
            height="230"
            options={revenueOptions}
            series={revenueSeries}
          />
          <Chart
            id="revenue-report-chart"
            type={"bar"}
            height="230"
            options={JSON.parse(JSON.stringify(revenueOptions))}
            series={revenueSeries}
          />
        </Col>
        <Col className="revenue-report-wrapper" md="12" xs="12"></Col>

        {/*    add quote to order ratio*/}

        <div className={"h1"}> Quote to Order ratio</div>
        <Col className="revenue-report-wrapper" md="12" xs="12">
          <Chart
            id="revenue-report-chart"
            type={"line"}
            height="230"
            options={JSON.parse(JSON.stringify(revenueOptions))}
            series={salesToQuoteRatioData}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default SalesReport;
