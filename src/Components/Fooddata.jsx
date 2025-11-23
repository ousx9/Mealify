import { useState } from "react";

function Fooddata({ fooddata, categories, selectedCategory, setSelectedCategory}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [search, setSearch] = useState("");
  const filtredFoods = fooddata.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  })
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  
  const currentFoods = filtredFoods.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(fooddata.length / itemsPerPage);

  const gotoPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };


  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">World Cuisine</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover delicious meals and culinary traditions from around the globe
          </p>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search dishes..." 
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-orange-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg 
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
        <select 
            className="px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md w-full md:w-auto"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories?.map((cat) => {
              if (cat === "pagination" || cat === "our-foods" || cat === "best-foods") {
                return null;
              }
              return (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              );
            })}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentFoods.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl border border-orange-100"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-semibold text-orange-600">${item.price}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <strong className="text-xl font-bold text-gray-800 line-clamp-1">{item.name}</strong>
                </div>
                <div className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">{item.dsc}</div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-medium">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                    </svg>
                    {item.country}
                  </span>
                  <div className="text-orange-500 font-medium">
                    {"⭐".repeat(item.rate)}
                    <span className="text-gray-400 text-xs ml-1">({item.rate})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-10 gap-2">
          <button
            className="px-3 py-1 bg-gray-400 rounded disabled:opacity-50"
            onClick={() => gotoPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <button
            className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-orange-500 text-white" : "bg-gray-400"}`}
            onClick={() => gotoPage(1)}
          >
            1
          </button>

          {currentPage > 4 && <span className="px-2">...</span>}

          {Array.from({ length: 5 }, (_, i) => {
            const page = currentPage - 2 + i;
            if (page > 1 && page < totalPages) {
              return (
                <button
                  key={page}
                  onClick={() => gotoPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page ? "bg-orange-500 text-white" : "bg-gray-400"
                  }`}
                >
                  {page}
                </button>
              );
            }
            return null;
          })}

          {currentPage < totalPages - 3 && <span className="px-2">...</span>}

          {totalPages > 1 && (
            <button
              className={`px-3 py-1 rounded ${
                currentPage === totalPages ? "bg-orange-500 text-white" : "bg-gray-400"
              }`}
              onClick={() => gotoPage(totalPages)}
            >
              {totalPages}
            </button>
          )}

          <button
            className="px-3 py-1 bg-gray-400 rounded disabled:opacity-50"
            onClick={() => gotoPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Fooddata;