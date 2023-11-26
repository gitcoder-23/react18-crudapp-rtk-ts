import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StudentModel } from "../models/studentModel";
import { getAllStudents, getSingleStudent } from "../actions/studentAction";

export interface initialStateInterface {
  allStudents: StudentModel[];
  singleStudent: StudentModel;
  message: string;
  isLoading?: boolean;
}

const initialState: initialStateInterface = {
  allStudents: [],
  singleStudent: {} as StudentModel,
  message: "",
  isLoading: false,
};

const studentSlice = createSlice({
  name: "studentSlice",
  initialState: initialState,

  reducers: {},
  extraReducers: function (builder) {
    // For Get All Students
    builder.addCase(getAllStudents.pending, (state) => {
      state.isLoading = true;
      state.message = "Student data is loading";
    });

    builder.addCase(
      getAllStudents.fulfilled,
      (state, actions: PayloadAction<[StudentModel]>) => {
        state.isLoading = false;
        state.allStudents = actions.payload;
        state.message = "Student data is fetched";
      }
    );

    builder.addCase(getAllStudents.rejected, (state) => {
      state.isLoading = false;
      state.allStudents = [];
      state.message = "Something went wrong";
    });

    // For Get Single Students
    builder.addCase(getSingleStudent.pending, (state) => {
      state.isLoading = true;
      state.message = "Student data is loading";
    });

    builder.addCase(
      getSingleStudent.fulfilled,
      (state, actions: PayloadAction<any>) => {
        state.isLoading = false;
        state.singleStudent = actions.payload;
        state.message = "Student data is fetched";
      }
    );

    builder.addCase(
      getSingleStudent.rejected,
      (state, actions: PayloadAction<any>) => {
        state.isLoading = false;
        state.message = "Something went wrong";
      }
    );
  },
});

export default studentSlice.reducer;
