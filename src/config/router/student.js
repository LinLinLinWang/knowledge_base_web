import Layout from '../../components/views/Home.vue'

const studentRouter = {
    path: '/student',
    component: Layout,
    meta: {
        roles: ['2']
    },
    children: [
        {
            path: '/myclass',
            component: resolve => require(['../../components/views/student/MyClass.vue'], resolve),
            meta: {
                title: '我的班级',
                icon: '班级'
            }
        },
        {
            path: '/myinfo',
            component: resolve => require(['../../components/views/student/MyInfo.vue'], resolve),
            meta: {
                title: '我的考勤',
                icon: '考勤'
            }
        },
        {
            path: '/vacate',
            component: resolve => require(['../../components/views/student/MyVacate.vue'], resolve),
            meta: {
                title: '我的请假',
                icon: '请假'
            }
        }
    ]
};

export default studentRouter
