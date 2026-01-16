const inputbox=document.getElementById("inputbox");
const addbtn=document.getElementById("addbtn");
const todolist=document.getElementById("todolist");
let added=document.querySelector(".added");
//const li=document.getElementById('li')
let edited=null;
const addTodo=()=> {
  let valuetext=inputbox.value.trim();
  if(valuetext.length<=0){
    alert('Please give any Todo');
    return false;
  }
 if(addbtn.innerHTML==="Edit"){
    edited.target.previousElementSibling.innerHTML=valuetext;
    editStorageTodo(valuetext);
    addbtn.innerHTML="Add";
    inputbox.value=" ";
    added.innerHTML=`<div class="addmsg"> Todo Edited Successfully <span class="span"> &times;</span></div>`;
  setTimeout(function(){
    added.innerHTML=''
  },1000)
  }
  else{
  let li=document.createElement("li");
  let p=document.createElement("p");
  p.innerHTML=valuetext;
  li.appendChild(p);
  let editbtn=document.createElement("button");
  editbtn.innerHTML="Edit";
  editbtn.classList.add("btn1");
  li.appendChild(editbtn);
  let removbtn=document.createElement("button");
  removbtn.innerHTML="Remove";
  removbtn.classList.add("btn2")
  li.appendChild(removbtn);
  
  todolist.appendChild(li);
  inputbox.value=" ";
  
  added.innerHTML=`<div class="addmsg"> Todo Add Successfully <span class="span"> &times;</span></div>`;
  setTimeout(function(){
    added.innerHTML=''
  },1000)
  saveTodos(valuetext);
  }
}
const uptTodo=(e)=> {
  if(e.target.innerHTML==="Remove"){
    todolist.removeChild(e.target.parentElement);
    added.innerHTML = `<div class="addmsg">Todo Remove Successfully <span class="span"> &times;</span></div>`;
setTimeout(function() {
  added.innerHTML = ''
}, 1000)
    deleteTodo(e.target.parentElement);
  }
  if(e.target.innerHTML==="Edit"){
    inputbox.value=e.target.previousElementSibling.innerHTML;
    inputbox.focus();
    addbtn.innerHTML= "Edit";
    edited=e;
  
  }
}
const saveTodos=(todo)=> {
  let todoArr;
  if(localStorage.getItem("todoArr")===null){
  todoArr=[];
  }
  else{
  todoArr=JSON.parse(localStorage.getItem("todoArr"))
  }

  todoArr.push(todo);
  localStorage.setItem("todoArr",JSON.stringify(todoArr));
  
}

const getTodo=()=> {
  let todoArr;
  if(localStorage.getItem("todoArr")===null){
  todoArr=[];
  }
  
  else{
  todoArr=JSON.parse(localStorage.getItem("todoArr"));
  todoArr.forEach(todo => {
  let li=document.createElement("li");
  let p=document.createElement("p");
  p.innerHTML=todo;
  li.appendChild(p);
  let editbtn=document.createElement("button");
  editbtn.innerHTML="Edit";
  editbtn.classList.add("btn1");
  li.appendChild(editbtn);
  let removbtn=document.createElement("button");
  removbtn.innerHTML="Remove";
  removbtn.classList.add("btn2")
  li.appendChild(removbtn);
  todolist.appendChild(li);
  
  });
  }
}

const deleteTodo=(todo)=> {
  let todoArr;
  if(localStorage.getItem("todoArr")===null){
  todoArr=[];
  }
  else{
  todoArr=JSON.parse(localStorage.getItem("todoArr"));
  }
  let todoText=todo.children[0].innerHTML;
  let todoIndex=todoArr.indexOf(todoText);
  todoArr.splice(todoIndex,1);
  localStorage.setItem("todoArr",JSON.stringify(todoArr));
}

const editStorageTodo=(todo)=> {
  let todoArr =JSON.parse(localStorage.getItem("todoArr"));

 todoArr[0]=inputbox.value;

 localStorage.setItem("todoArr",JSON.stringify(todoArr));
  console.log(todoArr)
}
document.addEventListener("DOMContentLoaded",getTodo);
addbtn.addEventListener("click",addTodo);
todolist.addEventListener("click",uptTodo);
