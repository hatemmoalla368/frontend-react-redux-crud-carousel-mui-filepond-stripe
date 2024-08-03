import React,{useState,useMemo} from 'react'
import ReactLoading from 'react-loading';
import {useSelector} from "react-redux"
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';


import {useDispatch} from "react-redux";
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
import { deleteScategorie } from '../../../features/scategorieSlice';
import Editscategorie from './Editscategorie';

const Affichescategorietable = () => {
    const dispatch=useDispatch()
    const [showModal, setShowModal] = useState(false);
    const {scategories,isLoading,error} = useSelector((state)=>state.storescategories);
    const [scategorie, setScategorie] = useState(null);
    const handleClose= () => {
        setShowModal(false);
        setScategorie(null);
    }
    const handleDelete=(id,nom)=>{
    if(window.confirm("supprimer Scategorie O/N")) {
    dispatch(deleteScategorie(id));
    toast(`Scategorie ${nom} Supprimé`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })
    }
    }
    
    const handleEdit = (item) => {
    setShowModal(true);
    setScategorie(item);
    };
    const columns = useMemo(
    () => [
        {
            accessorKey: 'imageUrl', // This should point to a key that holds the image URL
            header: 'Image',
            Cell: ({ cell }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  alt=""
                  height={100}
                  src={cell.row.original.imagescat || cell.row.original.imagescategorie}
                  loading="lazy"
                  style={{ borderRadius: '20%' }}
                />
              </Box>
            ),
          },
    {
    accessorKey: 'nomscategorie', //access nested data with dot notation
    header: 'nom ',
    size: 100,
    },
    

    
   
    
    {
    accessorKey: '_id',
    header: 'actions',
    size: 100,
    Cell: ({ cell, row }) => (
    <div >
    <Button
    onClick={() => handleEdit(cell.row.original)}
    size="md"
    className="text-warning btn-link edit"
    >
    <i class="fa-solid fa-pen-to-square"></i>
    </Button>
    <Button
    onClick={(e) => {
    handleDelete(cell.row.original._id,cell.row.original.nomscategorie);
    }}
    
    size="md"
    className="text-danger btn-link delete"
    >
    <i className="fa fa-trash" />
    </Button>
    
    </div>
    ),
    },
    
    ],
    [scategories],
    );
    if (isLoading) return <center><ReactLoading type='spokes' color="red"
    height={'8%'} width={'8%'} /></center>
    if (error) return <p>Impossible d'afficher la liste des scategories...</p>
  return (
    <>
    <div>
    <MaterialReactTable columns={columns} data={scategories} />;
    </div>
    {showModal && (
<Editscategorie
show={showModal}
handleClose={handleClose}
scat={scategorie}
/>
)}
   
    </>
  )
}

export default Affichescategorietable
