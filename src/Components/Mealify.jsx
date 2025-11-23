import React, {useState, useEffect} from "react"
import Fooddata from "./Fooddata";








function Mealify(){ 
const [food, setFood] = useState([]);
const [isLoading, setIsloading] = useState(false);
const [error, setError] = useState();
const [categories, setCategories] = useState([])
const [selectedcategory , setSelectedCategory] = useState("");
const URL = "https://free-food-menus-api-two.vercel.app";

useEffect(() => {
    const FetchData = async() => {
        setIsloading(true);
    const endpoint = selectedcategory ? `${URL}/${selectedcategory}` : `${URL}/all`
        try{
            const response = await fetch(endpoint);
            const data = await response.json();
            setFood(selectedcategory ? data : data['our-foods']);
        }catch(e){
            setError(e)
        }finally{
            setIsloading(false);
        }
    }
    FetchData();
}, [selectedcategory])

useEffect(() => {
  const FetchData = async() => {
    const cateresponse = await fetch(`${URL}/all`);
    const catedata = await cateresponse.json();
    console.log(catedata);
    setCategories(Object.keys(catedata));

  }
  FetchData();
},[])






if(error){
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-600 mb-4">Please try again later</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

if(isLoading){
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold text-gray-800">Loading...</h3>
        <p className="text-gray-600 mt-2">Please wait while we fetch your data</p>
      </div>
    </div>
  )
}



return(
  <>
    <Fooddata fooddata = {food} categories={categories} selectedCategory={selectedcategory} setSelectedCategory={setSelectedCategory}/>    
  </>
);
}





export default Mealify