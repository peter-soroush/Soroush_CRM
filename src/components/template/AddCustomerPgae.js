import React, { useState } from "react";
import Formfile from "../module/Formfile";
import { useRouter } from "next/router";

function AddCustomerPgae() {
  const [form, setForm] = useState({
    name: "",
    LastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    date: "",
    products: [],
  });

  const router = useRouter();

  const cancelHandler = () => {
    setForm({
      name: "",
      LastName: "",
      email: "",
      phone: "",
      address: "",
      postalCode: "",
      date: "",
      products: [],
    });
    router.push("/");
  };
  const saveHandler = async () => {
    const res = await fetch("/api/customer", {
      method: "POST",
      body: JSON.stringify({ data: form }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      router.push("/");
    }
  };
  return (
    <div className="customer-page">
      <h4>Add Customer</h4>
      <Formfile form={form} setForm={setForm} />
      <div className="customer-page__buttons">
        {/* BEM */}
        <button className="first" onClick={cancelHandler}>
          {" "}
          Cancel{" "}
        </button>
        <button className="second" onClick={saveHandler}>
          {" "}
          Save{" "}
        </button>
      </div>
    </div>
  );
}

export default AddCustomerPgae;
