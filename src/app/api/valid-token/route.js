import ConnectDB from "@/db/connectionDB";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/Constants";

export const POST = async (req) => {
      const data = await req.json();

      try {
            ConnectDB();

            const a = jwt.verify(data.token, JWT_SECRET);

            if (a.id === data.user && a.email === data.email) {

                  return NextResponse.json({
                        success: true,
                        message: "Valid Token"
                  }, { status: 200 })
            }

            return NextResponse.json({
                  success: true,
                  message: "Invalid Token"
            }, { status: 500 })
      }
      catch (err) {
            return NextResponse.json({
                  success: false,
                  message: "Invalid token"
            }, { status: 500 })
      }
};
