import React, { Fragment } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

export function VisitorChart({ min, max, total }) {
  const labels = ["Tarif minimal", "Tarif maximal", "Tarif total"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Tarif",
        backgroundColor: "rgb(200, 200, 255)",
        borderColor: "rgb(255, 255, 255)",
        data: [min, max, total],
      },
    ],
  };

  return (
    <>
      <Bar data={data} className="p-4" style={{ fontFamily: "Poppins" }} />
    </>
  );
}

VisitorChart.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
