
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

++ 슬라이드 바 동적 구현
enter 입력해도 추가되게 하기

진행중,완료 탭에서도 삭제 바로 화면에 반영되게 

ui 스타일링 하기 
*/


// ★ 콘솔 찍어보면서 기능이 잘 작동하는지 확인 하기 !! 


let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = []
let tabs = document.querySelectorAll(".taskTabs div");
let mode ='all'
let filterList = []
let list = []


// 입력창에 대한 이벤트 처리
taskInput.addEventListener("keydown", function(event) {
    // 엔터 키가 눌렸을 때
    if (event.key === "Enter") {
        // 입력값 얻기
        const inputValue = taskInput.value.trim();
        // 입력값이 없거나 스페이스바만 입력된 경우
        if (inputValue === "" || inputValue === " ") {
            // 알림창 표시
            alert("할 일을 입력해주세요!");
            taskInput.value=""
            taskInput.focus();
        } else {
            // 할 일 추가 함수 호출
            addTask();
        }
    }
});


// underline은 제외한 i=1부터 
for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);
    });
}

/*
// tabs를 순회하며 각 탭에 클릭 이벤트 추가
tabs.forEach(function(tab){
    tab.addEventListener("click", function(event){
        // 현재 클릭된 탭에 해당하는 언더바의 위치를 설정
        let underline = document.querySelector("#underLine");
        underline.style.left = `${tab.offsetLeft}px`;

        // filter 함수 호출
        filter(event);
    });
});
*/

// 초기 상태 설정
document.getElementById("all").classList.add("clicked");

// 클릭된 탭에 대한 이벤트 핸들러 등록
tabs.forEach(tab => {
    tab.addEventListener("click", function(event) {
        // 모든 탭의 clicked 클래스 제거
        tabs.forEach(t => {
            t.classList.remove("clicked");
        });
        // 클릭된 탭에 clicked 클래스 추가
        event.target.classList.add("clicked");
        // 필터 함수 호출
        filter(event);
    });
});


//버튼에 이벤트 할당       (이벤트,함수)
addBtn.addEventListener("click", addTask) 

function addTask() {
    // 입력값 얻기
    const inputValue = taskInput.value.trim();
    // 입력값이 없거나 스페이스바만 입력된 경우
    if (inputValue === "" || inputValue === " ") {
        // 알림창 표시
        alert("할 일을 입력해주세요!");
        taskInput.value=""
        taskInput.focus();
    } else {
        // 정보들엔 고유한 아이디 값이 필요하다 ! 
        let task = {
            id: randomIDGenerate(),
            taskContent: inputValue,
            isComplete: false
        }
    
        taskList.unshift(task);  // 최신 task가 배열의 맨 앞에 추가되어 최신 할 일이 위에 나타나게 수정
        taskInput.value = ""
        taskInput.focus();
        console.log(taskList)
        render()
    }
}



// html을 다시 그려주는 함수
function render(){

    // 1. 내가 선택한 탭에 따라서
    // 2. 리스트를 다르게 보여준다.
    // all  - > taskList
    // ongoing, done - > filterList


    if(mode === "all"){
        list = taskList;
    }
    else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    }

    let resultHTML = ''

    for(let i=0; i<list.length; i++){  // html 부분을 백틱으로 감싸기

        if(list[i].isComplete == true){
            resultHTML += `<div class="task" style="background-color:#c8d3e8;">
            <div class="taskDone">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left" style="color:#8cb58a; margin-right:15px;"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash" style="color:#e691b3; margin-left:15px; margin-right:15px;"></i></button>
            </div>
            </div>`
        }else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check" style="color:#8cb58a; margin-right:15px;"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash" style="color:#e691b3; margin-left:15px; margin-right:15px;"></i></button>
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
    for(let i=0; i<list.length; i++){
        if(list[i].id == id){
            list[i].isComplete = !list[i].isComplete;  // ★ check 유동적이게 !
            break;  // 아이템 찾으면 바로 빠져 나오게 
        }
    }
    render(); // ui 업데이트 
    console.log(taskList)

}

// delete 기능
function deleteTask(id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            list.splice(i, 1);
            if (mode === 'all') {
                for (let j = 0; j < taskList.length; j++) {
                    if (taskList[j].id === id) {
                        taskList.splice(j, 1);
                        break;
                    }
                }
            } else {
                for (let j = 0; j < taskList.length; j++) {
                    if (taskList[j].id === id) {
                        taskList.splice(j, 1);
                        break;
                    }
                }
                for (let j = 0; j < filterList.length; j++) {
                    if (filterList[j].id === id) {
                        filterList.splice(j, 1);
                        break;
                    }
                }
            }
            break;
        }
    }
    render();
}

function filter(event) {
    //console.log("filter", event.target.id);

    mode = event.target.id
    filterList = []    // 필터된 아이템을 담을 변수

    // div 요소 배경색상 변경
   /* 
    tabs.forEach(tab => {
        tab.classList.remove("clicked");
    });
    event.target.classList.add("clicked");
*/

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



