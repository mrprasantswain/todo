
      var todoinput=document.querySelector("#todoinput"),
      todoTitle=document.querySelector("#todoTitle"),
      totalTodo=document.querySelector("#totalTodo"),
      todosubmit=document.querySelector("#todosubmit"),
      showtodo=document.querySelector("#showtodo");
      var getLocalData=localStorage.getItem("mytododata")
      var todoarr=[], check, filterId="all", isEdit=false, editId;
      if(getLocalData){
        todoarr=JSON.parse(getLocalData);
        ShowTodo(todoarr);
      }
      ShowTodo(todoarr);
      function ShowFilter(){
        let todos=[];
        if(filterId=="all"){
          todos=todoarr;
        } else if(filterId=="pending"){
          todos=todoarr.filter(mytodo=>mytodo.status=="pending");
        } else if(filterId=="complete"){
          todos=todoarr.filter(mytodo=>mytodo.status=="complete");
        }
          ShowTodo(todos);
      }
      function TodoSubmit(){
        if(todoinput.value.trim()){
          if(!isEdit){
          let obj={
            name: todoinput.value.trim(),
            status: "pending",
            id:todoarr.length
          }
          todoarr.unshift(obj);
          } else {
            editId.name=todoinput.value.trim();
            isEdit=false;
          }
          todosubmit.innerText="Add New";
          localStorage.setItem("mytododata", JSON.stringify(todoarr))
          todoinput.value="";
          ShowFilter();
        } else {
          alert("Please write a todo first")
        }
      }
      
      function ShowTodo(todo){
        showtodo.innerHTML="";
        todoTitle.innerHTML="";
        totalTodo.innerHTML="";
        if(todo.length!=0){
        todo.forEach((data)=>{
          let check=(data.status=="complete")?"checked":"";
          showtodo.innerHTML+=`
    <div class="todoGroup ${check}" id="${data.id}">
      <input type="checkbox" onchange="ToggleTodo(this.parentElement)" ${check}/>
      <div class="todoName" onclick="ToggleTodo(this.parentElement)">${data.name}</div>
      <div class="todoBtn">
      <i class="fa fa-pen" onclick="TodoEdit(this.parentElement.parentElement)"></i>
      <i class="fa fa-trash" onclick="TodoDelete(this.parentElement.parentElement)"></i>
      </div>
    </div>
          `;
        });
       let FilterName=(filterId=="all")?"all Todo":` ${todo[0].status} Todo`;
        todoTitle.innerText=FilterName;
        totalTodo.innerText=todo.length;
        document.title=FilterName
        } else {
          let FilterName=(filterId=="all")?" ":` ${filterId} `
          showtodo.innerHTML=`<div class="noTodoMsg">No${FilterName}Task</div>`;
       todoTitle.innerText=FilterName +" Todo";
       document.title=FilterName +" Todo";
        totalTodo.innerText=0;
        }
      }
      
      function FilterTodo(val, thisid){
        filterId=val;
        let filterBtns=document.querySelectorAll(".filterBtn button");
        filterBtns.forEach((data)=>{
          data.classList.remove("active");
        })
        thisid.classList.add("active");
        ShowFilter();
      }
      
      function ToggleTodo(id){
        let getid=todoarr.find(data=>data.id==id.id);
        if(getid.status=="complete"){
          getid.status="pending";
        } else {
          getid.status="complete"
        }
        localStorage.setItem("mytododata", JSON.stringify(todoarr));
        ShowFilter();
      }
      function TodoEdit(id){
        let getid=todoarr.find(data=>data.id==id.id);
        isEdit=true;
        todoinput.value=getid.name;
        editId=getid;
        todosubmit.innerText="Update"
      }
      function TodoDelete(id){
        isEdit=false;
        todoinput.value="";
        todosubmit.innerText="Add New"
        let getIndex=todoarr.findIndex((obj)=>obj.id== id.id);
        todoarr.splice(getIndex, 1)
        localStorage.setItem("mytododata", JSON.stringify(todoarr))
        ShowFilter();
      }