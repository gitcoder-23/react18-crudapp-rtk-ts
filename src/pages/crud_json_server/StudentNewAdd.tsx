import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { StudentModel } from "../../api/models/studentModel";
import { useAppDispatch } from "../../api/hooks";
import { newPostStudent } from "../../api/actions/studentAction";
import { useNavigate } from "react-router-dom";

type newStudentAddType = {
  stuName: string;
  stuEmail: string;
  stuPhone: string;
  stuStatus: boolean;
};

const StudentNewAdd = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [newStudentState, setNewStudentState] = useState<newStudentAddType>({
    stuName: "",
    stuEmail: "",
    stuPhone: "",
    stuStatus: false,
  });

  const newAddStudentSubmit = (e: any) => {
    e.preventDefault();

    if (
      !newStudentState.stuName ||
      !newStudentState.stuEmail ||
      !newStudentState.stuPhone
    ) {
      toast.error("Please all the fields!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const inFormData: StudentModel = {
        studentname: newStudentState.stuName,
        email: newStudentState.stuEmail,
        phone: newStudentState.stuPhone,
        active: newStudentState.stuStatus,
        id: Date.now(),
      };
      dispatch(newPostStudent({ formData: inFormData }))
        .then((res: any) => {
          console.log("add-res=>", res);
          if (res.type === "student/new/add/fulfilled") {
            toast.success("New student has been added!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setNewStudentState({
              stuName: "",
              stuEmail: "",
              stuPhone: "",
              stuStatus: false,
            });
            navigate("/");
          }
        })
        .catch((err: any) => {
          console.log("add-err=>", err);
        });
    }
  };
  return (
    <Form onSubmit={(e) => newAddStudentSubmit(e)}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Student name</Form.Label>
          <Form.Control
            value={newStudentState.stuName}
            onChange={(e) =>
              setNewStudentState({
                ...newStudentState,
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
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              value={newStudentState.stuEmail}
              onChange={(e) =>
                setNewStudentState({
                  ...newStudentState,
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
            value={newStudentState.stuPhone}
            onChange={(e) =>
              setNewStudentState({
                ...newStudentState,
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
          label="Student Status"
          checked={newStudentState.stuStatus}
          onChange={(e) =>
            setNewStudentState({
              ...newStudentState,
              stuStatus: e.target.checked,
            })
          }
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
};

export default StudentNewAdd;
