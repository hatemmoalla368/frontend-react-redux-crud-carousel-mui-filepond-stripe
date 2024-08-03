import React,{useEffect} from 'react'
import { useDispatch } from "react-redux";
import {getArticles} from "../../../features/articleslice";
import AfficheAerticleTable from './AfficheAerticleTable';
import Insertarticle from './Insertarticle';
const ProductsAppAdmin = () => {
    const dispatch = useDispatch();
useEffect(() => {
dispatch(getArticles());
},[])
  return (
    <div>
        <Insertarticle/>
<AfficheAerticleTable />
</div>
  )
}

export default ProductsAppAdmin
