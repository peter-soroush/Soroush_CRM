import Customer from "../../../../models/Customer";
import connectDB from "../../../../utils/connectDB";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "Something went wrong related to DB connection",
      error: err.message,
    });
    return;
  }

  if (req.method === "POST") {
    const data = req.body.data;
    if (!data.name || !data.LastName || !data.email) {
      return res.status(400).json({
        status: "failed",
        message: "Missing required fields",
      });
    }
    try {
      const customer = await Customer.create(data);
      res.status(201).json({
        status: "success",
        message: "Data Created Successfully",
        data: customer,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ status: "failed", message: "Error in storing Data in DB" });
    }
  }
}
