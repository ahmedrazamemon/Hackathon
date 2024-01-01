import React, { useState, useEffect } from 'react';
import {
  addDoc,
  collection,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../Config/firebase';
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';
import { storage } from '../Config/firebase';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';

function Requests(){
  const [links,setlinks] = useState([])
  const [videotitle,setvideotitle] = useState('')
  const [videolink,setvideolink] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(videotitle==""&&videolink==""){
        toast.error('Please Fill all fields', {
          theme: 'dark',
          position: 'top-right',
          autoClose: 1000,
        });
      }

      else{

        await addDoc(collection(db, 'users'), {
         link:videolink,
         video:videotitle,
          // created: Timestamp.now(),
        });
        toast.success('Added', {
          theme: 'dark',
          position: 'top-right',
          autoClose: 1000,
        });
        setvideolink('');
        setvideotitle('');
      }
      } catch (err) {
        alert(err);
      }
  };

  useEffect(() => {
    const q = query(collection(db,'users'), orderBy('created', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setlinks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  
  return(
    
    <div>
      <Sidebar/>
      <div>
        <h1 className="header">Saylani Admin Panel</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
          <div style={{ width: '400px', padding: '20px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Add Data</h2>
            <div style={{ marginBottom: '20px' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', color: '#555' }}>
              Video Title:
            </label> <input
                type="text"
                value={videotitle}
                onChange={(e) => setvideotitle(e.target.value)}
                id="username"
                name="username"
                style={{
                  width: '100%',
                  padding: '8px',
                  boxSizing: 'border-box',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
                required
              />
              
              <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', color: '#555' }}>
                Video Link:
              </label>
              <input
                type="text"
                value={videolink}
                onChange={(e) => setvideolink(e.target.value)}
                id="username"
                name="username"
                style={{
                  width: '100%',
                  padding: '8px',
                  boxSizing: 'border-box',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
                required
              />  
              <br/>
               <button
                type="submit"
                onClick={handleSubmit}
                style={{
                  marginTop:10,
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#3498db',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                Add+
              </button>
            </div>
    </div>
    </div>
    </div>
    {
      links.map((v,i)=>{
        console.log(i)
        return(
          <>
          <b>{v.data.link}</b>
          </>
        )
      })
    }
</div>   
  )
}export default Requests;