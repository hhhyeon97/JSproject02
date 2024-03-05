// 로컬 스토리지에서 할 일 목록을 가져오는 함수
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// 할 일 목록을 로컬 스토리지에 저장하는 함수
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 할 일을 추가하는 함수
function addTask(taskText) {
  const tasks = getTasks();
  const newTask = { text: taskText, completed: false };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
}

// 할 일을 삭제하는 함수
function removeTask(taskText) {
  const tasks = getTasks();
  const updatedTasks = tasks.filter((task) => task.text !== taskText);
  saveTasks(updatedTasks);
}

// 할 일 상태를 토글하는 함수
function toggleTaskStatus(taskText) {
  const tasks = getTasks();
  const updatedTasks = tasks.map((task) => {
    if (task.text === taskText) {
      task.completed = !task.completed;
    }
    return task;
  });
  saveTasks(updatedTasks);
}

// 화면에 할 일을 표시하는 함수
function displayTask(task) {
  const taskView = document.getElementById('taskView');
  const newTask = document.createElement('div');
  newTask.classList.add('task-item');
  newTask.innerHTML = `
      <span>${task.text}</span>
      <i class='bx bx-check'></i>
      <i class='bx bx-trash'></i>
    `;
  if (task.completed) {
    newTask.classList.add('completed');
  }
  taskView.appendChild(newTask);

  const checkIcon = newTask.querySelector('.bx-check');
  const trashIcon = newTask.querySelector('.bx-trash');

  // 체크 아이콘 클릭 이벤트 처리
  checkIcon.addEventListener('click', function () {
    toggleTaskStatus(task.text);
    newTask.classList.toggle('completed');
    filterTasks(); // 변경된 상태에 따라 탭 필터링 다시 적용
  });

  // 삭제 아이콘 클릭 이벤트 처리
  trashIcon.addEventListener('click', function () {
    if (confirm('정말로 삭제하시겠습니까?')) {
      removeTask(task.text);
      newTask.remove();
      filterTasks(); // 변경된 상태에 따라 탭 필터링 다시 적용
    }
  });
}

// 페이지 로드 시 할 일 목록을 화면에 표시하는 함수
window.addEventListener('load', function () {
  const tasks = getTasks();
  tasks.forEach((task) => displayTask(task));
});

// 할 일 추가 버튼 클릭 이벤트 처리
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {
  const userInput = document.getElementById('taskInput');
  const taskText = userInput.value.trim();
  if (taskText !== '') {
    const newTask = addTask(taskText);
    displayTask(newTask);
    userInput.value = '';
    filterTasks(); // 변경된 상태에 따라 탭 필터링 다시 적용
  }
});

// 엔터 키 입력 이벤트 처리
const userInput = document.getElementById('taskInput');
userInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addBtn.click();
  }
});

// 탭 필터링
function filterTasks() {
  const tabs = document.querySelectorAll('.tab');
  const activeTabId = document.querySelector('.tab.active').id;
  document.querySelectorAll('.task-item').forEach((taskItem) => {
    if (activeTabId === 'all') {
      taskItem.style.display = 'block';
    } else if (
      activeTabId === 'incomplete' &&
      !taskItem.classList.contains('completed')
    ) {
      taskItem.style.display = 'block';
    } else if (
      activeTabId === 'complete' &&
      taskItem.classList.contains('completed')
    ) {
      taskItem.style.display = 'block';
    } else {
      taskItem.style.display = 'none';
    }
  });
}

// 탭 클릭 이벤트 처리
const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => {
  tab.addEventListener('click', function () {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    filterTasks(); // 변경된 탭에 따라 필터링 적용
  });
});
