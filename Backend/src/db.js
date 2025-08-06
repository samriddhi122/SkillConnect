import mongoose from 'mongoose';
const DB_NAME = "skillConnect";
const connectdb=async()=>{
    try{
        console.log(`${process.env.MONGODB_URI}${DB_NAME}`)
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`)
        
        console.log(`\n MongoDB connected ! DB host: ${connectionInstance.connection.host}`);
    }catch(err){
        console.log("MONGODB connection error: ", err);
        process.exit(1)
    }
}
export default connectdb;