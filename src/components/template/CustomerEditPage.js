import React, { useState } from "react";
import Formfile from "../module/Formfile";
import { useRouter } from "next/router";
import moment from "moment";

function CustomerEditPage({ data, id }) {
  const date = data.date ? moment(data.date).utc().format("YYYY-MM-DD") : "";
  console.log(data);
  const [form, setForm] = useState({
    name: data.name,
    LastName: data.LastName,
    email: data.email,
    phone: data.phone || "",
    address: data.address || "",
    postalCode: data.postalCode || "",
    date: data.date || "",
    products: data.products || "",
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
    const res = await fetch(`/api/edit/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ data: form }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      router.push(`/customer/${id}`);
    }
  };
  return (
    <div className="customer-page">
      <h4>Edit Customer</h4>
      <Formfile form={form} setForm={setForm} />;
      <div className="customer-page__buttons">
        <button className="first" onClick={cancelHandler}>
          Cancel
        </button>
        <button className="second" onClick={saveHandler}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default CustomerEditPage;
