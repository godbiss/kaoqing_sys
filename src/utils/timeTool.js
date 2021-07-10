export function parseDateStr(str){
    var dateTemp = new Date();
    var dateArray = str.split(" ");

    var date1 = dateArray[0]
    var date2 = dateArray[1]

     var dateArray1 = date1.split("-")
     var dateArray2 = date2.split(":")

     // console.log(dateArray1)
     // console.log(dateArray2)
    dateTemp.setFullYear(dateArray1[0])
    dateTemp.setMonth(dateArray1[1] - 1)
    dateTemp.setDate(dateArray1[2])

    dateTemp.setHours(dateArray2[0])
    dateTemp.setMinutes(dateArray2[1])
    dateTemp.setSeconds(dateArray2[2])

    return dateTemp
 }
export function isSameWeek(old,now){
     var oneDayTime = 1000*60*60*24;
     var old_count =parseInt(old.getTime()/oneDayTime);
     var now_other =parseInt(now.getTime()/oneDayTime);
         return parseInt((old_count+4)/7) == parseInt((now_other+4)/7);
 }