// ** React Imports
// ** Reactstrap Imports
import { Card, CardBody, Col, Row } from "reactstrap";
import { Briefcase, Settings } from "react-feather";
// ** Context

import StatsCard from "@src/views/ui-elements/cards/statistics/StatsCard";
// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";
import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaClipboardCheck,
  FaFileInvoiceDollar,
  FaGavel,
  FaLuggageCart,
} from "react-icons/fa";
import { IoMdApps } from "react-icons/io";
import UpdateModalComponent from "@src/views/ui-elements/UpdateScreen";

// add custom
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTab } from "@src/redux/test";
import CustomTab from "./ui-elements/CustomTab";

const ExcessDashboard = () => {
  // ** Context
  const gridData = [
    {
      title: "Companies",
      color: "bg-primary",
      icon: <FaBuilding className={"congratulation-medal"} size={90} />,
      tabname: "companies",
    },
    {
      title: "Quick Quotes",
      color: "bg-success",
      icon: (
        <FaFileInvoiceDollar className={"congratulation-medal"} size={90} />
      ),
      tabname: "quick-quotes",
    },
    {
      title: "Bids",
      color: "bg-warning",
      icon: <FaGavel className={"congratulation-medal"} size={90} />,
      tabname: "bids",
    },
    {
      title: "Inventory",
      color: "bg-info",
      icon: <Briefcase className={"congratulation-medal"} size={90} />,
      tabname: "inventory",
    },
    {
      title: "Reports",
      color: "bg-info",
      icon: <FaClipboardCheck className={"congratulation-medal"} size={90} />,
      tabname: "reports",
    },
    {
      title: "Inbound Stock",
      color: "bg-primary",
      icon: <FaLuggageCart className={"congratulation-medal"} size={90} />,
      tabname: "inbound-stock",
    },
    {
      title: "Settings",
      color: "bg-danger",
      icon: <Settings className={"congratulation-medal"} size={90} />,
      tabname: "settings",
    },
    {
      title: "Consignee Portal",
      color: "bg-warning",
      icon: <IoMdApps className={"congratulation-medal"} size={90} />,
      tabname: "consignee-portal",
    },
  ];
  const cardStyle = {
    minHeight: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  };

  const dispatch = useDispatch()
  const currentTab = useSelector(
    (state) => state.test.currentTab
  )

  const clickAddTab = (tabname) => {
    dispatch(addTab(tabname))
  }

  return (
    <div id="dashboard-ecommerce">
      <CustomTab />
      <UpdateModalComponent />
      { currentTab === 'home' && (
        <Fragment>
          <Row className="match-height">
            <Col xl="12" lg="12" md="12" sm="12" xs="12">
              <StatsCard cols={{ xl: "2", lg: 3, md: 4, sm: "6" }} />
            </Col>
          </Row>
          <Row className="match-height">
            {gridData.map((item, index) => {
              return (
                <Col key={index} xl="3" md="4" sm="6" xs="12">
                  <Card
                      className={`card-congratulations-medal text-white ${item.color}`}
                      style={cardStyle}
                      onClick={() => clickAddTab(item.tabname)} // add tabs
                  >
                    <CardBody>
                      <h3 className={"my-5 display-6 text-white"}>{item.title}</h3>
                      {item.icon}
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Fragment>
        )
      }
    </div>
  );
};

export default ExcessDashboard;
