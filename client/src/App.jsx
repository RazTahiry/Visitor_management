import { useEffect, useState } from "react";
import { addVisitor, deleteVisitor, getAllVisitors } from "./services/api";
import { Tables } from "./components/Table";
import { VisitorChart } from "./components/Chart";
import "./App.css";
import { ModalForm } from "./components/ModalForm";

function App() {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    const visitorsData = await getAllVisitors();
    setVisitors(visitorsData);
  };

  const handleSubmit = async (formData) => {
    try {
      await addVisitor(formData);
      fetchVisitors();
    } catch (error) {
      console.error("Error adding visitor:", error);
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
      <ModalForm
        classes="py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
        buttonValue="Add a visitor"
        method="POST"
        onSubmit={handleSubmit}
      />

      <div className="flex flex-col-reverse lg:flex-row justify-between gap-4 px-3 pt-5">
        <div className="w-full flex justify-center">
          <VisitorChart />
        </div>

        <div className="w-full flex justify-center mb-5 lg:mb-0">
          <Tables visiteurs={visitors} onDelete={handleDelete} />
        </div>
      </div>
    </>
  );
}

export default App;
