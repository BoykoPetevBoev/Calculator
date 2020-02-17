
function startTime() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = today.getMonth();
    let yyyy = today.getFullYear();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    dd = checkTime(dd);
    m = checkTime(m);
    s = checkTime(s);

    document.getElementById('date').innerHTML = `${dd} ${months[mm]} ${yyyy}`;
    document.getElementById('time').innerHTML = `${h}:${m}:${s}`;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    i = Number(i);
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}
