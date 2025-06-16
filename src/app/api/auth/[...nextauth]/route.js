import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "../../../../utils/database";
import User from "../../../../models/user";

console.log({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
})

const handler = NextAuth({
    debug: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {

        async session({session}) {

            try {
                const sessionUser = await User.findOne({
                    email: session.user.email
                })
                session.user.id = sessionUser._id.toString()

                return session;
                
            } catch (error) {
                return session
            }
        },

        async signIn ({profile}) {
            await connectToDB();
            try {
                // Check if the user already exists
                const userExists = await User.findOne({
                    email: profile.email
                })
                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.toLowerCase(),
                        image: profile.picture || ""
                    })
                }

                return true

            } catch (error) {
                return false
            }

        },


    }

})

export {handler as GET, handler as POST}