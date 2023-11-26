import React from "react";
import { Table } from "react-bootstrap";
import { StudentModel } from "../../../api/models/studentModel";

type studentTableType = {
  allStudents: StudentModel[];
  viewBtnClick: (vid: string | number | any) => void;
  delClick: (dData: StudentModel) => void;
};

const StudentTable: React.FC<studentTableType> = ({
  allStudents,
  viewBtnClick,
  delClick,
}) => {
  // const StudentTable: React.FC = ({
  //   allStudents,
  //   viewBtnClick,
  // }: studentTableType) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Student Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {allStudents &&
          allStudents?.map((sdata: StudentModel, i: number) => {
            // console.log("sdata=>", sdata);

            return (
              <tr key={sdata.id}>
                <td>{i + 1}</td>
                <td>{sdata.studentname}</td>
                <td>{sdata.email}</td>
                <td>{sdata.phone}</td>
                <td>
                  <button onClick={() => viewBtnClick(sdata.id)}>View</button>
                  &nbsp;&nbsp;
                  <button>Edit</button>&nbsp;&nbsp;
                  <button onClick={() => delClick(sdata)}>Delete</button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default StudentTable;
