
function formatDateTime(date, union, format='Y') {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = '' + d.getHours(),
        min = '' + d.getMinutes();
   
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (hour.length < 2) 
        hour = '0' + hour;
  if (min.length < 2) 
        min = '0' + min;
    if ( format === 'D' ) {
        return [day, month, year].join('-') + union + [hour, min].join(':');
    }
    if ( format === 'M' ) {
        return [month, day, year].join('-') + union + [hour, min].join(':');
    }
    return [year, month, day].join('-') + union + [hour, min].join(':');
}


/*
var MONTH_NAMES = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
var DAY_NAMES = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
*/
const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

function _isInteger(val) {
    var digits = "1234567890";
    for (var i = 0; i < val.length; i++) {
        if (digits.indexOf(val.charAt(i)) === -1) { return false; }
    }
    return true;
}

function _getInt(str, i, minlength, maxlength) {
    for (var x = maxlength; x >= minlength; x--) {
        var token = str.substring(i, i + x);
        if (token.length < minlength) { return null; }
        if (_isInteger(token)) { return token; }
    }
    return null;
}

function getDateFromFormat(val, format) {
    val = val + "";
    format = format + "";
    var i_val = 0;
    var i_format = 0;
    var c = "";
    var token = "";
    var x, y;
    var now = new Date();
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = 1;
    var hh = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();
    var ampm = "";
        while (i_format < format.length) {
        // Get next token from format string
        c = format.charAt(i_format);
        token = "";
        while ((format.charAt(i_format) === c) && (i_format < format.length)) {
            token += format.charAt(i_format++);
        }
        // Extract contents of value based on format token
        if (token === "yyyy" || token === "yy" || token === "y") {
            if (token === "yyyy") { x = 4; y = 4; }
            if (token === "yy") { x = 2; y = 2; }
            if (token === "y") { x = 2; y = 4; }
            year = _getInt(val, i_val, x, y);
            if (year === null) { return 0; }
            i_val += year.length;
            if (year.length === 2) {
                if (year > 70) { year = 1900 + (year - 0); }
                else { year = 2000 + (year - 0); }
            }
            console.log(year)

        }
        else if (token === "MMM" || token === "NNN") {
            month = 0;
            for (var i = 0; i < MONTH_NAMES.length; i++) {
                var month_name = MONTH_NAMES[i];
                if (val.substring(i_val, i_val + month_name.length).toLowerCase() === month_name.toLowerCase()) {
                    if (token === "MMM" || (token === "NNN" && i > 11)) {
                        month = i + 1;
                        if (month > 12) { month -= 12; }
                        i_val += month_name.length;
                        break;
                    }
                }
            }
            if ((month < 1) || (month > 12)) { return 0; }
        }
        else if (token === "EE" || token === "E") {
            for (var j = 0; j < DAY_NAMES.length; j++) {
                var day_name = DAY_NAMES[j];
                if (val.substring(i_val, i_val + day_name.length).toLowerCase() === day_name.toLowerCase()) {
                    i_val += day_name.length;
                    break;
                }
            }
        }
        else if (token === "MM" || token === "M") {
            month = _getInt(val, i_val, token.length, 2);
            if (month === null || (month < 1) || (month > 12)) { 
                console.log('error 1 ')
                return 0; }
            i_val += month.length;
            console.log(month)
        }
        else if (token === "dd" || token === "d") {
            date = _getInt(val, i_val, token.length, 2);
            if (date === null || (date < 1) || (date > 31)) { 
                console.log('error 2 ')
                return 0; }
            i_val += date.length;
            console.log(date)
        }
        else if (token === "hh" || token === "h") {
            hh = _getInt(val, i_val, token.length, 2);
            if (hh === null || (hh < 1) || (hh > 12)) { 
                console.log('error 3 ')
                return 0; }
            i_val += hh.length;
        }
        else if (token === "HH" || token === "H") {
            hh = _getInt(val, i_val, token.length, 2);
            if (hh === null || (hh < 0) || (hh > 23)) { 
                console.log('error 4 ')
                return 0; }
            i_val += hh.length;
        }
        else if (token === "KK" || token === "K") {
            hh = _getInt(val, i_val, token.length, 2);
            if (hh === null || (hh < 0) || (hh > 11)) { 
                console.log('error 5 ')
                return 0; }
            i_val += hh.length;
        }
        else if (token === "kk" || token === "k") {
            hh = _getInt(val, i_val, token.length, 2);
            if (hh === null || (hh < 1) || (hh > 24)) { 
                console.log('error 6 ')
                return 0; }
            i_val += hh.length; hh--;
        }
        else if (token === "mm" || token === "m") {
            mm = _getInt(val, i_val, token.length, 2);
            if (mm === null || (mm < 0) || (mm > 59)) { 
                console.log('error 7 ')
                return 0; }
            i_val += mm.length;
        }
        else if (token === "ss" || token === "s") {
            ss = _getInt(val, i_val, token.length, 2);
            if (ss === null || (ss < 0) || (ss > 59)) { 
                console.log('error 8 ')
                return 0; }
            i_val += ss.length;
        }
        else if (token === "a") {
            if (val.substring(i_val, i_val + 2).toLowerCase() === "am") { ampm = "AM"; }
            else if (val.substring(i_val, i_val + 2).toLowerCase() === "pm") { ampm = "PM"; }
            else { 
                console.log('error 9 ')
                return 0; }
            i_val += 2;
        }
        else {
            if (val.substring(i_val, i_val + token.length) !== token) { 
                console.log('error 10 ')
                return 0; }
            else { i_val += token.length; }
        }
    }
    // If there are any trailing characters left in the value, it doesn't match
    if (i_val !== val.length) { return 0; }
    // Is date valid for month?
    if (month === 2) {
        // Check for leap year
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) { // leap year
            if (date > 29) { return 0; }
        }
        else { if (date > 28) { return 0; } }
    }
    if ((month === 4) || (month === 6) || (month === 9) || (month === 11)) {
        if (date > 30) { return 0; }
    }
    // Correct hours value
    if (hh < 12 && ampm === "PM") { hh = hh - 0 + 12; }
    else if (hh > 11 && ampm === "AM") { hh -= 12; }
    var newdate = new Date(year, month - 1, date, hh, mm, ss);

    return newdate.getTime();
}

export { formatDateTime, getDateFromFormat };