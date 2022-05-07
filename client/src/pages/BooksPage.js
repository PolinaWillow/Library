import React, {useCallback, useEffect, useState} from "react"
import 'bootstrap'
import '../styles/AddPage.css'
import {HeaderBooks} from "../components/HeaderBooks";
import {useHttp} from "../hooks/http.hook";
import {BookCard} from "../components/BookCard";

export const BooksPage = () =>{
    const {request} = useHttp()
    const [books, setBooks] = useState([])

    //Загрузка книг
    const fetchBooks = useCallback(async () => {
        try{
            const fetched = await request('/upload/allbooks','GET', null)
            setBooks(fetched)
        }catch(e){}
    },[request])
    useEffect(()=>{
        fetchBooks()
    }, [])


    return(
        <div>
            <HeaderBooks/>
            <div>
                <BookCard books={books}/>
            </div>
        </div>
    )
}