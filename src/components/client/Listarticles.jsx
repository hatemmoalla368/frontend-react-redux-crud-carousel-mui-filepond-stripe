import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import {getArticles} from "../../features/articleslice";
import AfficheArticles from './AfficheArticles';

const Listarticles = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArticles());
        }, [dispatch])
  return (
    <div>
      <AfficheArticles/>
    </div>
  )
}

export default Listarticles
