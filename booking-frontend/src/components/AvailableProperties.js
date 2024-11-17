import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AvailableProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties.");
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-5">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-5">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6 my-5">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Available Properties</h1>
      <div className="row">
        {properties.map((property) => (
          <div key={property._id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card shadow-lg h-100">
              <img
                src={property.image}
                alt={property.name}
                className="card-img-top rounded"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-lg font-semibold">{property.name}</h5>
                <p className="card-text text-gray-700">
                  {property.description.length > 60
                    ? `${property.description.substring(0, 60)}...`
                    : property.description}
                </p>
                <p className="text-primary font-bold">${property.price}/month</p>
                <Link
                  to={`/property/${property._id}`}
                  className="btn btn-primary btn-sm w-100 mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableProperties;
