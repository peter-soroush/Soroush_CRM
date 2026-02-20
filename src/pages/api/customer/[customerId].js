import connectDB from "../../../../utils/connectDB";
import Customer from "../../../../models/Customer";

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
  }
  if (req.method === "GET") {
    const id = req.query.customerId;
    const customer = await Customer.findOne({ _id: id });
    res.status(200).json({
      status: "success",
      data: customer,
      message: `${customer.name}'s data Retrieved Successfully`,
    });
    try {
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ status: "failed", message: "The Record couldn't retrieved" });
    }
  }
}
