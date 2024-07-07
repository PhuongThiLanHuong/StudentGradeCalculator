function calculate() {
    let chemistry = parseFloat(document.getElementById('chemistry').value);
    let hindi = parseFloat(document.getElementById('hindi').value);
    let maths = parseFloat(document.getElementById('maths').value);
    let phy = parseFloat(document.getElementById('phy').value);
    let english = parseFloat(document.getElementById('english').value);
    let biology = parseFloat(document.getElementById('biology').value);
    let history = parseFloat(document.getElementById('history').value);

    if (
        isNaN(chemistry) || isNaN(hindi) || isNaN(maths) ||
        isNaN(phy) || isNaN(english) || isNaN(biology) ||
        isNaN(history)
    ) {
        alert("Please enter valid marks for all subjects.");
        return;
    }

    let totalMarks = chemistry + hindi + maths + phy + english + biology + history;
    let percentage = (totalMarks / 700) * 100;

    // Store details in localStorage
    localStorage.setItem('chemistry', chemistry);
    localStorage.setItem('hindi', hindi);
    localStorage.setItem('maths', maths);
    localStorage.setItem('phy', phy);
    localStorage.setItem('english', english);
    localStorage.setItem('biology', biology);
    localStorage.setItem('history', history);
    localStorage.setItem('totalMarks', totalMarks);
    localStorage.setItem('percentage', percentage.toFixed(2));

    window.location.href = 'result.html';
}
