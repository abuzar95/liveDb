// src/components/TableComponent.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderTable.css"; // Import the CSS file for styling
import sap from "../assets/images/sap.png";

export const OrderTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://srv572320.hstgr.cloud:3100/get-all-orders"
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyItems: "start",
        alignItems: "center",
        padding: "1rem 2rem",
        gap: "1rem",
      }}
      className="flex-col md:flex-row flex"
    >
      <div className="w-full md:w-[70%] ">
        <h2>User Information</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Name</th>
              <th>Delivery Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="py-4">
                <td>{item.order_id}</td>
                <td>{item.name}</td>
                <td>{item.parcel_delivery_date}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full md:w-[30%] flex justify-center items-start flex-col">
        <p className="text-white text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          voluptate saepe maiores sequi possimus nihil harum architecto quis, at
          quod, distinctio magnam error earum eaque explicabo excepturi, nostrum
          suscipit. Labore!
        </p>
        <div className="w-full flex justify-center items-center">
          <div
            style={{
              backgroundImage: `url(${sap})`,
              width: "200px",
              height: "200px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain", // Changed to contain
              backgroundPosition: "center", // Optional: Center the image
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
