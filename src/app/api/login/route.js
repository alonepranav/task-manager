import User from "@/db/User";
import ConnectDB from "@/db/connectionDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/Constants";

export const POST = async (req) => {
      const data = await req.json();

      const { email, password } = data;

      try {
            ConnectDB();

            const user = await User.findOne({ email });

            if (!user) {
                  return NextResponse.json({
                        success: false,
                        message: "User does not exist"
                  }, { status: 404 });
            }

            try {
                  const passwordMatch = await bcrypt.compare(password, user.password);

                  if (passwordMatch) {
                        const token = jwt.sign(
                              { id: user._id, email: user.email },
                              JWT_SECRET,
                              { expiresIn: "3d" }
                        );

                        return NextResponse.json({
                              success: true,
                              data: {
                                    token,
                                    email,
                                    user: user._id
                              },
                              message: "User login successfully"
                        }, { status: 200 });
                  } else {
                        return NextResponse.json({
                              success: false,
                              message: "Invalid credentials"
                        }, { status: 404 });
                  }
            } catch (e) {
                  return NextResponse.json({
                        success: false,
                        message: "Invalid credentials"
                  }, { status: 401 });
            }
      } catch (err) {
            return NextResponse.json({
                  success: false,
                  message: "Internal server error"
            }, { status: 500 });
      }
};
