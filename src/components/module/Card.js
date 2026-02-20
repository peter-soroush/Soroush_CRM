import Link from "next/link";
import React from "react";

function Card({ customer }) {
  const deleteHandler = async () => {
    const res = await fetch(`/api/delete/${customer._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      window.location.reload();
    }
  };

  return (
    <div className="card">
      <div className="card__details">
        <p>
          {customer.name} {customer.LastName}
        </p>
        <p>{customer.email}</p>
      </div>
      <div className="card__buttons">
        <button onClick={deleteHandler}>Delete</button>
        <Link href={`/edit/${customer._id}`}>Edit</Link>
        <Link href={`/customer/${customer._id}`}>Details</Link>
      </div>
    </div>
  );
}

export default Card;
