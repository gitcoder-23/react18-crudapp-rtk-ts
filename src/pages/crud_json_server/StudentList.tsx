import React, { useEffect, useMemo } from "react";
import { Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import { getAllStudents } from "../../api/actions/studentAction";
import axios from "axios";
import { StudentModel } from "../../api/models/studentModel";

const StudentList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { allStudents, isLoading } = useAppSelector((state) => state.student);

  console.log("allStudents=>", allStudents);

  useMemo(() => {
    dispatch(getAllStudents());
  }, []);

  return (
    <div className="container mt-4">
      {allStudents.length === 0 ? (
        <h3>No data found!</h3>
      ) : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {allStudents &&
              allStudents.map((sdata: StudentModel, i: number) => {
                return (
                  <tr key={sdata.id}>
                    <td>{i + 1}</td>
                    <td>{sdata.studentname}</td>
                    <td>{sdata.email}</td>
                    <td>{sdata.phone}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default StudentList;
