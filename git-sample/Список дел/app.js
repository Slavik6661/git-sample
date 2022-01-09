// Global
const todoList=document.getElementById("todo-list")
const userSelect=document.getElementById("user-todo")
let todos=[]
let users=[]
const form=document.querySelector('form')
//Attach

document.addEventListener('DOMContentLoaded',initApp)
form.addEventListener('submit',handleSubmit)
//Event

function initApp() {
Promise.all([getAllTodos(),getusers()]).then(values => {
    [todos,users]=values

//отправить в разметку 
todos.forEach(todo => {printTodo(todo)})
users.forEach(user =>CreateUsreOptions(user))
})
}

function handleTodoChange(){
    const todoId=this.parentElement.dataset.id
    const completed=this.checked
    
    toggoleTodoComplete(todoId,completed)
}

function handleClose(){
    const todoId=this.parentElement.dataset.id
    deleteTodo(todoId)
}

function handleSubmit(event) {
    event.preventDefault()
    createTodo({
        userId:1,
        title: form.todo.value,
        completed:false
    })
}
//Basic logic
function getUsersName(userId) {
    const user=users.find(u => u.id == userId)
    return user.name
}

function CreateUsreOptions(user){
  const option=  document.createElement("option")
    option.value=user.id
    option.innerText=user.name

    userSelect.append(option)
}

function printTodo({id,userId,title,completed}) {
    const li=document.createElement('li')
    li.className = 'todo-item'
    li.dataset.id=id
    li.innerHTML = `<span>${title} <i>by</i> <b>${getUsersName(userId)}</b> </span>`
    const status =document.createElement('input')
    status.type="checkbox"
    status.checked=completed
    status.addEventListener('change',handleTodoChange)

    const close=document.createElement("span")
    close.innerHTML='&times;'
    close.className='close'
    close.addEventListener('click',handleClose)

    li.prepend(status)
    li.append(close)
    todoList.prepend(li)
}

function removeTodo(todoId) {
todos=todos.filter(todo=>todo.id!==todoId)
const todo=todoList.querySelector(`[data-id="${todoId}"]`)
todo.querySelector('input').removeEventListener('change',handleTodoChange)
todo.querySelector('.close').removeEventListener('click',handleClose)
todo.remove()
}
//Async

async function getAllTodos(){

    
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data =await response.json();
    return data
}

async function getusers(){

    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data =await response.json();
    return data
}

async function createTodo(todo){
   const response = await fetch('https://jsonplaceholder.typicode.com/todos',{
    method:'POST',
    body:JSON.stringify(todo),
    headers:{
        'Content-Type':'application/json',
    },
   })

   const newtodo=await response.json()

   printTodo(newtodo)
}

async function toggoleTodoComplete(todoId,completed){
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`,{
        method:'PATCH',
        body:JSON.stringify({completed}),
        headers:{
            'Content-Type':'application/json',
        },
    })

}

async function  deleteTodo(todoId){
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
        },
    })
    if(response.ok){
        removeTodo(todoId)
    }
}

