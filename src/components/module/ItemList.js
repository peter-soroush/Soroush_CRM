import React from "react";
import FormInput from "./FormInput";

function ItemList({ form, setForm }) {
  const { products } = form;
  const addHandler = async () => {
    await setForm({
      ...form,
      products: [...products, { name: "", price: "", qty: "" }],
    });

    console.log(products);
  };

  const changeHandler = (e, index) => {
    const { name, value } = e.target;
    const list = [...products];
    list[index][name] = value;
    setForm({
      ...form,
      products: list,
    });
  };
  const deleteHandler = (index) => {
    const list = [...products];
    list.splice(index, 1);
    setForm({
      ...form,
      products: list,
    });
  };
  return (
    <div className="item-list">
      <p>Purchased Products</p>
      <button onClick={addHandler}>Add Item</button>
      {products.map((product, index) => (
        <ProductItem
          key={index}
          product={product}
          index={index}
          changeHandler={(e) => changeHandler(e, index)}
          deleteHandler={() => deleteHandler(index)}
        />
      ))}
    </div>
  );
}

export default ItemList;

function ProductItem({ product, index, changeHandler, deleteHandler }) {
  return (
    <div className="form-input__list">
      <FormInput
        name="name"
        label="Product name"
        type="text"
        value={product.name}
        onChange={changeHandler}
      />
      <div>
        <FormInput
          name="price"
          label="Price"
          type="text"
          value={product.price}
          onChange={changeHandler}
        />
        <FormInput
          name="qty"
          label="QTY"
          type="number"
          value={product.qty}
          onChange={changeHandler}
        />
      </div>
      <div>
        <button onClick={deleteHandler}>Remove</button>
      </div>
    </div>
  );
}
