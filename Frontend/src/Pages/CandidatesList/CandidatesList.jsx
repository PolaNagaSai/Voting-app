import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../Components/Card/Card';
import "./CandidatesList.css"
import { useAuth } from '../../AuthContext';

const CandidatesList = () => {
    const [candidates, setCandidates] = useState([]);
    const { isAuthenticated, hasVoted, setHasVoted } = useAuth();

  

    useEffect(() => {
      fetchCandidates();
      console.log("HKA0",hasVoted)
  }, []);

    //fetch data from backend
    const fetchCandidates = async () => {
      try {
        const response = await axios.get("http://localhost:3000/candidate/");
        setCandidates(response.data);
        
        
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    // Function to handle voting
    const handleVote = async (candidateId) => {
      try {
        const token = localStorage.getItem('authToken');
        
        // Check if token is available
        if (!token) throw new Error('Token not found in local storage');
    
        const response = await axios.post(
          `http://localhost:3000/candidate/vote/${candidateId}`,
          {}, // Request body (can be empty)
          {
            headers: {
              'Authorization': `Bearer ${token}` // Include Bearer prefix
            }
          }
        );
        // Handle successful response
        if (response.status === 200) {
          alert('Vote registered successfully!');
          setHasVoted(true);
          localStorage.setItem("voted",isVoted);
          fetchCandidates(); // Refresh candidate list
          
        }
      } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status === 400) {
                // Handle 400 Bad Request specifically
                alert('You have already voted');
            } else {
                // Handle other status codes
                alert(`Error: ${error.response.status} - ${error.response.data}`);
            }
        } else if (error.request) {
            // The request was made but no response was received
            alert('No response received from the server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            alert('An unexpected error occurred. Please Login.');
        }
        console.error('Error voting:', error);
    }
    };

    
  return (
    <>
    {/* <div>
      {hasVoted ? <p>You have already voted.</p> : <p>You have not voted yet.</p>}
    </div> */}
    <div className='candidateList'>
      <h1>List of Candidates</h1>
      <ul>
        {candidates.map(candidate => (
          <li key={candidate._id}><Card cName={candidate.name} cAge={candidate.age} cParty={candidate.party} onVote={()=>handleVote(candidate._id)} voted={hasVoted} />

          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default CandidatesList