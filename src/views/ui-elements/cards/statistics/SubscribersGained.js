// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import axios from "axios";
import { Users } from "react-feather";

// ** Custom Components
import StatsWithAreaChart from "@components/widgets/stats/StatsWithAreaChart";

const SubscribersGained = ({ kFormatter }) => {
  // ** State
  const [data, setData] = useState([]);

  return data !== null ? (
    <StatsWithAreaChart
      icon={<Users size={21} />}
      color="primary"
      stats={[]}
      statTitle="Subscribers Gained"
      series={data.series}
      type="area"
    />
  ) : null;
};

export default SubscribersGained;
