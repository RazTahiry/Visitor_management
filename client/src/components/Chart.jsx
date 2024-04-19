import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

export function VisitorChart({ min, max, total }) {
  const labels = ["Tarif minimum", "Tarif maximum", "Tarif total"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Tarif",
        backgroundColor: [
          "rgb(100, 100, 255)",
          "rgb(255, 200, 200)",
          "rgb(100, 255, 100)",
        ],
        borderColor: "rgb(255, 255, 255)",
        data: [min, max, total],
      },
    ],
  };

  return (
    <>
      <Bar data={data} />
    </>
  );
}

VisitorChart.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
