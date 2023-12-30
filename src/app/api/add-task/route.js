import ConnectDB from "@/db/connectionDB";
import { NextResponse } from "next/server";
import Task from "@/db/Task";

export const POST = async (req) => {
      const data = await req.json();

      try {
            ConnectDB();

            if (data.user) {
                  const res = await Task.create({
                        ...data
                  })

                  if (res)
                        return NextResponse.json({
                              success: true,
                              message: "Task added successfully"
                        }, { status: 200 })
                  else
                        return NextResponse.json({
                              success: false,
                              message: "Error in adding task"
                        }, { status: 500 })
            }
            else {
                  return NextResponse.json({
                        success: false,
                        message: "Error in adding task"
                  }, { status: 404 })
            }
      }
      catch (err) {
            return NextResponse.json({
                  success: false,
                  message: "Error"
            }, { status: 500 })
      }
};
