// ** Icons Imports
import { selectThemeColors } from "@utils";
import React from "react";
// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardBody,
  Label,
  Form,
  Button,
} from "reactstrap";
import Select from "react-select";
import useAxios from "axios-hooks";
import { PUBLIC_API_URL } from "@src/config";
import Currency from "@src/views/Components/Currency";
import Terms from "@src/views/Components/Terms";
import { FaPencilAlt } from "react-icons/fa";
import { mockRsiValues } from "@src/views/Bids/add/TableValues";
import {  useDispatch } from 'react-redux';
import { setSidebarValues,setIsEditable} from "@store/bids";
import ImportCSVFile from "@src/views/Bids/add/ImportCSVFile";
import ContactSelect from "@src/views/Components/ContactSelect";
import toast from "react-hot-toast";

const BidsSidebar = ({
  setTable,
  sidebarValues,
  table,
  dataLoading,
  isEditable,
    changeCurrency
}) => {
  //fetching data from the server
  const [{ data, loading }] = useAxios(
    `${PUBLIC_API_URL}/api/companies/excess-options`
  );
  const companyOptions = data?.data;
  //create a default function to handle currency,company,contact and terms
  const dispatch = useDispatch();
  const onChange = (value, field) => {
    const updatedValues = {
      ...sidebarValues,
      [field]: value,
    };

    if(field==='currency'){
        changeCurrency(sidebarValues.currency?.value,value?.label)
      toast.success(`Currency set from ${sidebarValues.currency?.label} to ${value?.label}`)

    }

    if (value.currency?.label) {
      updatedValues.currency = value.currency;
    }
    if (value.terms?.value) {
      updatedValues.terms = value.terms;
      updatedValues.currency = value.currency;
    }

    dispatch(setSidebarValues(updatedValues));
  };
  return (
    <Card>
      <CardHeader>
        <div className="d-flex align-items-center"></div>
      </CardHeader>
      <CardBody>
        <Form className={`card-user-timeline ${!isEditable && "disable-div"}`}>
          <div className="mb-1">
            <Label className="form-label" for="company">
              Company Name<span className="text-danger">*</span>
            </Label>
            {!dataLoading && (
              <Select
                isClearable={false}
                classNamePrefix="select"
                theme={selectThemeColors}
                isDisabled={loading}
                options={companyOptions}
                value={sidebarValues.company}
                onChange={(e) => onChange(e, "company")}
              />
            )}
          </div>

          {!dataLoading && (
            <div className="mb-1">
              <ContactSelect
                company={sidebarValues.company}

                setValueForField={(e) => onChange(e, "contact")}
                defaultValue={sidebarValues.contact}
              />
            </div>
          )}

          <div className="mb-1">
            <Label className="form-label" for="currency">
              Currency <span className="text-danger">*</span>
            </Label>

            {!dataLoading && (
              <Currency
                isClearable={false}
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(e) => onChange(e, "currency")}
                value={sidebarValues?.currency}
              />
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="currency">
              Terms <span className="text-danger">*</span>
            </Label>

            {!dataLoading && (
              <Terms
                isClearable={false}
                value={sidebarValues.terms}
                onChange={(e) => {
                  onChange(e, "terms");
                }}
              />
            )}
          </div>
          <div className="mb-1" style={{ display: `${table.length>0 && "none"}` }}>
              <Label className="form-label" for="email">
                Upload List <span className="text-danger">*</span>
                <ImportCSVFile
                    setTable={(e)=>{
                      dispatch(setTable(e))
                    }}
                    fields={mockRsiValues.fields}
                />
              </Label>

          </div>
        </Form>
        <Button
          color="primary"
          onClick={() =>
            dispatch(setIsEditable(!isEditable))
        }
          className="d-flex align-items-center"
        >
          <FaPencilAlt className="me-2" />
          {isEditable ? "Finish Editing" : "Enable Editing"}
        </Button>
      </CardBody>
    </Card>
  );
};

export default BidsSidebar;
