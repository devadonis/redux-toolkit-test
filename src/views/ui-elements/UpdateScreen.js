import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledCarousel,
} from "reactstrap";
import { PUBLIC_API_URL } from "@src/config";
import useAxios from "axios-hooks";

const UpdateNotificationModal = ({}) => {
  const [showModal, setShowModal] = useState(true);
  const [currentVersion, setCurrentVersion] = useState(null);
  const [improvements, setImprovements] = useState([]);
  const [bugFixes, setBugFixes] = useState([]);
  const [newFeatures, setNewFeatures] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [{ data, loading, error }, refetch] = useAxios(
    `${PUBLIC_API_URL}/api/version`
  );

  useEffect(() => {
    if (!loading && !error && data) {
      setCurrentVersion(data?.version);
      setImprovements(data?.improvements);
      setBugFixes(data?.bugFixes);
      setNewFeatures(data?.newFeatures);
      setAttachments([
        ...data.attachments,
        ...data.attachments,
        ...data.attachments,
      ]);
    }
  }, [data, loading, error]);

  useEffect(() => {
    const version = localStorage.getItem("currentVersion");
    if (version === currentVersion) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, [currentVersion]);

  const handleDismiss = () => {
    setShowModal(false);
    localStorage.setItem("currentVersion", String(currentVersion));
  };

  return (
    <Modal isOpen={showModal}>
      <ModalHeader toggle={handleDismiss}>
        New Update Available {"<"}
        {currentVersion}
        {">"}
      </ModalHeader>
      <ModalBody>
        <Container>
          <Row>
            <Card>
              <UncontrolledCarousel
                dark={true}
                items={attachments.map((attachment, index) => ({
                  src: attachment,
                  altText: ``,
                  caption: ``,
                  key: index,
                }))}
              />
              <CardBody>
                <CardText tag="h6" className="mb-2 text-muted">
                  There was an update recently.
                </CardText>
                <CardText>
                  We've added new features and improvements to make your
                  experience better.
                </CardText>
              </CardBody>
              {bugFixes && bugFixes.length > 0 && (
                <div>
                  <h5>Bug Fixes</h5>
                  <ul>
                    {bugFixes.map((bugFix, index) => (
                      <li key={index}>{bugFix}</li>
                    ))}
                  </ul>
                </div>
              )}
              {newFeatures && newFeatures.length > 0 && (
                <div>
                  <h5>New Features</h5>
                  <ul>
                    {newFeatures.map((newFeature, index) => (
                      <li key={index}>{newFeature}</li>
                    ))}
                  </ul>
                </div>
              )}
              {improvements && improvements.length > 0 && (
                <div>
                  <h5>Improvements</h5>
                  <ul>
                    {improvements.map((improvement, index) => (
                      <li key={index}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleDismiss}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateNotificationModal;
