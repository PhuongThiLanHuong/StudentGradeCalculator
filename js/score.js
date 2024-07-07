document.getElementById('scoreForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const studentName = document.getElementById('studentName').value.trim();
    if (!studentName) {
        alert("Please enter the student's name.");
        return;
    }

    const tasks = [];
    let totalScore = 0;

    document.querySelectorAll('.task-row').forEach(row => {
        const task = row.querySelector('.task-name').value;
        const score = parseFloat(row.querySelector('.student-score').value);
        tasks.push({ task, score });
        totalScore += score;
    });

    document.getElementById('totalScore').innerText = totalScore;

    const tbody = document.getElementById('scoresTableBody');
    tbody.innerHTML = '';

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${task.task}</td><td>${task.score}</td>`;
        tbody.appendChild(row);
    });

    // Save scores in local storage under the student's name
    localStorage.setItem(`scores_${studentName}`, JSON.stringify(tasks));
    alert('Scores saved successfully!');
});

function addTask() {
    const taskContainer = document.getElementById('taskContainer');
    const taskRow = document.createElement('div');
    taskRow.className = 'task-row';
    taskRow.innerHTML = `
        <input type="text" class="task-name" placeholder="Task" required>
        <input type="number" class="student-score" placeholder="Score (0-10)" step="0.1" min="0" max="10" required>
    `;
    taskContainer.appendChild(taskRow);
}

function loadScores() {
    const studentName = document.getElementById('studentName').value.trim();
    if (!studentName) {
        alert("Please enter the student's name to load scores.");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem(`scores_${studentName}`)) || [];
    let totalScore = 0;

    const tbody = document.getElementById('scoresTableBody');
    tbody.innerHTML = '';

    tasks.forEach(task => {
        totalScore += task.score;
        const row = document.createElement('tr');
        row.innerHTML = `<td>${task.task}</td><td>${task.score}</td>`;
        tbody.appendChild(row);
    });

    document.getElementById('totalScore').innerText = totalScore;
}

document.getElementById('studentName').addEventListener('blur', loadScores);
let tasks = [];

function addTask() {
    const taskContainer = document.getElementById('taskContainer');
    const taskRow = document.createElement('div');
    taskRow.className = 'task-row';
    taskRow.innerHTML = `
        <input type="text" class="task-name" placeholder="Task" required>
        <input type="number" class="student-score" placeholder="Score (0-10)" step="0.1" min="0" max="10" required>
    `;
    taskContainer.appendChild(taskRow);
}

document.getElementById('scoreForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const studentName = document.getElementById('studentName').value.trim();
    if (!studentName) {
        alert("Please enter the student's name.");
        return;
    }

    tasks = []; // Clear tasks array before adding new ones

    let totalScore10 = 0;
    let totalScore4 = 0;

    document.querySelectorAll('.task-row').forEach(row => {
        const task = row.querySelector('.task-name').value.trim();
        const score = parseFloat(row.querySelector('.student-score').value);
        if (task && !isNaN(score)) {
            tasks.push({ task, score });
            totalScore10 += score;
            totalScore4 += convertTo4PointScale(score);
        }
    });

    const averageScore10 = tasks.length > 0 ? totalScore10 / tasks.length : 0;
    const averageScore4 = tasks.length > 0 ? totalScore4 / tasks.length : 0;

    document.getElementById('totalScore10').innerText = totalScore10.toFixed(1);
    document.getElementById('totalScore4').innerText = totalScore4.toFixed(1);

    document.getElementById('averageScore10').innerText = averageScore10.toFixed(1);
    document.getElementById('averageScore4').innerText = averageScore4.toFixed(1);

    const tbody = document.getElementById('scoresTableBody');
    tbody.innerHTML = ''; // Clear existing rows before adding new ones

    tasks.forEach(task => {
        const convertedScore = convertTo4PointScale(task.score);
        const grade = getLetterGrade(convertedScore);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.task}</td>
            <td>${task.score.toFixed(1)}</td>
            <td>${convertedScore.toFixed(1)}</td>
            <td>${grade}</td>
            <td>
                <button class="edit-btn" onclick="editTask(this)">Edit</button>
                <button class="save-btn" onclick="saveTask(this)" style="display: none;">Save</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    localStorage.setItem(`scores_${studentName}`, JSON.stringify(tasks));
    alert('Scores saved successfully!');
});

function editTask(button) {
    const row = button.closest('tr');
    const task = row.children[0].innerText;
    const score = row.children[1].innerText;

    row.children[0].innerHTML = `<input type="text" value="${task}" required>`;
    row.children[1].innerHTML = `<input type="number" value="${score}" step="0.1" min="0" max="10" required>`;
    row.querySelector('.edit-btn').style.display = 'none';
    row.querySelector('.save-btn').style.display = 'inline-block';
}

function saveTask(button) {
    const row = button.closest('tr');
    const task = row.children[0].querySelector('input').value;
    const score = parseFloat(row.children[1].querySelector('input').value);

    const index = Array.from(row.parentNode.children).indexOf(row);
    tasks[index] = { task, score };

    localStorage.setItem(`scores_${studentName}`, JSON.stringify(tasks));

    row.children[0].innerText = task;
    row.children[1].innerText = score.toFixed(1);
    const convertedScore = convertTo4PointScale(score);
    row.children[2].innerText = convertedScore.toFixed(1);
    row.children[3].innerText = getLetterGrade(convertedScore);

    row.querySelector('.edit-btn').style.display = 'inline-block';
    row.querySelector('.save-btn').style.display = 'none';

    let totalScore10 = tasks.reduce((sum, task) => sum + task.score, 0);
    let totalScore4 = tasks.reduce((sum, task) => sum + convertTo4PointScale(task.score), 0);

    document.getElementById('totalScore10').innerText = totalScore10.toFixed(1);
    document.getElementById('totalScore4').innerText = totalScore4.toFixed(1);

    const averageScore10 = tasks.length > 0 ? totalScore10 / tasks.length : 0;
    const averageScore4 = tasks.length > 0 ? totalScore4 / tasks.length : 0;

    document.getElementById('averageScore10').innerText = averageScore10.toFixed(1);
    document.getElementById('averageScore4').innerText = averageScore4.toFixed(1);
}

function convertTo4PointScale(score) {
    if (score >= 9.0) return 4.0;
    if (score >= 8.0) return 3.7;
    if (score >= 7.0) return 3.0;
    if (score >= 6.0) return 2.0;
    if (score >= 5.0) return 1.0;
    return 0.0;
}

function getLetterGrade(score) {
    if (score >= 4.0) return 'A';
    if (score >= 3.7) return 'A-';
    if (score >= 3.0) return 'B';
    if (score >= 2.0) return 'C';
    if (score >= 1.0) return 'D';
    return 'F';
}

function loadScores() {
    const studentName = document.getElementById('studentName').value.trim();
    if (!studentName) {
        alert("Please enter the student's name to load scores.");
        return;
    }

    tasks = JSON.parse(localStorage.getItem(`scores_${studentName}`)) || [];

    const tbody = document.getElementById('scoresTableBody');
    tbody.innerHTML = '';

    let totalScore10 = 0;
    let totalScore4 = 0;

    tasks.forEach(task => {
        totalScore10 += task.score;
        totalScore4 += convertTo4PointScale(task.score);
        const convertedScore = convertTo4PointScale(task.score);
        const grade = getLetterGrade(convertedScore);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.task}</td>
            <td>${task.score.toFixed(1)}</td>
            <td>${convertedScore.toFixed(1)}</td>
            <td>${grade}</td>
            <td>
                <button class="edit-btn" onclick="editTask(this)">Edit</button>
                <button class="save-btn" onclick="saveTask(this)" style="display: none;">Save</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('totalScore10').innerText = totalScore10.toFixed(1);
    document.getElementById('totalScore4').innerText = totalScore4.toFixed(1);

    const averageScore10 = tasks.length > 0 ? totalScore10 / tasks.length : 0;
    const averageScore4 = tasks.length > 0 ? totalScore4 / tasks.length : 0;

    document.getElementById('averageScore10').innerText = averageScore10.toFixed(1);
    document.getElementById('averageScore4').innerText = averageScore4.toFixed(1);
}

// Add event listener for the search button
document.getElementById('searchButton').addEventListener('click', function() {
    const studentName = document.getElementById('studentName').value.trim();
    if (!studentName) {
        alert("Please enter the student's name to load scores.");
        return;
    }
    loadScores();
});

// Load scores initially if there's a student name already present
if (document.getElementById('studentName').value.trim()) {
    loadScores();
}
