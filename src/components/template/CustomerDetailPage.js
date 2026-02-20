import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function CustomerDetailPage({ data, id }) {
  const router = useRouter;
  const deleteHandler = async () => {
    const res = await fetch(`/api/delete/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      router.push("/");
    }
  };

  const products = data?.products || [];

  // 2. Compute totals on the fly (No useState needed)
  const totalQty = products.reduce(
    (sum, product) => sum + Number(product.qty || 0),
    0,
  );

  // Note: Standard business logic dictates Total Price = sum of (price * qty)
  const totalPrice = products.reduce(
    (sum, product) =>
      sum + Number(product.price || 0) * Number(product.qty || 0),
    0,
  );

  return (
    <div className="customer-detail">
      <h4>Customer's Details</h4>
      <div className="customer-detail__main">
        <div className="customer-detail__item">
          <span>Name: </span>
          <p>{data.name}</p>
        </div>
        <div className="customer-detail__item">
          <span>Lastname: </span>
          <p>{data.LastName}</p>
        </div>
        <div className="customer-detail__item">
          <span>Email: </span>
          <p>{data.email}</p>
        </div>
        <div className="customer-detail__item">
          <span>Phone: </span>
          <p>{data.phone}</p>
        </div>
        <div className="customer-detail__item">
          <span>Address: </span>
          <p>{data.address}</p>
        </div>
        <div className="customer-detail__item">
          <span>PostalCode: </span>
          <p>{data.postalCode}</p>
        </div>
        <div className="customer-detail__item">
          <span>Date: </span>
          <p>{moment(data.date).utc().format("YYYY-MM-DD")}</p>
        </div>
      </div>
      <div className="customer-detail__products">
        <p>Name</p>
        <p>Price</p>
        <p>Quantity</p>
        {data.products.map((product) => (
          <React.Fragment key={product.id}>
            <p>{product.name}</p>
            <span>{product.price}</span>
            <span>{product.qty}</span>
          </React.Fragment>
        ))}
        <p>Total:</p>
        <span>{totalPrice}</span>
        <span>{totalQty}</span>
      </div>
      <div className="customer-detail__buttons">
        <p>Edit or Delete?</p>
        <button onClick={deleteHandler}>Delete</button>
        <Link href="/edit/[customerId]" as={`/edit/${id}`}>
          Edit
        </Link>
      </div>
    </div>
  );
}

export default CustomerDetailPage;
