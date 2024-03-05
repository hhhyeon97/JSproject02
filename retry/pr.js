let userInput = document.getElementById('taskInput');
let addBtn = document.getElementById('addBtn');
//let taskList = []
let taskView = document.getElementById('taskView');
let tabs = document.querySelectorAll('.tab');

addBtn.addEventListener('click', addTask);

// 입력창에서 엔터 키 입력 이벤트 리스너 추가
userInput.addEventListener('keydown', function (event) {
  // 엔터 키가 눌렸을 때
  if (event.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  //console.log("클릭!")
  const inputValue = userInput.value;
  //console.log(inputValue)
  //taskList.push(inputValue); // 입력된 값을 taskList 배열에 추가
  //console.log("현재 할 일 목록:", taskList);

  // 새로운 <div> 요소를 생성하여 입력값을 추가
  const newTask = document.createElement('div');
  newTask.classList.add('task-item'); // 클래스 추가
  newTask.innerHTML = `
        <span>${inputValue}</span>
        <i class='bx bx-check'></i>
        <i class='bx bx-trash'></i>
    `;
  // 생성한 요소를 taskView에 추가
  taskView.appendChild(newTask);

  userInput.value = '';
  userInput.focus();

  // 체크 및 삭제 아이콘에 이벤트 리스너 추가
  const checkIcon = newTask.querySelector('.bx-check');
  const trashIcon = newTask.querySelector('.bx-trash');
  checkIcon.addEventListener('click', markComplete);
  trashIcon.addEventListener('click', confirmDelete);
}

function markComplete(event) {
  const taskItem = event.target.parentElement;
  taskItem.classList.toggle('completed');
  //console.log('completed!');
}

function confirmDelete(event) {
  const taskItem = event.target.parentElement;
  const confirmDelete = confirm('정말로 삭제하시나요?');
  if (confirmDelete) {
    taskItem.remove();
  }
}

// 탭 필터링
// 탭 이벤트 리스너 추가
tabs.forEach((tab) => {
  tab.addEventListener('click', function () {
    // 모든 할 일 항목을 초기화하여 숨김
    document.querySelectorAll('.task-item').forEach((item) => {
      item.style.display = 'none';
    });
    // 클릭된 탭에 따라 보여줄 할 일 항목을 선택하여 표시
    if (tab.id === 'all') {
      document.querySelectorAll('.task-item').forEach((item) => {
        item.style.display = 'block';
      });
    } else if (tab.id === 'incomplete') {
      document
        .querySelectorAll('.task-item:not(.completed)')
        .forEach((item) => {
          item.style.display = 'block';
        });
    } else if (tab.id === 'complete') {
      document.querySelectorAll('.task-item.completed').forEach((item) => {
        item.style.display = 'block';
      });
    }
    // 현재 활성화된 탭을 표시하기 위해 클래스를 조작
    document.querySelectorAll('.tab').forEach((tab) => {
      tab.classList.remove('active');
    });
    tab.classList.add('active');
  });
});
