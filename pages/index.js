import { useSelector } from 'react-redux';
import SearchBar from "../Components/SearchBar";
import LoadingIcon from "../images/svg/LoadingIcon";

const Home = () => {
 const { data, loading, error } = useSelector((state) => state.weather);




 return (
  <div className="flex flex-col h-screen bg-gray-200">
   {/* Header div */}
   <div className="flex w-screen justify-start h-16 bg-black">
    <div className="flex items-center ml-4 font-bold text-white">My Weather App</div>
    <div className="flex flex-auto justify-center">
     <div className="flex items-center justify-center font-bold text-white mr-4">{data && !error ? data.location.name : ""}</div>
     <SearchBar />
    </div>
   </div>

   <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="flex items-center justify-center h-full">
     <div className="max-w-md p-8 bg-white rounded shadow-lg">
      {loading ? (
       <LoadingIcon />
      ) : (
       <div>
        {error && <p className="text-red-600 font-bold">{error}</p>}
        {data && !error ? (
         <div className="flex flex-col items-center">
          <div className="flex flex-row">
           <div className="flex flex-col">
            <h2 className="flex justify-center font-bold text-2xl">{data.location.name}</h2>
            <p className="text-gray-600">{data.current.condition.text}</p>
           </div>
           <p className="flex flex-auto ml-8 text-6xl">{data.current.temp_c}°<span className="text-gray-400">C</span></p>
          </div>

          <div className="flex justify-center mt-4">
           <img src={data.current.condition.icon} alt="Weather Icon" />
          </div>
         </div>
        ) : !error ? <h1 className="text-2xl justify-center items-center" > Search the City....</h1>
         : null
        }
       </div>
      )}
     </div>
    </div>
   </div>
  </div>
 );
};

export default Home;