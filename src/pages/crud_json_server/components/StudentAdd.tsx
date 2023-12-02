import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { StudentModel } from "../../../api/models/studentModel";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../api/hooks";
import { addNewStudent } from "../../../api/actions/studentAction";
import { useNavigate } from "react-router-dom";

type studentAddType = {
  stuName: string;
  stuEmail: string;
  stuPhone: string;
  stuStatus: boolean;
};

const StudentAdd = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [studentAddState, setStudentAddState] = useState<studentAddType>({
    stuName: "",
    stuEmail: "",
    stuPhone: "",
    stuStatus: false,
  });
  const studentAddSubmit = (e: any) => {
    e.preventDefault();

    if (
      !studentAddState.stuName ||
      !studentAddState.stuEmail ||
      !studentAddState.stuPhone
    ) {
      toast.error("Please fill all the fields!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const newFormData: StudentModel = {
        studentname: studentAddState.stuName,
        email: studentAddState.stuEmail,
        phone: studentAddState.stuPhone,
        active: studentAddState.stuStatus,
        id: Date.now(),
      };
      dispatch(addNewStudent({ formData: newFormData }))
        .then((resp: any) => {
          console.log("add-resp=>", resp);

          toast.success("New student has been added!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          if (resp.type === "student/add/fulfilled") {
            navigate("/");
          }
        })
        .catch((err: any) => {
          console.log("add-err=>", err);
        });
    }
  };
  return (
    <Form onSubmit={(e) => studentAddSubmit(e)}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Student name</Form.Label>
          <Form.Control
            value={studentAddState.stuName}
            onChange={(e) =>
              setStudentAddState({
                ...studentAddState,
                stuName: e.target.value,
              })
            }
            type="text"
            placeholder="Student name"
          />
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Email</Form.Label>
          <InputGroup>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              value={studentAddState.stuEmail}
              onChange={(e) =>
                setStudentAddState({
                  ...studentAddState,
                  stuEmail: e.target.value,
                })
              }
              type="text"
              placeholder="Email"
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            value={studentAddState.stuPhone}
            onChange={(e) =>
              setStudentAddState({
                ...studentAddState,
                stuPhone: e.target.value,
              })
            }
            type="text"
            placeholder="Phone"
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          label="Active"
          checked={studentAddState.stuStatus}
          onChange={(e) =>
            setStudentAddState({
              ...studentAddState,
              stuStatus: e.target.checked,
            })
          }
        />
      </Form.Group>
      <Button type="submit">Submit </Button>
    </Form>
  );
};

export default StudentAdd;
