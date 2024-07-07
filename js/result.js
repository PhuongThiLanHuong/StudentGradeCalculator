document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const studentName = urlParams.get('student');

    if (!studentName) {
        alert("Student name not found in URL parameters.");
        return;
    }

    document.getElementById('studentName').innerText = studentName;
    loadScores(studentName);
});

function loadScores(studentName) {
    const scoresData = localStorage.getItem(`scores_${studentName}`);
    if (!scoresData) {
        alert(`No scores found for ${studentName}.`);
        return;
    }

    const scores = JSON.parse(scoresData);

    let totalScore10 = 0;
    let totalScore4 = 0;

    const tbody = document.getElementById('scoresTableBody');
    tbody.innerHTML = '';

    scores.forEach(task => {
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
        `;
        tbody.appendChild(row);
    });

    document.getElementById('totalScore10').innerText = totalScore10.toFixed(1);
    document.getElementById('totalScore4').innerText = totalScore4.toFixed(1);

    const averageScore10 = scores.length > 0 ? totalScore10 / scores.length : 0;
    const averageScore4 = scores.length > 0 ? totalScore4 / scores.length : 0;

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
