import {useState,useEffect} from 'react';
import axios from 'axios';
import "./Admin.css"
import AdminNav from './AdminNav';


const API_URL = "http://localhost:3000/candidate/";

const Admin=()=>{

  const [candidates,setCandidates]=useState([]);
  const [newCandidate,setNewCandidate]=useState({name:"",age:"",party:""});

  const[editingCandidate,setEditingCandidate]=useState(null);

  useEffect(() => {
      fetchCandidates();
  }, []);

  
    //fetch data from backend
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(API_URL);
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
  
    const handleCreate = async () => {
      try {
        await axios.post(API_URL, newCandidate);
        fetchCandidates();
        setNewCandidate({name:"",age:"",party:""});
      } catch (error) {
        console.error('Error creating candidate:', error);
      }
    };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${editingCandidate._id}`, editingCandidate);
        fetchCandidates();
        setEditingCandidate(null);
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
        fetchCandidates();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  return(
    <>
    <AdminNav/>
      <div>
        <h2>Create Candidate</h2>
        <input type="text" placeholder="Name" value={newCandidate.name} onChange={(e)=>setNewCandidate({...newCandidate,name:e.target.value})}/>
        <input type="number" placeholder="Age" value={newCandidate.age} onChange={(e)=>setNewCandidate({...newCandidate,age:e.target.value})}/>
        <input type="text" placeholder="partyName" value={newCandidate.party} onChange={(e)=>setNewCandidate({...newCandidate,party:e.target.value})}/>
        <button onClick={handleCreate}>Create</button>
      </div>

      <div>
        <h2>Edit Candidate</h2>
        {editingCandidate && (<>
        
          <input type="text" placeholder="Name" value={editingCandidate.name} onChange={(e)=>setEditingCandidate({...editingCandidate,name:e.target.value})}/>
          <input type="number" placeholder="Age" value={editingCandidate.age} onChange={(e)=>setEditingCandidate({...editingCandidate,age:e.target.value})}/>
          <input type="text" placeholder="partyName" value={editingCandidate.party} onChange={(e)=>setEditingCandidate({...editingCandidate,party:e.target.value})}/>
          <button onClick={handleUpdate}>Update</button>
        </>) }
      </div>

      <div>
        <h2>Candidates List</h2>
        <div className="list"><strong>Name : Age : Party</strong></div>
        <ul>
          { candidates.map(candidate=>(
          <li key={candidate._id}>
            <strong>{candidate.name} : {candidate.age}</strong>:{candidate.party}
            <button onClick={()=>{setEditingCandidate(candidate)}}>Edit</button>
            <button onClick={()=>{handleDelete(candidate._id)}}>Delete</button>
          </li>
          ))}
        
        </ul>
      </div>
    </>
    
  )
}
export default Admin;