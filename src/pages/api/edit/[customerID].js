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
  if (req.method === "PATCH") {
    {
      console.log("sssssssssssssssssssssssssssssssssss");
    }
    const id = req.query.customerID;
    const data = req.body.data;
    try {
      console.log(data);
      const customer = await Customer.findOne({ _id: id });
      customer.name = data.name;
      customer.LastName = data.LastName;
      customer.email = data.email;
      customer.phone = data.phone;
      customer.address = data.address;
      customer.postalCode = data.postalCode;
      customer.date = data.date;
      customer.products = data.products;
      customer.updatedAt = Date.now();
      await customer.save();
      res.status(200).json({
        status: "success",
        data: customer,
        message: "Data Has been Updated Successfully ",
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: "failed",
        message: `${err.message} The Record didn't change`,
      });
    }
  }
}
