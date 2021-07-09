<template>
    <div>
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
        timetables: [
        ['大学英语(Ⅳ)@10203','大学英语(Ⅳ)@10203','','','','','毛概@14208','毛概@14208','','','','选修'],
        ['','','信号与系统@11302','信号与系统@11302','模拟电子技术基础@16204','模拟电子技术基础@16204','','','','','',''],
        ['大学体育(Ⅳ)','大学体育(Ⅳ)','形势与政策(Ⅳ)@15208','形势与政策(Ⅳ)@15208','','','电路、信号与系统实验','电路、信号与系统实验','','','',''],
        ['','','','','电装实习@11301','电装实习@11301','','','','大学体育','大学体育',''],
        ['','','数据结构与算法分析','数据结构与算法分析','','','','','信号与系统','信号与系统','',''],
        ],
        timetableType : [
        [{index: '1',name: '8:00'}, 1],
        [{index: '2',name: '9:30'}, 1],
        [{index: '3',name: '10:30'}, 1],
        [{index: '4',name: '11:30'}, 1],
        [{index: '5',name: '12:30'}, 1],
        [{index: '6',name: '14:30'}, 1],
        [{index: '7',name: '15:30'}, 1],
        [{index: '8',name: '16:30'}, 1],
        [{index: '9',name: '17:30'}, 1],
        [{index: '10',name: '18:30'}, 1],
        [{index: '11',name: '19:30'}, 1],
        [{index: '12',name: '20:30'}, 1]
        ],
        week :  ['周一', '周二', '周三', '周四', '周五'],
        highlightWeek : new Date().getDay(),
        styles : {
            Gheight: 50,
            leftHandWidth: 50,
            palette: ['#ff6633', '#eeeeee']
        },
        timetable:null
        }
    },
    components:{
        BottomNav
    },
    mounted() {
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
}


</script>

<style scoped>
    .highlight-week{
        color: #409EFF;
        background-color: #000;
    }


</style>