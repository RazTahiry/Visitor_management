import { useEffect, useState } from "react";
import {
  addVisitor,
  deleteVisitor,
  editVisitor,
  getAllVisitors,
} from "./services/api";
import { Tables } from "./components/Table";
import { VisitorChart } from "./components/Chart";
import "./App.css";
import { ModalForm } from "./components/ModalForm";
import { VisitorNavbar } from "./components/Navbar";

function App() {
  const [visitors, setVisitors] = useState([]);
  const [sum, setSum] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [lastNumVisitor, setlastNumVisitor] = useState("");
  // const [visitor, setVisitor] = useState({});
  // const fetchVisitor = async (numVisiteur) => {
  //   const visitorData = await getVisitor(numVisiteur);
  //   setVisitor(visitorData);
  // };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    const visitorsData = await getAllVisitors();
    setVisitors(visitorsData);
    if (visitorsData.length === 0) {
      setlastNumVisitor("");
    } else {
      setlastNumVisitor(visitorsData[visitorsData.length - 1].numVisiteur);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      console.log(formData);
      await addVisitor(formData);
      fetchVisitors();
    } catch (error) {
      console.error("Error adding visitor:", error);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await editVisitor(formData.numVisiteur, formData);
      // Update the visitor in the table
      setVisitors((prevVisitors) =>
        prevVisitors.map((visitor) =>
          visitor.numVisiteur === formData.numVisiteur
            ? { ...visitor, ...formData }
            : visitor
        )
      );
    } catch (error) {
      console.error("Error updating visitor:", error);
    }
  };

  const handleDelete = async (numVisiteur) => {
    try {
      await deleteVisitor(numVisiteur);
      setVisitors((prevVisitors) =>
        prevVisitors.filter((visitor) => visitor.numVisiteur !== numVisiteur)
      );
    } catch (error) {
      console.error("Error removing visitor:", error);
    }
  };

  return (
    <>
      <VisitorNavbar />

      <ModalForm
        classes="mt-5 transition py-2.5 px-5 text-sm font-medium focus:outline-none rounded-lg focus:z-10 focus:ring-gray-700 bg-secondary text-white hover:text-white hover:bg-primary hover:shadow-lg"
        buttonValue="Ajouter un visiteur"
        method="POST"
        onSubmit={handleSubmit}
        lastNumVisitor={lastNumVisitor}
      />

      <div className="flex flex-col-reverse lg:flex-row justify-between gap-4 px-3 pt-5">
        <div className="w-full flex justify-center">
          <VisitorChart min={min} max={max} total={sum} />
        </div>

        <div className="w-full flex justify-center mb-5 lg:mb-0">
          <Tables
            visiteurs={visitors}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            minTarif={setMin}
            maxTarif={setMax}
            totalTarif={setSum}
          />
        </div>
      </div>
    </>
  );
}

export default App;
