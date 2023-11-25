import { createAsyncThunk } from "@reduxjs/toolkit";
import { StudentModel } from "../models/studentModel";
import axios from "axios";

const baseUrl = `${process.env.REACT_APP_JSONSERVER_URL}`;

export const getAllStudents = createAsyncThunk<[StudentModel]>(
  "student/get",
  async () => {
    const response = await axios.get(`${baseUrl}/student`);
    console.log("response-student=>", response);
    if (response.status === 200) {
      return response.data.reverse();
    }
  }
);
