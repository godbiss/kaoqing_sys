<template>
    <div>

        <div v-show="!show">
            <van-loading />
        </div>


        <div id="coursesTable"></div>

        
        <Bottom-Nav :idx="2"></Bottom-Nav>
    </div>
</template>

<script>
import Timetables from 'timetables';
import BottomNav from '../components/BottomNav';
export default {
    name : "CourseTable",
    data() {
        return {
        show:false,
        timetables: [
        ['','','','','','','','','','','',''],
        ['','','','','','','','','','','',''],
        ['','','','','','','','','','','',''],
        ['','','','','','','','','','','',''],
        ['','','','','','','','','','','',''],
        ],
        timetableType : [
        [{index: '1',name: '8:00'}, 1],
        [{index: '2',name: '9:50'}, 1],
        [{index: '3',name: '10:10'}, 1],
        [{index: '4',name: '12:00'}, 1],
        [{index: '5',name: '14:30'}, 1],
        [{index: '6',name: '15:30'}, 1],
        [{index: '7',name: '16:20'}, 1],
        [{index: '8',name: '18:10'}, 1],
        [{index: '9',name: '19:00'}, 1],
        [{index: '10',name: '20:00'}, 1],
        [{index: '11',name: '21:00'}, 1],
        [{index: '12',name: '22:00'}, 1]
        ],
        week :  ['周一', '周二', '周三', '周四', '周五'],
        highlightWeek : new Date().getDay(),
        styles : {
            Gheight: 50,
            leftHandWidth: 50,
            palette: ['#ff6633', '#eeeeee']
        },
        timetable:null,
        }
    },
    components:{
        BottomNav
    },
    created() {
        var now = new Date()
        let banjinum = this.$store.state.user.banjinum
        
        this.$axios.get("/api/kecheng/"+banjinum)
        .then(res => {
            var shangketimelist = res.data
            shangketimelist.forEach((element) => {
                element.shangketime = this.parseDateStr(element.shangketime)
            });
            
            shangketimelist.forEach(element => {
                if(this.isSameWeek(element.shangketime, now)){
                    if(element.shangketime.getDay() <= 5){
                        

                        var timetableday = ['','','','','','','','','','','','']

                        if(element.kechengname1 !== null){
                            timetableday[0] = element.kechengname1
                            timetableday[1] = element.kechengname1
                        
                        }
                        if(element.kechengname2 !== null){
                            timetableday[2] = element.kechengname2
                            timetableday[3] = element.kechengname2
                        
                        }
                        if(element.kechengname3 !== null){
                            timetableday[4] = element.kechengname3
                            timetableday[5] = element.kechengname3
                        
                        }
                        if(element.kechengname4 !== null){
                            timetableday[6] = element.kechengname4
                            timetableday[7] = element.kechengname4
                        
                        }
                        if(element.kechengname5 !== null){
                            timetableday[8] = element.kechengname5
                            timetableday[9] = element.kechengname5
                        
                        }


                        
                        this.timetables[element.shangketime.getDay() - 1] = timetableday
                    }
                    
                }
            });
        })
        .catch(err => {
            console.log(err)
        })

    },
    mounted() {
        console.log(this.timetables)
        
        //异步加载和渲染分开，需要等待异步加载完毕再渲染数据
        setTimeout(() => {
            if(this.timetables !== null){
                this.show = true
                // 实例化(初始化课表)
                this.timetable = new Timetables({
                    el: '#coursesTable',
                    timetables: this.timetables,
                    week: this.week,
                    timetableType: this.timetableType,
                    highlightWeek: this.highlightWeek,
                    gridOnClick: function (e) {
                        alert(e.name + '  ' + e.week +', 第' + e.index + '节课, 课长' + e.length +'节')
                        console.log(e)
                    },
                    styles: this.styles
                });
            }
            
        }, 2000);

        


        // //重新设置参数 渲染
        // this.timetable.setOption({
        //     timetables: this.timetables,
        //     week: ['一', '二', '三', '四', '五', '六', '日'],
        //     styles:{
        //     palette: ['#dedcda', '#ff4081']
        //     },
        //     timetableType:this.timetableType,
        //     gridOnClick: function (e) {
        //     console.log(e)
        //     }})
    },
    methods: {
        parseDateStr(str){
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
        },
        isSameWeek(old,now){
            var oneDayTime = 1000*60*60*24;
            var old_count =parseInt(old.getTime()/oneDayTime);
            var now_other =parseInt(now.getTime()/oneDayTime);
                return parseInt((old_count+4)/7) == parseInt((now_other+4)/7);
        },
    },
}


</script>

<style>
    .highlight-week{
        color: #409EFF;
    }
</style>