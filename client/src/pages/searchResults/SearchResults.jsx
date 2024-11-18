import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./SearchResults.css";
import Navbar from "../../components/navbar/Navbar";
import SearchBar from "../../components/searchBar/SearchBar";

// const data = [
//   {
//     first_name: "Amit",
//     last_name: "Sharma",
//     city: "Mumbai",
//     contact_number: "9876543210",
//   },
//   {
//     first_name: "Amit",
//     last_name: "Verma",
//     city: "Delhi",
//     contact_number: "9123456789",
//   },
//   {
//     first_name: "Sandeep",
//     last_name: "Gupta",
//     city: "Bangalore",
//     contact_number: "9876549870",
//   },
//   {
//     first_name: "Sandeep",
//     last_name: "Kumar",
//     city: "Hyderabad",
//     contact_number: "9871234567",
//   },
//   {
//     first_name: "Priya",
//     last_name: "Mehta",
//     city: "Ahmedabad",
//     contact_number: "9874561230",
//   },
//   {
//     first_name: "Priya",
//     last_name: "Chopra",
//     city: "Pune",
//     contact_number: "9112345678",
//   },
//   {
//     first_name: "Rajesh",
//     last_name: "Singh",
//     city: "Jaipur",
//     contact_number: "9907654321",
//   },
//   {
//     first_name: "Rajesh",
//     last_name: "Yadav",
//     city: "Lucknow",
//     contact_number: "9812345678",
//   },
//   {
//     first_name: "Ankita",
//     last_name: "Patel",
//     city: "Surat",
//     contact_number: "9123459876",
//   },
//   {
//     first_name: "Ankita",
//     last_name: "Jain",
//     city: "Chennai",
//     contact_number: "9812341234",
//   },
//   {
//     first_name: "Saurabh",
//     last_name: "Shah",
//     city: "Mumbai",
//     contact_number: "9876541222",
//   },
//   {
//     first_name: "Vikas",
//     last_name: "Agarwal",
//     city: "Delhi",
//     contact_number: "9901234567",
//   },
//   {
//     first_name: "Vikram",
//     last_name: "Rao",
//     city: "Bangalore",
//     contact_number: "9123456543",
//   },
//   {
//     first_name: "Sunil",
//     last_name: "Mishra",
//     city: "Kolkata",
//     contact_number: "9123453212",
//   },
//   {
//     first_name: "Sunita",
//     last_name: "Joshi",
//     city: "Pune",
//     contact_number: "9876547890",
//   },
//   {
//     first_name: "Suresh",
//     last_name: "Nair",
//     city: "Hyderabad",
//     contact_number: "9909876543",
//   },
// ];

const SearchResults = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation(); // Get the current location (URL)
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q"); // Get the search query parameter
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  console.log(backendUrl);
  
  useEffect(() => {
    if (searchTerm) {
      fetchSearchResults(searchTerm);
    }
  }, [searchTerm]);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchSearchResults = async (term) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        // fetch(`${backendUrl}/api/endpoint`)
        `http://localhost:8000/api/search/?q=${term}`
      );
      setFilteredUsers(response?.data?.data);
    } catch (err) {
      setError("No results found or error occurred.");
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Navbar searchResultPage={true} />
      {isMobile && <SearchBar isSearchBar = {isMobile} />} {/* Show only on mobile */}

      <div className={`search-results ${showModal ? "blur-background" : ""}`}>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {filteredUsers.length === 0 && !loading ? (
          <div className="empty-state">
            <img src="errorImg.png" alt="No Results" />
           <p>No results found</p></div>
        ) : (
          <div className="card-container">
            {filteredUsers.map((user, idx) => (
              <div key={idx} className="user-card">
                <div className="card-top">
                  <img src={"ellipseImg.png"} alt={`${user.first_name}`} />
                  <span className="name">{`${user.first_name} ${user.last_name}`}</span>
                  <span>
                    <i className="fas fa-map-marker-alt location-icon"></i>
                    <span>{user.city}</span>
                  </span>
                </div>

                <div className="card-bottom">
                  <div className="details">
                    <i className="fas fa-phone contact-icon"></i>
                    <span>{user.contact_number}</span> <br />
                    <span className="available">Available on phone</span>
                  </div>

                  <div className="fetch-btn-container">
                    <button onClick={() => handleFetchDetails(user)}>
                      Fetch Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && selectedUser && (
          <div className="modal">
            <div className="modal-content">
              <h2>Fetch Details</h2>
              <p>Here are the details of the following employee.</p>
              <p>
                <strong>Name:</strong> {selectedUser.first_name}{" "}
                {selectedUser.last_name}
              </p>
              <p>
                <strong>Location:</strong> {selectedUser.city}
              </p>
              <p>
                <strong>Contact Number:</strong> {selectedUser.contact_number}
              </p>
              <p>
                <strong>Profile Image:</strong>
              </p>
              <img
                src="popupImg.png"
                alt="Profile"
                style={{ width: "100px", height: "100px" }}
              />
              <button onClick={handleCloseModal} className="close-button">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;
