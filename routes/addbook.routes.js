const {Router, json} = require('express')
const router = Router()
const Book = require('../models/Book')

//Добавление книги
// /upload/addbook
router.post('/addbook',[], async (req, res) => {
        console.log('Body: ' + req.body)
        try{
            const {title, author, myopinion} = req.body
            const book = new Book({title, author, myopinion})
            await book.save()
            res.status(201).json({message: 'Новая книга добавлена'})
        }catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
        }
})

//Получение всех книги
// /upload/allbooks
router.get('/allbooks', async(req, res)=>{
    try{
        let ids = []
        const books = await Book.find({})
        res.json(books)
    }catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так('})
    }
})

//Получение книги по id
// /upload/book-info:id
router.get('/book-info:id', async (req, res)=>{
    console.log('На сервере')
    try{
        const book = await Book.findOne({_id: req.headers.id})
        console.log(book)
        console.log(res.data)
        res.json(book)
    }catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так('})
    }
})

//Удаление книги
// /upload/delete-book
router.post('/delete-book', async (req, res) =>{
    try{
        await Book.findByIdAndDelete({_id: req.headers.id})
        res.status(201).json({message: 'Информация о книге удалена'})
    }catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так('})
    }
})

//Изменение книги
// /upload/change-book
router.post('/change-book',[], async (req, res) =>{
    try {
        console.log('Change '+req.body)
        const {id, title, author, myopinion} = req.body

        console.log('Tile '+title)
        console.log('author '+author)
        console.log('myopinion '+myopinion)
        const book = await Book.findOne({_id: id})
        console.log('ID '+ book)

        await Book.findOneAndUpdate({_id: id}, {
            title, author, myopinion
        })
        res.status(201).json({message: 'Композиция успешно изменена!'})
    } catch(e) {
        res.status(500).json({message: 'Ошибка обновления'})
    }
})

module.exports = router