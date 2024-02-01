import Task from "@models/tasks";
import { IDeleteTaskRequestParam } from "@types";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: IDeleteTaskRequestParam
) => {
  try {
    await connectToDB();
    await Task.findByIdAndDelete(params.id);

    return NextResponse.json("Task deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Failed to delete task", { status: 500 });
  }
};
