import { uesrModel } from "@/models/user-model"
import { dbConnect } from "@/service/mongo"

import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export const POST = async (request)=>{
    
    const {
        fname,
        lname,
        email,
        password
    } = await request.json()
    await dbConnect()
    const hashPassword = await bcrypt.hash(password, 5)
    const newUser = {
        name: `${fname} ${lname}`,
        email,
        password: hashPassword

    }

    try {
        await uesrModel.create(newUser)
        return new NextResponse("User has been created", {
            status:201,
        })
    } catch (err) {
        return new NextResponse(err.message, {
            status:500,
        })
    }

}