import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb+srv://zaminhesenov:JHaHHGcFW0A5aR62@cluster0.lzbqs.mongodb.net/Instagram?retryWrites=true&w=majority'

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('connected to mongodb')
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

export default dbConnect

