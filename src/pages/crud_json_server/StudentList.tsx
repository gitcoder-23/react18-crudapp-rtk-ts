import React, { useEffect, useMemo } from "react";
import { Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../api/hooks";
import {
  deleteOneStudent,
  getAllStudents,
  getSingleStudent,
} from "../../api/actions/studentAction";
import { useNavigate } from "react-router-dom";
import StudentTable from "./components/StudentTable";
import { StudentModel } from "../../api/models/studentModel";

const StudentList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { allStudents, singleStudent } = useAppSelector(
    (state) => state.student
  );

  // console.log("allStudents=>", allStudents);

  useMemo(() => {
    dispatch(getAllStudents());
  }, []);

  const viewBtnClick = (vid: string | number | any) => {
    navigate(`/studentdetails/${vid}`);
    dispatch(getSingleStudent(vid));
  };

  const delClick = (dData: StudentModel) => {
    if (window.confirm("Do you want?")) {
      console.log("dData=>", dData);
      dispatch(deleteOneStudent(dData.id));
    }

    dispatch(getAllStudents());
  };

  return (
    <div className="container mt-4">
      {allStudents.length === 0 ? (
        <h3>No data found!</h3>
      ) : (
        <StudentTable
          allStudents={allStudents}
          viewBtnClick={viewBtnClick}
          delClick={delClick}
        />
        // <Table striped bordered hover size="sm">
        //   <thead>
        //     <tr>
        //       <th>#</th>
        //       <th>Student Name</th>
        //       <th>Email</th>
        //       <th>Phone</th>
        //       <th>Action</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {allStudents &&
        //       allStudents?.map((sdata: StudentModel, i: number) => {
        //         // console.log("sdata=>", sdata);

        //         return (
        //           <tr key={sdata.id}>
        //             <td>{i + 1}</td>
        //             <td>{sdata.studentname}</td>
        //             <td>{sdata.email}</td>
        //             <td>{sdata.phone}</td>
        //             <td>
        //               <button onClick={() => viewBtnClick(sdata.id)}>
        //                 View
        //               </button>
        //               &nbsp;&nbsp;
        //               <button>Edit</button>&nbsp;&nbsp;
        //               <button onClick={() => delClick(sdata)}>Delete</button>
        //             </td>
        //           </tr>
        //         );
        //       })}
        //   </tbody>
        // </Table>
      )}
    </div>
  );
};

export default StudentList;
