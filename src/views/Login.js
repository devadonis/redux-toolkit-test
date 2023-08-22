import InputPasswordToggle from "@components/input-password-toggle";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import "@styles/react/pages/page-authentication.scss";
import { handleLogin } from "@store/authentication";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import { PUBLIC_API_URL } from "@src/config";
import Select from "react-select";
import useAxios from "axios-hooks";
import React, { useEffect } from "react";
import DashingXSLOGO from "@src/DashingXSLOGO";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [{ data, loading }] = useAxios(`${PUBLIC_API_URL}/api/auth`);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  //check for query params using react router
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("token");

  const isAuthenticated = useSelector(
      (state) => state.authentication.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  },[isAuthenticated]);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username: selectedOption.value,
        password: password,
      };
      const response = await axios.post(`${PUBLIC_API_URL}/api/auth`, data);
      // if response status is 200, redirect to /home
      if (response.status === 200) {
        dispatch(
          handleLogin({
            user: {
              employeeName: response.data.data.Name,
              employeeNo: response.data.data.EmployeeNo,
            },
            token: response.data.token
          })
        );
        navigate("/home");
        toast.success("Login Successful");
      }
    } catch (e) {
      toast.error("Please check your credentials and try again");
    }
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Col
          className="d-none d-lg-flex align-items-center p-5 bg-dark"
          lg="8"
          sm="12"
        >
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <DashingXSLOGO />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Welcome to Dashing Excess
            </CardTitle>
            <CardText
              className="mb-2"
              style={{ color: "red", fontWeight: "bold" }}
            >
              Please note that this is a beta version and may contain bugs or
              errors.
            </CardText>
            <CardText className="mb-2">Please sign-in to your account</CardText>
            <Form className="auth-login-form mt-2" onSubmit={onSubmit}>
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                {/*    react select*/}
                <Select
                  options={data?.data || []}
                  onChange={(value) => {
                    setSelectedOption(value);
                  }}
                  isLoading={loading}
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" color="primary" block>
                Submit
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
