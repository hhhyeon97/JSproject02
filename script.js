
/*
유저가 값을 입력한다.
+ 버튼을 클릭하면 할 일이 추가된다.
삭제 버튼을 누르면 할 일이 삭제된다.
check 버튼을 누르면 할 일이 끝나면서 밑줄이 간다.
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
    //console.log("clicked"); 
    let taskContent = taskInput.value
    taskList.push(taskContent)
    console.log(taskList)
    render()
}

function render(){
    let resultHTML = ''

    for(let i=0; i<taskList.length; i++){  // 백틱 주의! 
        resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
        </div>`;
    }

    document.getElementById("taskBoard").innerHTML = resultHTML;
}





