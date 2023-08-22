// ** Reactstrap Imports
import { Table, Card } from "reactstrap";

// ** Icons Imports
import { TrendingUp, TrendingDown } from "react-feather";

const CompanyTable = ({ data }) => {
  // ** vars

  const renderData = () => {
    return data.map((col) => {
      const IconTag = true ? (
        <TrendingUp size={15} className="text-success" />
      ) : (
        <TrendingDown size={15} className="text-danger" />
      );

      return (
        <tr key={col.name}>
          <td>
            <div className="d-flex align-items-center">
              <div className="avatar rounded">
                <div className="avatar-content">
                  <img
                    src={require("@src/assets/images/icons/rocket.svg").default}
                    alt={col.name}
                  />
                </div>
              </div>
              <div>
                <div className="fw-bolder">{col.name}</div>
                <div className="font-small-2 text-muted">{col.email}</div>
              </div>
            </div>
          </td>
          <td className="text-nowrap">
            <div className="d-flex flex-column">
              <span className="fw-bolder mb-25">{col.maxSessions}</span>
            </div>
          </td>
          <td>{col.phone}</td>
          <td>{col.email}</td>
          <td>{col.address.country}</td>
        </tr>
      );
    });
  };

  return (
    <Card className="card-company-table">
      <Table responsive>
        <thead>
          <tr>
            <th>Company</th>
            <th>Max Sessions</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  );
};

export default CompanyTable;
