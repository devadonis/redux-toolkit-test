// ** Third Party Components
import classnames from "classnames";
import { Box, DollarSign, Home, User } from "react-feather";
// ** Custom Components
import Avatar from "@components/avatar";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Input,
  InputGroup,
  Row,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { FormControl } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";


const formatData = (value) => isNaN(parseFloat(value)) ? 0 : parseFloat(value).toFixed(2);


const StatsCard = ({ cols }) => {
  const user = useSelector((state) => state.authentication.user);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [currency, setCurrency] = useState("");
  const [dashboardData, setDashboardData] = useState({
    linesSold: 0,
    totalSold: 0,
    totalPurchases: 0,
    consignmentLines: 0,
    linesBookedIn: 0,
    LinesQuoted: 0,
    totalIncome: 0,
    totalSpent: 0,
    linesQuoted: 0,
    totalQuoted: 0,
  });
  const {
    linesSold,
    totalSold,
    consignmentLines,
    linesBookedIn,
    totalSpent,
    totalQuoted,
  } = dashboardData;

  const onSearch = (e) => {
    if (search === "") {
      return toast.error("Please enter a search term");
    } else {
      navigate(`/inventory?search=${search}`);
    }
  };

  const colData = [
    {
      title: ``,
      subtitle: "Sales",
      color: "light-primary",
      icon: <DollarSign size={24} />,
      link: "/services",
    },
    {
      title: `${linesSold}`,
      subtitle: "Lines Sold",
      color: "light-info",
      icon: <User size={24} />,
      link: "/linesSold",
    },
    {
      title: `${currency}${totalQuoted}`,
      subtitle: "Total Quoted",
      color: "light-danger",
      icon: <Box size={24} />,
      link: "/",
    },
    {
      title: `${currency}${totalSold}`,
      subtitle: "Total Purchases",
      color: "light-success",
      icon: <Home size={24} />,
      link: "/",
    },
    {
      title: `${linesBookedIn}`,
      subtitle: "Lines Booked In",
      color: "light-danger",
      icon: <Home size={24} />,
      link: "/",
    },
    {
      title: `${consignmentLines}`,
      subtitle: "Consignment lines acquired",
      color: "light-success",
      icon: <Home size={24} />,
      link: "/",
    },
  ];

  const renderData = () => {
    return colData.map((item, index) => {
      const colMargin = Object.keys(cols);
      const margin = index === 2 ? "sm" : colMargin[0];
      if (index === 0) {
        return (
          <Col
            key={index}
            {...cols}
            className={classnames({
              [`mb-2 mb-${margin}-0`]: index !== colData.length - 1,
            })}
          >
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center ">
                <Avatar color={item.color} icon={item.icon} className="me-2" />
                <div className="my-auto">
                  <CardText className="mb-0 text-success">
                    Total Income
                  </CardText>

                  <h4 className="fw-bolder mb-0">
                    {currency} {totalSold}
                  </h4>
                </div>
              </div>
              <hr className="hr" />
              <div className="d-flex align-items-center">
                <Avatar color={item.color} icon={item.icon} className="me-2" />
                <div className="my-auto">
                  <CardText className="mb-0  text-danger">Total Spend</CardText>

                  <h4 className="fw-bolder mb-0">
                    {currency} {totalSpent}
                  </h4>
                </div>
              </div>
            </div>
          </Col>
        );
      }
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== colData.length - 1,
          })}
        >
          <div className="d-flex align-items-center mt-3 ">
            <Avatar color={item.color} icon={item.icon} className="me-2" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">{item.title}</h4>
              <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">Total Income and spend statistics for last 30 days</CardTitle>
        <div className="d-flex align-items-center">
          <InputGroup className="">
            <FormControl placeholder="Search"></FormControl>
            <Input
              type="Search Inventory..."
              placeholder="Search inventory..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSearch();
                }
              }}
            />
          </InputGroup>
          <Button type={"button"} color={"primary"} onClick={onSearch}>
            <FaSearch />
          </Button>
        </div>
        <CardText>
          <b>Logged In User:{user.employeeName}</b>
        </CardText>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
