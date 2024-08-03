import React,{useEffect} from 'react'
import { useDispatch } from "react-redux";
import { getScategories } from '../../../features/scategorieSlice';
import Affichescategorietable from './Affichescategorietable';
import Insertscategorie from './Insertscategorie';

const Scategoriesappadmin = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getScategories());
        },[])
  return (
    <div>
        <Insertscategorie/>
      <Affichescategorietable/>
    </div>
  )
}

export default Scategoriesappadmin
