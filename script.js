
/*
사용자가 값을 입력한다.
+ 버튼을 클릭하면 할 일이 추가된다.
삭제 버튼을 누르면 할 일이 삭제된다.
check 버튼을 누르면 할 일이 끝나면서 밑줄이 그어진다.

check 버튼을 클릭 시 - true false
true 라면 끝난 걸로 간주하고 밑줄 샥 
false 이면 안 끝난 걸로 간주하고 그대로 


진행중 끝남 탭을 누르면 언더바가 이동한다.
끝남탭은 끝난 아이템만, 진행중탭은 진행중인 아이템만 보인다.
전체 탭을 누르면 다시 전체 아이템으로 돌아옴
*/

// ★ 콘솔 찍어보면서 기능이 잘 작동하는지 확인 하기 !! 


let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = []
let tabs = document.querySelectorAll(".taskTabs div");
let mode ='all'
let filterList = []

// underline은 필요없으므로 i=1부터 
for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);
    });
}



//버튼에 이벤트 할당       (이벤트,함수)
addBtn.addEventListener("click", addTask) 

function addTask(){
    // 정보들엔 고유한 아이디 값이 필요하다 ! 
    let task = {
        id : randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }

    taskList.push(task)
    console.log(taskList)
    render()
}

// html을 다시 그려주는 함수
function render(){

    // 1. 내가 선택한 탭에 따라서
    // 2. 리스트를 다르게 보여준다.
    // all  - > taskList
    // ongoing, done - > filterList

    let list = []
    if(mode === "all"){
        list = taskList;
    }
    else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    }

    let resultHTML = ''

    for(let i=0; i<list.length; i++){  // html 부분을 백틱으로 감싸기

        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task" style="background-color:#95a5cc;">
            <div class="taskDone">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left" style="color:green;"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash" style="color:red;"></i></button>
            </div>
            </div>`
        }else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check" style="color:green;"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash" style="color:red;"></i></button>
            </div>
            </div>`;
        }

    }

    document.getElementById("taskBoard").innerHTML = resultHTML;
}

// 클릭 이벤트 적용하는 방법 2가지 - > addEventListener / onclick 


// id 값을 매개변수로 받아와서 아이템 찾기 
function toggleComplete(id){
    console.log("id : ",id)
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;  // ★ check 유동적이게 !
            break;  // 아이템 찾으면 바로 빠져 나오게 
        }
    }
    render(); // ui 업데이트 
    console.log(taskList)

}

// delete 기능
function deleteTask(id){
    console.log("삭제하자")
    /*
    const taskIndex = taskList.findIndex(task => task.id === id);
    // 찾은 요소를 배열에서 제거
    if(taskIndex !== -1){
      taskList.splice(taskIndex, 1);
      render(); // 삭제 후 UI 업데이트 
  }
  */
  for (let i=0; i<taskList.length; i++){
    if(taskList[i].id == id){
        taskList.splice(i,1);
        break;
    }
  }
    render();
}


function filter(event) {
    //console.log("filter", event.target.id);

    mode = event.target.id
    filterList = []    // 필터된 아이템을 담을 변수


    if(mode === "all"){
        //전체 리스트 보여주기
        render();
    }else if(mode === "ongoing"){
        //진행중인 아이템 보여주기
        //task.isComplete=false
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
             filterList.push(taskList[i])   
            }
        }
        render()  // ui 업데이트 
        //console.log("진행중", filterList)

    }else if(mode === "done"){
        //끝난 아이템 보여주기
        //task.isComplete=true
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
             filterList.push(taskList[i])   
            }
        }
        render() 
    }
}


// 유일한 id 생성하기 
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}



