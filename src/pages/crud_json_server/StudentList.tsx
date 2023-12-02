import React, { useMemo } from "react";
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

  const { allStudents } = useAppSelector((state) => state.student);

  // console.log("allStudents=>", allStudents);

  useMemo(() => {
    dispatch(getAllStudents());
  }, []);

  const viewBtnClick = (vid: string | number) => {
    navigate(`/studentdetails/${vid}`);
    dispatch(getSingleStudent({ vId: vid }));
  };

  const delClick = (dData: StudentModel) => {
    if (window.confirm("Do you want?")) {
      console.log("dData=>", dData);
      dispatch(deleteOneStudent({ delId: dData.id }));
    }

    dispatch(getAllStudents());
  };

  return (
    <div className="container mt-4">
      <button
        className="btn btn-primary"
        onClick={() => navigate(`/studentadd`)}
      >
        Add
      </button>
      &nbsp;
      <button
        className="btn btn-success"
        onClick={() => navigate(`/studentnewadd`)}
      >
        New Add
      </button>
      {allStudents.length === 0 ? (
        <h3>No data found!</h3>
      ) : (
        <StudentTable
          allStudents={allStudents}
          viewBtnClick={viewBtnClick}
          delClick={delClick}
        />
      )}
    </div>
  );
};

export default StudentList;
