import Task from "@/db/Task";
import ConnectDB from "@/db/connectionDB";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {

      const id = params.id;

      try {
            ConnectDB();

            if (id == undefined)
                  throw new Error();

            const user = await Task.find({ user: id });

            return NextResponse.json({
                  success: true,
                  tasks: [...user],
                  message: "User Tasks"
            }, { status: 200 });

      } catch (err) {
            return NextResponse.json({
                  success: false,
                  message: "Internal server error"
            }, { status: 500 });
      }
};



export const DELETE = async (req, { params }) => {

      const id = params.id;

      try {
            ConnectDB();

            if (id == undefined)
                  throw new Error();

            const user = await Task.deleteOne({ _id: id });

            return NextResponse.json({
                  success: true,
                  message: "Task deleted"
            }, { status: 200 });

      } catch (err) {
            return NextResponse.json({
                  success: false,
                  message: "Internal server error"
            }, { status: 500 });
      }
};
