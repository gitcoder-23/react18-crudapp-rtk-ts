import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { StudentModel } from "../../api/models/studentModel";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { EditSingleStudent } from "../../api/actions/studentAction";

type newStudentEditType = {
  stuName: string;
  stuEmail: string;
  stuPhone: string;
  stuStatus: boolean;
};

const StudentEdit = () => {
  const { eid } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [studentEditState, setStudentEditState] = useState<newStudentEditType>({
    stuName: state.studentDatas.studentname || "",
    stuEmail: state.studentDatas.email || "",
    stuPhone: state.studentDatas.phone || "",
    stuStatus: state.studentDatas.active || false,
  });

  const editStudentSubmit = (e: any) => {
    e.preventDefault();

    if (
      !studentEditState.stuName ||
      !studentEditState.stuEmail ||
      !studentEditState.stuPhone
    ) {
      toast.error("Please all the fields!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const inFormData: StudentModel = {
        studentname: studentEditState.stuName,
        email: studentEditState.stuEmail,
        phone: studentEditState.stuPhone,
        active: studentEditState.stuStatus,
      };
      dispatch(EditSingleStudent({ eid: eid, formEdData: inFormData }))
        .then((res: any) => {
          console.log("add-res=>", res);
          if (res.type === "student/edit/fulfilled") {
            toast.success("Student has been updated!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setStudentEditState({
              stuName: "",
              stuEmail: "",
              stuPhone: "",
              stuStatus: false,
            });
            navigate("/");
          } else {
            toast.error("Something went wrong!!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err: any) => {
          console.log("add-err=>", err);
        });
    }
  };

  return (
    <Form onSubmit={(e) => editStudentSubmit(e)}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Student name</Form.Label>
          <Form.Control
            value={studentEditState.stuName}
            onChange={(e) =>
              setStudentEditState({
                ...studentEditState,
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
              value={studentEditState.stuEmail}
              onChange={(e) =>
                setStudentEditState({
                  ...studentEditState,
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
            value={studentEditState.stuPhone}
            onChange={(e) =>
              setStudentEditState({
                ...studentEditState,
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
          checked={studentEditState.stuStatus}
          onChange={(e) =>
            setStudentEditState({
              ...studentEditState,
              stuStatus: e.target.checked,
            })
          }
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
};

export default StudentEdit;
