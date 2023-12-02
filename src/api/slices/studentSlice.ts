import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StudentModel } from "../models/studentModel";
import {
  addNewStudent,
  deleteOneStudent,
  getAllStudents,
  getSingleStudent,
  newPostStudent,
} from "../actions/studentAction";

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

    // For Get Single Student
    builder.addCase(getSingleStudent.pending, (state) => {
      state.isLoading = true;
      state.message = "Student data is loading";
    });

    builder.addCase(
      getSingleStudent.fulfilled,
      (state, actions: PayloadAction<StudentModel>) => {
        state.isLoading = false;
        state.singleStudent = actions.payload;
        state.message = "Student data is fetched";
      }
    );

    builder.addCase(getSingleStudent.rejected, (state) => {
      state.isLoading = false;
      state.singleStudent = {} as StudentModel;
      state.message = "Something went wrong";
    });

    // For Add New Student
    builder.addCase(addNewStudent.pending, (state) => {
      state.isLoading = true;
      state.message = "New Student data is loading";
    });

    builder.addCase(
      addNewStudent.fulfilled,
      (state, actions: PayloadAction<StudentModel>) => {
        state.isLoading = false;
        state.allStudents = [...state.allStudents, actions.payload];
        state.message = "New Student added";
      }
    );

    builder.addCase(addNewStudent.rejected, (state) => {
      state.isLoading = false;
      state.singleStudent = {} as StudentModel;
      state.message = "Something went wrong";
    });

    // Add New Student
    builder.addCase(newPostStudent.pending, (state) => {
      state.isLoading = true;
      state.message = "New Student data is now loading";
    });

    builder.addCase(
      newPostStudent.fulfilled,
      (state, actions: PayloadAction<StudentModel>) => {
        state.isLoading = false;
        state.allStudents = [...state.allStudents, actions.payload];
        state.message = "New Student data added";
      }
    );

    builder.addCase(newPostStudent.rejected, (state) => {
      state.isLoading = false;
      state.message = "Something went wrong";
    });

    // For Delete One Student
    builder.addCase(deleteOneStudent.pending, (state) => {
      state.isLoading = true;
      state.message = "Student data is loading";
    });

    builder.addCase(
      deleteOneStudent.fulfilled,
      (state, actions: PayloadAction<StudentModel[]>) => {
        state.isLoading = false;
        state.allStudents = [...state.allStudents];
        state.message = "Student data is deleted";
      }
    );

    builder.addCase(deleteOneStudent.rejected, (state) => {
      state.isLoading = false;
      state.message = "Something went wrong";
    });
  },
});

export default studentSlice.reducer;
