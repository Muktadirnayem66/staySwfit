import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth from 'next-auth'
import GoogleProvier from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import mongoClientPromise from './database/mongoClientPromise'
import creadentialProvier from 'next-auth/providers/credentials'
import { uesrModel } from './models/user-model'
import bcrypt from 'bcryptjs'



export const {
    handlers:{GET, POST},
    auth,
    signIn,
    signOut
    } = NextAuth({
    adapter: MongoDBAdapter(mongoClientPromise, {databaseName:process.env.ENVIRONMENT}),
    session:{
        strategy:"jwt",
    },
    providers: [
        
        GoogleProvier({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        }),

        FacebookProvider({
            clientId:process.env.FACEBOOK_CLIENT_ID,
            clientSecret:process.env.FACEBOOK_CLIENT_SECRET
        }),
         creadentialProvier({
            credentials:{
                email:{},
                password:{}
            },

            async authorize(credentials){
                if(credentials == null) return null;
                try {
                    const user = await uesrModel.findOne({email: credentials.email})
                    if(user){
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password,
                        )
                        if(isMatch){
                            return user
                        }else{
                            throw new Error("Email or password mismatch")
                        }
                    }else{
                        throw new Error("User not found")
                    }
                } catch (error) {
                    throw new Error(error)
                }
            }

         })
    ]
})