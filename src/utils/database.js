import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('MongoDB is already Connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.log(error)
  }
}