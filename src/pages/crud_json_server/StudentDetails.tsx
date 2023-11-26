import React from "react";
import { useAppSelector } from "../../api/hooks";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentDetails: React.FC = () => {
  const navigate = useNavigate();
  const { singleStudent } = useAppSelector((state) => state.student);

  return (
    <div className="container">
      <Card>
        <Card.Body>
          <Card.Title>{singleStudent.studentname}</Card.Title>
          <Card.Text>
            Email: {singleStudent.email}
            Phone: {singleStudent.phone}
          </Card.Text>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Go Back
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentDetails;
