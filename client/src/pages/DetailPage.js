import React, {useCallback, useEffect, useState} from "react"
import 'bootstrap'
import '../styles/DetailPage.css'
import {HeaderDetail} from "../components/HeaderDetail";
import {DetailCard} from "../components/DetailCard"
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {useHistory} from "react-router-dom";

export const DetailPage = () =>{
    const {request} = useHttp()
    const [detailbook, setDetailbook] = useState({})
    const [changebook, setChangebook] = useState({
       id:'', title: '', author: '', myopinion: ''
    })

    const history = useHistory()
    const bookId = useParams().id//Получение id книги
    detailbook.id = bookId
    changebook.id = bookId

    //Загрузка книги
    const getOneBook = useCallback(async ()=>{
        try{
           const fetched = await request(`/upload/book-info:${bookId}`,'GET', null, {id:bookId})
            setDetailbook(fetched)
        }catch (e) {}
    },[])

    useEffect(()=>{
        getOneBook()
    }, [])

    //Удаление книги
    async function deleteBook(){
        console.log('id Delete: '+bookId)
        const fetchInfo = await fetch('/upload/delete-book', {method: 'POST', headers: {id: bookId}})
        history.push('/') //Возврат на главную страницу
    }

    //Изменение книги
    let valAuthor = detailbook.author //Не работает
    let valTitle = detailbook.title
    let valOpinion = detailbook.myopinion
    changebook.title = detailbook.title
    changebook.author = detailbook.author
    changebook.myopinion = detailbook.myopinion
    const changeHandler = event => {
        setChangebook({ ...changebook, [event.target.name]: event.target.value })
    }
    async function changeBook(){
        try{
            console.log(changebook)
            //console.log(detailbook)
            let formData = new FormData()
            formData.id = changebook.id
            formData.title=changebook.title
            formData.author=changebook.author
            formData.myopinion=changebook.myopinion

            console.log(formData)
            const fetchInfo = await fetch('/upload/change-book',{method: 'POST', body: '666'})
            console.log('FetchInfo ' + fetchInfo)
            history.push('/') //Возврат на главную страницу

        }catch (e) {}
        console.log('Ошибка отправки')
    }


    return(
        <div>
            <HeaderDetail/>
            <div className="container detailBook">
                <div >
                    {detailbook && <DetailCard detailbook = {detailbook}/>}
                </div>
                <div className="i-area">
                    <span  className="cursor-pointer" role="button" data-bs-toggle="modal" data-bs-target="#DeleatModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-trash-fill icon" viewBox="0 0 16 16" >
                        <path
                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                    </span >

                    <span className="cursor-pointer" role="button" data-bs-toggle="modal" data-bs-target="#changeModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-pencil-square icon" viewBox="0 0 16 16">
                        <path
                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                    </span >
                </div>
            </div>


            <div className="modal fade" id="DeleatModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="deleteModalLabel">Вы действительно хотите удалить книгу?</h6>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                            <button type="button" className="btn addButton" data-bs-dismiss="modal" onClick={deleteBook}>Удалить</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="changeModal" tabIndex="-1" aria-labelledby="changeModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="changeModalLabel">Вы хотите изменить информацию о книге?</h6>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Название:</label>
                                    <input type="text" className="form-control" id="recipient-name" name='title'
                                           onChange={changeHandler}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Автор:</label>
                                    <input type="text" className="form-control" id="recipient-author" name='author'
                                           onChange={changeHandler}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Мое мнение:</label>
                                    <textarea className="form-control" id="message-text" name='myopinion'
                                               onChange={changeHandler}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                            <button type="button" className="btn addButton" data-bs-dismiss="modal" onClick={changeBook}>Изменить</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}