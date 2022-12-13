import React, { useState } from 'react'
import { uploadFile } from './config';

const FirebaseUpload = () => {
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const result = await uploadFile(file)
        console.log(result)
  
      }
      catch (error) {
        console.log(error)
      }
  
    }
  
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="file" src="" alt="" onChange={(e) => setFile(e.target.files[0])}/>
        <button type="submit">Subir archivo</button>
      </form>
    )


}

export default FirebaseUpload