
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

// 그림 그려줄 함수
function render(){
    let resultHTML = ''

    for(let i=0; i<taskList.length; i++){  // 백틱 주의! 

        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task" style="background-color:#95a5cc;">
            <div class="taskDone">${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-left" style="color:green;"></i></button>
                <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash" style="color:red;"></i></button>
            </div>
            </div>`
        }else {
            resultHTML += `<div class="task">
            <div>${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check" style="color:green;"></i></button>
                <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash" style="color:red;"></i></button>
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


// 유일한 id 생성하기 
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}



