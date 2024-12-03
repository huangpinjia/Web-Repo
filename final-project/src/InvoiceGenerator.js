import React, { useState } from "react";
import Axios from "axios";
import './InvoiceGenerator.css';

const InvoiceGenerator = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    const addItem = () => {
        const newItem = { name, amount, quantity, total: amount * quantity };
        setItems([...items, newItem]);
        setName("");
        setAmount(0);
        setQuantity(0);
    };

    const saveToDatabase = () => {
        items.forEach((item) => {
            Axios.post("http://localhost:3001/api/save-item", item)
                .then((res) => {
                    console.log(res.data.message);
                })
                .catch((err) => {
                    console.error("Error saving item:", err);
                });
        });
        alert("Items saved successfully!");
        setItems([]);
    };

    return (
        <div className="invoice-generator">
            <h1>Invoice Generator</h1>
            <div className="form">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button onClick={addItem}>Add Item</button>
            </div>
            <div className="items">
                <h2>Items</h2>
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.amount} x {item.quantity} = {item.total}
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={saveToDatabase}>Save to Database</button>
        </div>
    );
};

export default InvoiceGenerator;
