import React from "react";
import 'bootstrap'
import '../styles/DetailPage.css'
import {Link} from "react-router-dom"

export  const DetailCard = ({detailbook}) =>{
    return(
        <div>
            <h2>{detailbook.title}</h2>
            <h5>{detailbook.author}</h5>
            <h5 id="opinion">Мой отзыв:</h5>
            <p className="text-opin">{detailbook.myopinion} </p>
        </div>
    )
}