// ** Icons Imports
import { Award, Download } from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { Button, Card, CardBody, Row } from "reactstrap";
import openLoading from "@src/views/ui-elements/LoadingToast";
import axios from "axios";
import { PUBLIC_API_URL } from "@src/config";
import toast from "react-hot-toast";

const getFirstAndLastDayOfLastMonth = (date) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfPreviousMonth = new Date(firstDayOfMonth.getTime() - 1);
  const firstDayOfPreviousMonth = new Date(
    lastDayOfPreviousMonth.getFullYear(),
    lastDayOfPreviousMonth.getMonth(),
    1
  );
  const firstDayString = firstDayOfPreviousMonth.toISOString().slice(0, 10);
  const lastDayString = lastDayOfPreviousMonth.toISOString().slice(0, 10);

  return {
    firstDay: firstDayString,
    lastDay: lastDayString,
  };
};

// ** Images
const CardWelcome = ({ userData }) => {
  const downloadReport = async (data) => {
    openLoading("Generating contract...");
    // get dates for last calendar month
    const today = new Date(); // get today's date
    const dataData = getFirstAndLastDayOfLastMonth(today);
    const firstDayLastMonth = dataData.firstDay;
    const lastDayLastMonth = dataData.lastDay;

    const response = await axios.post(
      `${PUBLIC_API_URL}/api/reports/consignmentReport`,
      {
        companyName: userData.company,
        companyNo: userData.companyNo,
        startDate: firstDayLastMonth,
        endDate: lastDayLastMonth,
        currencySymbol: "£",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.dismiss();
    const URL = response.data.fileName;
    window.open(`${PUBLIC_API_URL}/reports/${URL}`, "_blank");
  };

  return (
    <Card className="card-congratulations">
      <CardBody className="text-center">
        <Row className="justify-content-between flex-row">
          <Button
            color="primary"
            className="btn-download-report"
            onClick={downloadReport}
          >
            <Download size={16} className="mx-1" />
            Download Report for last calendar month
          </Button>
        </Row>
        <Avatar
          icon={<Award size={28} />}
          className="shadow"
          color="primary"
          size="xl"
        />
        <div className="h1 header-navbar text-white">{userData?.company}</div>
        <div className="text-center">
          <h1 className="mb-1 text-white">Welcome, {userData?.name}</h1>
        </div>
        <div className="text-center">
          <p className="mb-0">
            You have been registered as a consignee with us.
          </p>
          <p className="mb-0">
            You can view your consignments and download reports.
          </p>
        </div>
        <div className="text-center text-muted mt-3"></div>
      </CardBody>
    </Card>
  );
};

export default CardWelcome;
