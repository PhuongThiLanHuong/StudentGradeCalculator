window.onload = function() {
    let chemistry = localStorage.getItem('chemistry');
    let hindi = localStorage.getItem('hindi');
    let maths = localStorage.getItem('maths');
    let phy = localStorage.getItem('phy');
    let english = localStorage.getItem('english');
    let biology = localStorage.getItem('biology');
    let history = localStorage.getItem('history');
    let totalMarks = localStorage.getItem('totalMarks');
    let percentage = localStorage.getItem('percentage');

    document.getElementById('showdata').innerText = `Your percentage is ${percentage}%`;
    document.getElementById('showdetails').innerHTML = `
        <p>Chemistry: ${chemistry}</p>
        <p>Hindi: ${hindi}</p>
        <p>Maths: ${maths}</p>
        <p>Physics: ${phy}</p>
        <p>English: ${english}</p>
        <p>Biology: ${biology}</p>
        <p>History: ${history}</p>
        <p>Total Marks: ${totalMarks}</p>
    `;
}
