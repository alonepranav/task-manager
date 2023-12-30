import User from "@/db/User";
import ConnectDB from "@/db/connectionDB";
import { NextResponse } from "next/server"
import bcrypt from "bcrypt";


export const POST = async (req) => {
      const data = await req.json();

      const { email, password } = data

      ConnectDB();

      try {

            if (email && password) {
                  const r = await User.findOne({
                        email
                  })

                  if (!r) {
                        bcrypt.genSalt(10, function (err, salt) {
                              bcrypt.hash(password, salt, async function (err, hash) {

                                    const t = await User.create({
                                          email, password: hash
                                    })
                              });
                        });
                  }

                  if (r !== null) {
                        return NextResponse.json({ success: false, message: "User already exist" }, { status: 200 })
                  }
                  else {
                        return NextResponse.json({ success: true, message: "User created Succesfully" }, { status: 200 })
                  }
            }
            else
                  return NextResponse.json({ success: false, message: "Invalid details" }, { status: 404 })

      } catch (error) {
            return NextResponse.json({ success: false, error }, { status: 501 })
      }
}