import React, { useState } from "react";
import {
  pod1,
  pod10,
  pod2,
  pod3,
  pod4,
  pod5,
  pod6,
  pod7,
  pod8,
  pod9,
  tai,
} from "../assets/images";
// Static data with placeholder images
const data = [
  { driverId: "DR1", orderId: "ORD1", pod: pod1, rating: 9 },
  { driverId: "DR2", orderId: "ORD2", pod: pod2, rating: 10 },
  { driverId: "DR3", orderId: "ORD3", pod: pod3, rating: 7 },
  { driverId: "DR4", orderId: "ORD4", pod: pod4, rating: 4 },
  { driverId: "DR5", orderId: "ORD5", pod: pod5, rating: 6 },
  { driverId: "DR6", orderId: "ORD6", pod: pod6, rating: 2 },
  { driverId: "DR7", orderId: "ORD7", pod: pod7, rating: 1 },
  { driverId: "DR8", orderId: "ORD8", pod: pod8, rating: 1 },
  { driverId: "DR9", orderId: "ORD9", pod: pod9, rating: 9 },
  { driverId: "DR10", orderId: "ORD10", pod: pod10, rating: 10 },
];
export const Monitor = () => {
  return (
    <div>
      <div>
        <h2 className="text-white text-[72px] p-0 m-0">POD Table</h2>
      </div>
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
                <th>Driver Id</th>
                <th>Order Id</th>
                <th>POD</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="py-4">
                  <td>{item.driverId}</td>
                  <td>{item.orderId}</td>
                  <td>
                    <img
                      width={"70px"}
                      height={"70px"}
                      src={item.pod}
                      alt="img"
                      style={{ maxHeight: "50px" }}
                    />
                  </td>
                  <td>{item.rating}</td>
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
                backgroundImage: `url(${tai})`,
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
