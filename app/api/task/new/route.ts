import Task from "@models/tasks";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { task } = await req.json();

  try {
    await connectToDB();
    const newTask = new Task({ task });

    await newTask.save();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Failed to create a new task", { status: 500 });
  }
};
