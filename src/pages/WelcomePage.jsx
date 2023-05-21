import React from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  const handleBooksClick = () => {
    navigate("/books");
  };

  const handlePublishersClick = () => {
    navigate("/publishers");
  };

    return (
        <div className="flex items-center mb-8 justify-center h-screen mr-20">
        <img
                src="6888606.jpg"
                alt="Library"
                className="mr-2"
                style={{height: "40%"} }
            />
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="text-4xl font-bold mb-8">Knjižnica</div>
                <div className="flex">
                    <button
                        className="py-4 px-8 bg-blue-500 text-white rounded mr-4"
                        onClick={handleBooksClick}
                    >
                        Knjige
                    </button>
                    <button
                        className="py-4 px-8 bg-blue-500 text-white rounded"
                        onClick={handlePublishersClick}
                    >
                        Nakladnici
                    </button>
                </div>
            </div>
    </div>
  );
}

export default WelcomePage;
