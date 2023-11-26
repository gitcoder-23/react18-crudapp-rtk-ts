import { createAsyncThunk } from "@reduxjs/toolkit";
import { StudentModel } from "../models/studentModel";
import { RootApi } from "../../RootApi";

type studentActionViewType = {
  vid: string | number;
};
type studentActionDelType = {
  delid: string | number;
};

export const getAllStudents = createAsyncThunk<[StudentModel]>(
  "student/get",
  async () => {
    const response = await RootApi.get(`/student`);
    // console.log("response-student=>", response);
    if (response.status === 200) {
      return response.data.reverse();
    }
  }
);

export const getSingleStudent = createAsyncThunk<
  StudentModel,
  studentActionViewType,
  {}
>("student/view", async (vid) => {
  // console.log("vid=>", vid);

  const response = await RootApi.get(`/student/${vid}`);
  // console.log("response-student=>", response);

  return response.data;
});

export const deleteOneStudent = createAsyncThunk<[StudentModel], any, {}>(
  "student/delete",
  async (delid) => {
    console.log("delid=>", delid);

    const response = await RootApi.delete(`/student/${delid}`);
    console.log("response-student=>", response);

    return response.data;
  }
);
