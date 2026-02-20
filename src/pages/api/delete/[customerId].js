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
  if (req.method == "DELETE") {
    const id = req.query.customerId;
    try {
      await Customer.findByIdAndDelete(id);
      res
        .status(200)
        .json({ status: "success", message: "Data Deleted Successfully" });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ status: "failed", message: "The Record couldn't delete" });
    }
  }
}
