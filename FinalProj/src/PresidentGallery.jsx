import { useEffect, useState } from "react"
import axios from 'axios'
import styles from './presidentgallery.module.css'
import { FaDownload, FaTrashAlt } from 'react-icons/fa'



/**
 *
 */
export default function presidentGallery(){
    const [files, setFile] = useState([])
    const [images, setImage] = useState([])
    
    const handleUpload = (e) =>{
        
        const formdata = new FormData()
        files.forEach(file => {
            console.log(files) ;
            formdata.append('file', file)
        })
        
        axios.post('http://localhost:3001/uploadImage', formdata)
        .then(res => {
                console.log(res);
                fetchImages();
                alert('Image uploaded successfully')
            })
        .catch(err => console.log(err))
    }

    const fetchImages = () => {
        axios.get('http://localhost:3001/getImage')
        .then(res => {
            console.log("Image you uploaded", res.data);
            setImage(res.data)
    })
        .catch(err => console.log(err))
    };

    const handleDownloadAll = () => {
        window.location.href = 'http://localhost:3001/download-all-images';
        alert('Zip file downloaded successfully')
    }

    const deleteImage = ( imageName ) => {
        axios.delete(`http://localhost:3001/deleteImage/${imageName}`)
        .then(res => {
            console.log(res);
            fetchImages();
            alert('Image deleted successfully');
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchImages();
    }, [])

    return (
        <div className={styles.mainGalleryCon}>
             <div className={styles.GalleryContainer}>
            {/* Event image uploading */}
            <input 
               type="file"
               multiple
               onChange={e => setFile(Array.from(e.target.files))}
               className={styles.GalleryInputBtn}
            />
            <button className={styles.GalleryUploadBtn} onClick={handleUpload}> 
                Upload 
            </button>
            <button className={styles.DownloadAllBtn} onClick={handleDownloadAll}> 
                Download Zip 
            </button>
            <br />
            </div>
            {images.map((img, index) => (
                <div className={styles.imageContainer} key={index} >
                <img 
                    src={`http://localhost:3001/uploads/${img.image}`}
                    alt="uploaded" 
                    className={styles.GalleryImages}
                />
                <div className={styles.actionButtons}>
                <a 
                  href={`http://localhost:3001/download/${img.image}`}
                  download={img.image}
                  className={styles.DownloadLink}
                >
                    <FaDownload/> Download
                </a>
                <button className={styles.DeleteButton}
                        onClick={() => deleteImage(img.image)}>
                    <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
            ))}
           
        </div>
    )
}