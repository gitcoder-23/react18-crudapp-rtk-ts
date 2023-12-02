import { createAsyncThunk } from "@reduxjs/toolkit";
import { StudentModel } from "../models/studentModel";
import { RootApi } from "../../RootApi";

type studentActionViewType = {
  vId: string | number;
};
type studentActionDelType = {
  delId: string | number;
};
type studentActionAddType = {
  formData: StudentModel;
};

type newStudentAddType = {
  formData: StudentModel;
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
>("student/view", async ({ vId }) => {
  // console.log("vId=>", vId);

  const response = await RootApi.get(`/student/${vId}`);
  // console.log("response-student=>", response);

  return response.data;
});

export const addNewStudent = createAsyncThunk<
  StudentModel,
  studentActionAddType,
  {}
>("student/add", async ({ formData }) => {
  // console.log("formData-action=>", formData);

  const response = await RootApi.post(`/student`, formData);
  // console.log("addNewStudent-action=>", response);

  return response.data;
});

export const newPostStudent = createAsyncThunk<
  StudentModel,
  newStudentAddType,
  {}
>("student/new/add", async ({ formData }) => {
  console.log("formData-action=>", formData);
  const response = await RootApi.post(`/student`, formData);
  console.log("response-add=>", response);

  return response.data;
});

export const deleteOneStudent = createAsyncThunk<
  [StudentModel],
  studentActionDelType,
  {}
>("student/delete", async ({ delId }) => {
  // console.log("delid=>", delId);

  const response = await RootApi.delete(`/student/${delId}`);
  // console.log("response-student=>", response);

  return response.data;
});
