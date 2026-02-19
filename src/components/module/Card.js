import Link from "next/link";
import React from "react";

function Card({ customer }) {
  return (
    <div className="card">
      <div className="card__details">
        <p>
          {customer.name} {customer.LastName}
        </p>
        <p>{customer.email}</p>
      </div>
      <div className="card__buttons">
        <button>Delete</button>
        <Link href={`/customer/${customer._id}`}>Edit</Link>
        <Link href={`/details/${customer._id}`}>Details</Link>
      </div>
    </div>
  );
}

export default Card;
