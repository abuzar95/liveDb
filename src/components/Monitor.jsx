import React, { useState } from "react";
import { FaEye, FaFilter, FaTimes } from "react-icons/fa";
import { TbHeartRateMonitor } from "react-icons/tb";
import { VscActivateBreakpoints } from "react-icons/vsc";
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
} from "../assets/images";
import { selectAgentDetails } from "../redux/agentSlice";
import { useSelector } from "react-redux";
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
const PodCard = ({ title, isActive, onToggleActive, onView }) => {
  return (
    <div className="p-4 bg-gray-900 shadow-lg shadow-gray-800 hover:scale-105 border-[2px] border-gray-900 rounded-lg">
      <div className="text-xl font-bold text-white">{title}</div>
      <div className="flex justify-center items-center gap-3 mt-2">
        <button
          className={`flex justify-center items-center gap-2 text-white rounded-lg px-4 py-2 ${
            isActive ? "bg-green-900" : "bg-gray-800"
          }`}
          // onClick={onToggleActive}
        >
          <VscActivateBreakpoints className="rotate-180" />
          {isActive ? "Activated" : "Activate"}
        </button>
        <button
          className={`flex justify-center items-center gap-2 bg-gray-800 text-white rounded-lg px-4 py-2 ${
            isActive ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          disabled={!isActive}
          onClick={onView}
        >
          <FaEye />
          View
        </button>
      </div>
    </div>
  );
};
const Table = ({
  data,
  onFilterChange,
  selectedRating,
  currentPage,
  onPageChange,
  onImageClick,
}) => {
  const rowsPerPage = 6;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const handleRatingChange = (event) => {
    onFilterChange(
      event.target.value === "all" ? "all" : Number(event.target.value)
    );
  };
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      onPageChange(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  return (
    <section className="container px-4 mx-auto mt-4">
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-700 md:rounded-lg">
              <div className="flex justify-between items-center bg-gray-800 p-4">
                <span className="text-white">Filter by Rating: </span>
                <button
                  value={selectedRating}
                  onChange={handleRatingChange}
                  className="text-black bg"
                >
                  <div className="text-white bg-slate-700 flex items-center px-2 py-1">
                    <FaFilter />
                    <select className="bg-transparent">
                      <option value="all" className="bg-slate-500 px-2 py-1">
                        All
                      </option>
                      {[...Array(10).keys()].map((n) => (
                        <option
                          key={n + 1}
                          value={n + 1}
                          className="bg-slate-500 px-2 py-1"
                        >
                          {n + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </button>
              </div>
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-400">
                      Driver-Id
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-400">
                      Order-Id
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-400">
                      Proof of Delivery
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-400">
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-700">
                  {paginatedData.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
                      }
                    >
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                        {item.driverId}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                        {item.orderId}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                        <img
                          src={item.pod}
                          alt="Proof of Delivery"
                          className="w-16 h-16 cursor-pointer"
                          onClick={() => onImageClick(item.pod)}
                        />
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                        {item.rating}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center bg-gray-800 p-4">
                <button
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg"
                  onClick={() => handlePageChange("prev")}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg"
                  onClick={() => handlePageChange("next")}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export const Monitor = () => {
  const [cardsData] = useState([
    { title: "POD Audit 3.1" },
    { title: "POD Audit Beta" },
  ]);
  const [activeCard, setActiveCard] = useState(null);
  const [viewedCard, setViewedCard] = useState(null);
  const [tableData] = useState(data);
  const [selectedRating, setSelectedRating] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const agents = useSelector(selectAgentDetails);
  const auditAgents = agents?.filter((agent) => agent.agentType === "Audit");
  const handleToggleActive = (index) => {
    setActiveCard(index === activeCard ? null : index);
  };
  const handleView = (index) => {
    setViewedCard(index);
    setCurrentPage(1);
  };
  const handleImageClick = (imgSrc) => {
    setModalImage(imgSrc);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };
  const filteredData =
    selectedRating === "all"
      ? tableData
      : tableData.filter((item) => item.rating === selectedRating);
  return (
    <div className="h-[100%] bg-background p-4">
      <div className="flex justify-center items-center text-white text-5xl gap-2">
        <span>
          <TbHeartRateMonitor className="mt-2" />
        </span>
        <span>Monitor</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {cardsData.map((card, index) => {
          const matchingAgent = auditAgents.find(
            (agent) => agent.externalModel === card.title
          );
          return (
            <PodCard
              key={index}
              title={card.title}
              isActive={Boolean(matchingAgent)} // Check if there is a matching agent
              onToggleActive={() => handleToggleActive(index)}
              onView={() => handleView(index)}
            />
          );
        })}
      </div>
      {viewedCard !== null && (
        <Table
          data={filteredData}
          onFilterChange={setSelectedRating}
          selectedRating={selectedRating}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onImageClick={handleImageClick}
        />
      )}
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
          onClick={handleCloseModal}
        >
          <div
            className="relative bg-gray-900 p-4 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white"
              onClick={handleCloseModal}
            >
              <FaTimes size={20} />
            </button>
            <img
              src={modalImage}
              alt="Modal Proof of Delivery"
              className="w-[500px] h-[400px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
