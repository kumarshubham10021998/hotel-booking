import React, { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";

const Home = () => {
  const [properties, setProperties] = useState([]); // State to store property data
  const [error, setError] = useState(null); // State to store error messages
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Fetch properties data on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data); // Update properties with fetched data
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger my-5">Error: {error}</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Welcome to Our Booking Platform</h1>
      <div className="row">
        {properties.map((property) => (
          <div className="col-md-4" key={property._id}>
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
