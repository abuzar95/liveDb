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
          "https://srv572320.hstgr.cloud:3100/orders"
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className="text-white text-[72px] p-0 m-0">Order Table</h2>
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
        <div className="w-full md:w-[80%] ">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Name</th>
                <th>Delivery Data</th>
                <th>Status</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Delivery Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="py-4">
                  <td>{item.order_id}</td>
                  <td>{item.name}</td>
                  <td>{item.parcel_delivery_date}</td>
                  <td>{item.status}</td>
                  <td>{item.address}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.parcel_delivery_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full md:w-[20%] flex justify-center items-start flex-col">
          {/* <p className="text-white text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            voluptate saepe maiores sequi possimus nihil harum architecto quis,
            at quod, distinctio magnam error earum eaque explicabo excepturi,
            nostrum suscipit. Labore!
          </p> */}
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
    </div>
  );
};
