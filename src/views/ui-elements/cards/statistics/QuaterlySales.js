// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import { ShoppingCart } from "react-feather";

// ** Custom Components
import StatsWithAreaChart from "@components/widgets/stats/StatsWithAreaChart";

const QuarterlySales = ({ danger }) => {
  // ** State
  const [data, setData] = useState({
    analyticsData: {
      sales: [2100, 1500, 1800],
    },
    series: [
      {
        name: "Sales",
        data: [2100, 1500, 1800],
      },
    ],
  });

  const options = {
    chart: {
      id: "revenue",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      show: false,
    },
    colors: [danger],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 80, 100],
      },
    },

    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      x: { show: false },
    },
  };

  return (
    <StatsWithAreaChart
      icon={<ShoppingCart size={21} />}
      color="danger"
      stats={data.analyticsData.sales}
      statTitle="Quarterly Sales"
      options={options}
      series={data.series}
      type="area"
    />
  );
};

export default QuarterlySales;
