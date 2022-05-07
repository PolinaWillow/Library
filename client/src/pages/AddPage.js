import React, {useState}  from "react"
import 'bootstrap'
import '../styles/AddPage.css'
import {HeaderAdd} from "../components/HeaderAdd";
import {useHttp} from "../hooks/http.hook";
import {useHistory} from "react-router-dom";

export const AddPage = () =>{
    const {loading, request} = useHttp()
    const [form, setForm] = useState({
        title: '', author: '', myopinion: ''
    })
    const history = useHistory()
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const addHandler = async () => {
      try{
          console.log(form)
          const data = await request('/upload/addbook', 'POST', {...form})
          console.log('Data ', data)
          history.push('/') //Возврат на главную страницу
      }catch (e) {}
        window.location.reload();
        return false
    }

    return(
        <div>
            <HeaderAdd/>
            <div className="container addNew">
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Название</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" name = "title"
                           onChange={changeHandler}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Автор</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" name = "author"
                           onChange={changeHandler}/>
                </div>

                <div className="mb-3 textDescription">
                    <label htmlFor="formGroupExampleInput" className="form-label">Мой отзыв</label>
                    <textarea className="form-control" aria-label="With textarea" rows="7" name = "myopinion"
                              onChange={changeHandler}></textarea>
                </div>

                <button type="button" className="btn btn-dark addButton"
                        onClick={addHandler} disabled={loading}>Добавить</button>
            </div>
        </div>
    )
}