import React, { useEffect, useState } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";
function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");
  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
      //We are making a fetch request to the Pixabay API URL.
      //The URL includes a query parameter q which is set to the value of the term state variable.
    )
      .then((res) => res.json())
      //res.json() is a method provided by the Fetch API (built into modern web browsers) that reads the response stream
      // and parses it as JSON.
      //It returns a promise that resolves to a JavaScript object representing the JSON data.
      //res is the response object returned by the fetch function. It contains the raw data received from the API.
      //parsing as JSon means we are converting the raw data receivedfrom the API as JS object
      //When the API request is successful,
      //we parse the response data as JSON and
      .then((data) => {
        setImages(data.hits); //When the API request is successful,
        //you parse the response data as JSON and extract the hits property, which contains an array of image objects.
        setIsLoading(false);
      })
      //.then((data) => { ... }) is a promise-based approach. It allows you to work with the parsed JSON data (data) once it's available.
      //Inside the callback function, you set the images state with this parsed data.
      .catch((err) => console.log(err));
  }, [term]);
  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading....</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
