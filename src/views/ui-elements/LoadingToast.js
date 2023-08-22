import toast from "react-hot-toast";
import {Card, CardBody, CardHeader, CardTitle, Spinner} from "reactstrap";
import {salesFunFacts} from "@configs/SalesFacts";

export default function openLoading(title) {
    return toast.loading(
        <Card style={{boxShadow: "none"}}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardBody>
                <div className="d-flex align-items-center">
                    <Spinner size="sm" color="primary" className="me-2"/>
                    {salesFunFacts[Math.floor(Math.random() * salesFunFacts.length)]}
                </div>
            </CardBody>
        </Card>
    );
}