import { createAsyncThunk } from "@reduxjs/toolkit";
import { StudentModel } from "../models/studentModel";
import axios from "axios";
import { RootApi } from "../../RootApi";

type studentActionViewType = {
  vid: string | number;
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

export const getSingleStudent = createAsyncThunk<studentActionViewType, {}>(
  "student/view",
  async (vid) => {
    console.log("vid=>", vid);

    const response = await RootApi.get(`/student/${vid}`);
    // console.log("response-student=>", response);

    return response.data;
  }
);
