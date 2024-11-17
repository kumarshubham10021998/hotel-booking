import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <img src={property.image} className="card-img-top" alt={property.name} />
      <div className="card-body">
        <h5 className="card-title">{property.name} </h5>
        <p className="card-text">{property.description}</p>
       <div className="row">
<div className="col-md-6">
<button
          className="btn btn-primary"
          onClick={() => navigate(`/property/${property._id}`)}
        >
          View Details
        </button>
</div>
<div className="col-md-6">
<span className="card-text bg-secondary text-light fw-bold p-2 rounded">${property.price}</span>
</div>
       </div>
       
      </div>
    </div>
  );
};

export default PropertyCard;
