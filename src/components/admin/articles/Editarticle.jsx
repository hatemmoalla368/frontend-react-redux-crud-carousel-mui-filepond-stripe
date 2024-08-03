import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { updateArticle } from '../../../features/articleslice';
import {getScategories} from "../../../features/scategorieSlice";

import axios from "axios"
import {useDispatch,useSelector} from "react-redux";
import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation,FilePondPluginImagePreview)

const Editarticle = ({show,handleClose,art}) => {
  const dispatch = useDispatch();
  const {scategories} = useSelector((state) =>state.storescategories);
  const [article, setArticle] = useState(art);
 
  const [files, setFiles] = useState([]);
  
  const [validated, setValidated] = useState(false);
  

  
  
  const handleShow = () => {
  setArticle(art)
    setFiles([{
      source: article.imageart,
      options: { type: 'local' }
    }]);
    setShow(true);
   
     
  };
  
  useEffect(() => {
    if(scategories.length==0){
    dispatch(getScategories());
  }
    setFiles( [
      {
        source: article.imageart,
        options: { type: 'local' }
      }
      ])
    },[dispatch]);

  

  const handlechange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(updateArticle(article))
        
          
          handleReset();
          setValidated(false);
          handleClose()
        
        
    }
    setValidated(true);
  };

  const handleReset = () => {
    setArticle({});
    setFiles([]);
    setValidated(false);
  };

    const serverOptions = () => { console.log('server pond');
      return {
      load: (source, load, error, progress, abort, headers) => {
      var myRequest = new Request(source);
      fetch(myRequest).then(function(response) {
      response.blob().then(function(myBlob) {
      load(myBlob);
      });
      });
      },
      process: (fieldName, file, metadata, load, error, progress, abort) => {
      console.log(file)
      const data = new FormData();
      data.append('file', file);
data.append('upload_preset', 'espssoir2023');
data.append('cloud_name', 'dlaeaf1g1');
data.append('public_id', file.name);
axios.post('https://api.cloudinary.com/v1_1/dlaeaf1g1/image/upload', data)
.then((response) => response.data)
.then((data) => {
console.log(data);
setArticle({...article,imageart:data.url}) ;
load(data);
})
.catch((error) => {
console.error('Error uploading file:', error);
error('Upload failed');
abort();
});
},
};
};
console.log(article)

  return (
    <div>
    
    <Button
    onClick={handleShow}
    variant="danger"
            size="md"
            className="text-danger btn-link warning"
    >
    <i className="fa-solid fa-pen-to-square"></i>
    
    </Button>

    <Modal show={show} onHide={handleClose}>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <Modal.Header closeButton>
    <h2>modifier Product</h2>
    </Modal.Header>
    <Modal.Body>
    <div className="container w-100 d-flex justify-content-center">
    <div>
    <div className='form mt-3'>
    <Row className="mb-2">
    <Form.Group as={Col} md="6" >
    <Form.Label >Référence *</Form.Label>
    <Form.Control
    required
    type="text"
    placeholder="Référence"
    name='reference'
    value={article.reference}
    onChange={(e)=>handlechange(e)}
    />
    <Form.Control.Feedback type="invalid">
    Saisir Référence Article
    </Form.Control.Feedback>
    </Form.Group>
    <Form.Group as={Col} md="6">
    <Form.Label>Désignation *</Form.Label>
    <Form.Control
    required
    type="text"
    placeholder="Désignation"
    name='designation'
    value={article.designation}
    onChange={(e)=>handlechange(e)}
    />
    <Form.Control.Feedback type="invalid">
    Saisir Désignation
    </Form.Control.Feedback>
    </Form.Group>
    </Row>
    <Row className="mb-2">
    <Form.Group className="col-md-6">
    <Form.Label>Marque *</Form.Label>
    <InputGroup hasValidation>
    <Form.Control
    type="text"
    required
    placeholder="Marque"
    value={article.marque}
    name='marque'
    onChange={(e)=>handlechange(e)}
    />
    <Form.Control.Feedback type="invalid">
    Marque Incorrecte
    </Form.Control.Feedback>
    </InputGroup>
    </Form.Group>
    <Form.Group as={Col} md="6">
    <Form.Label>Prix</Form.Label>
    <Form.Control
    type="number"
    placeholder="Prix"
    value={article.prix}
    name='prix'
    onChange={(e)=>handlechange(e)}
    />
    </Form.Group>
    </Row>
    <Row className="mb-3">
    <Form.Group className="col-md-6 ">
    <Form.Label>
    Qté stock<span className="req-tag">*</span>
    </Form.Label>
    <Form.Control
    required
    type="number"
    value={article.qtestock}
    name='qtestock'
    onChange={(e)=>handlechange(e)}
    placeholder="Qté stock"
    />
    <Form.Control.Feedback type="invalid">
    Qté stock Incorrect
    </Form.Control.Feedback>
    </Form.Group>
    
    <Form.Group as={Col} md="6">
    <Form.Label>S/Catégorie</Form.Label>
    <Form.Control
    as="select"
    type="select"
    value={article.scategorieID?.["_id"]}
    name='scategorieID'
    onChange={(e)=>handlechange(e)}
    >
    <option></option>
    {scategories.map((scat)=><option key={scat._id}
    value={scat._id}>{scat.nomscategorie}</option>
    )}
    </Form.Control>
    </Form.Group>
    </Row>
    <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
    <FilePond
    
    files={files}
    acceptedFileTypes="image/*"
    onupdatefiles={setFiles}
    allowMultiple={true}
    server={serverOptions()}
    name="file"
    
    />
    </div>
    </div>
    </div>
    </div>
    </Modal.Body>
    <Modal.Footer>
    <Button type="submit">Enregistrer</Button>
    <Button type="button" className="btn btn-warning"
    onClick={()=>handleReset()}>Annuler</Button>
    </Modal.Footer>
    </Form>
    </Modal>
    </div>
  )
}

export default Editarticle

