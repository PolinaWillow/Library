import React from 'react'
import 'bootstrap'
import '../styles/BookCard.css'
import {Link} from "react-router-dom"
export  const BookCard = ({books}) =>{
    //console.log(books)
    if (!books.length){
        return(
            <p>У вас пока нет добавленных книг</p>
        )
    }
    return(
        <div>
        { books.map(book =>{
            return(
                <div>
                <p></p>
                <div className="container card">
                    <div className="card-body">
                        <Link to={`/detail/${book._id}`} className="nav-link authorname">
                            <p>{book.author} - {book.title}</p>
                        </Link>
                    </div>
                </div>
                </div>
            )
            })}
        </div>
    );
}