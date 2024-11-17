import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Add useNavigate for programmatic navigation

const PropertyDetails = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const navigate = useNavigate(); // Initialize the navigate hook
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/properties/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch property details.");
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 mt-5">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-5">Error: {error}</p>;

  // Handle the button click to navigate to the booking page
  const handleAddBooking = () => {
    navigate(`/booking/${id}`); // Navigate to the booking page with the property id
  };

  return (
    <div className="container mx-auto px-3 lg:px-5 my-5">
      <div className="row gx-5 align-items-center">
        {/* Image Section */}
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <img
            src={property.image}
            alt={property.name}
            className="img-fluid rounded shadow-lg"
          />
        </div>

        {/* Details Section */}
        <div className="col-12 col-md-6 text-center text-md-left space-y-3">
          <h1 className="text-3xl font-bold text-gray-800">{property.name}</h1>
          <p className="text-lg">
            <span className="font-semibold">Description: </span>
            {property.description}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Price: </span>${property.price}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Location: </span>
            {property.location}
          </p>
          {/* Button to navigate to booking form */}
          <button onClick={handleAddBooking} className="btn btn-primary btn-lg mt-3">
            Add Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
