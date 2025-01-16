import { useState } from "react";
import { jsPDF } from "jspdf";

function App() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages(imageUrls);
    setCurrentIndex(0);
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    images.forEach((image, index) => {
      if (index > 0) pdf.addPage();
      pdf.addImage(image, "JPEG", 10, 10, 190, 277);
    });
    pdf.save("download.pdf");
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const nextSlide = () => {
    if (currentIndex < images.length - 3) setCurrentIndex(currentIndex + 1);
  };

  return (
    <>
      <div className="h-screen bg-col-b min-h-[150vh] flex flex-col">
        <div className="bg-col-b fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-600 
                        
                        flex flex-row justify-center items-center">
                      
                      <div className="text-3xl font-mono text-white
                                       hover:text-green-500">
                        pdfMaker
                      </div>
        </div>
        <div className="flex-grow">
          <div className="h-screen flex flex-col justify-center">
            <div className="flex flex-col justify-center items-center">
              {images.length > 0 && (
                <div className="w-3/4 px-8 flex items-center">
                  <button
                    onClick={prevSlide}
                    className="p-2 bg-gray-500 rounded disabled:opacity-50"
                    disabled={currentIndex === 0}
                  >
                    {"<"}
                  </button>
                  <div className="relative overflow-hidden mx-4 w-full">
                    <div
                      className="flex transition-transform duration-500 gap-4"
                      style={{
                        transform: `translateX(-${currentIndex * 34}%)`,
                      }}
                    >
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 w-1/3"
                          style={{ minWidth: "33%" }}
                        >
                          <img
                            src={image}
                            alt={`preview-${index}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={nextSlide}
                    className="p-2 bg-gray-500 rounded disabled:opacity-50"
                    disabled={currentIndex >= images.length - 3}
                  >
                    {">"}
                  </button>
                </div>
              )}
              {images.length === 0 && (
                <button
                  className="h-12 w-48 bg-but-1 border border-gray-500 rounded-md text-white font-bold
                            hover:border-green-600 hover:decoration-wavy hover:cursor-pointer hover:border-2"
                >
                  <label>
                    SELECT IMAGES
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                  </label>
                </button>
              )}
              {images.length > 0 && (
                <button
                  onClick={generatePDF}
                  className="mt-4 p-2 bg-green-500 text-white rounded border border-gray-700
                            hover:bg-green-400 "
                >
                  GENERATE PDF
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="bg-col-b2 border-t border-gray-700 h-32">
          <div className="h-full w-full flex flex-col justify-center items-center">
             <div className="h-1/4 text-white hover:text-green-600">********************************</div>
             <div className="h-1/2 text-white hover:text-green-600 font-mono">CRAFTED BY ADITYA KAMBOJ</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
