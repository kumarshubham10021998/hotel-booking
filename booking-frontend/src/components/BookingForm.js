import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const BookingForm = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // State for showing modal

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
      }
    };

    fetchProperty();
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      property: id,
      user: "12345", // Add your user ID here (get from authentication context)
      checkIn,
      checkOut,
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setSuccessMessage("Booking successful!");
        setCheckIn(""); // Clear form fields
        setCheckOut("");

        // Show the "Thank you for booking" modal
        setShowModal(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Booking failed.");
      }
    } catch (err) {
      setError("An error occurred while creating the booking.");
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!property) return <div>Loading...</div>;

  return (
    <div className="container my-5" style={{ marginTop: "300px" }}>
      <h1 className="text-center mb-4">Booking Form for {property.name}</h1>

      {/* Success Message */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleBookingSubmit}>
        <div className="row">
          {/* Check-in Date */}
          <div className="col-md-6 mb-3">
            <label htmlFor="checkIn" className="form-label">Check-in Date</label>
            <input
              type="date"
              id="checkIn"
              className="form-control"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>

          {/* Check-out Date */}
          <div className="col-md-6 mb-3">
            <label htmlFor="checkOut" className="form-label">Check-out Date</label>
            <input
              type="date"
              id="checkOut"
              className="form-control"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="mb-3">
          <h4>Property Information</h4>
          <p><strong>Description:</strong> {property.description}</p>
          <p><strong>Price:</strong> ${property.price}</p>
          <p><strong>Location:</strong> {property.location}</p>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg">
            Book Now
          </button>
        </div>
      </form>

      {/* Bootstrap Modal for Thank You Message */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thank you for booking!</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Your booking has been successfully placed. We will reach out to you soon.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
