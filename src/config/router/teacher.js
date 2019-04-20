import Layout from '../../components/views/Home.vue'

const teacherRouter = {
    path: '/teacher',
    component: Layout,
    meta: {
        roles: ['1']
    },
    children: [
        {
            path: '/createClass',
            component: resolve => require(['../../components/views/teacher/CreateClass.vue'], resolve),
            meta: {
                title: '班级维护',
                icon: '班级'
            }
        },
        {
            path: '/showCreatedClass',
            component: resolve => require(['../../components/views/teacher/ShowCreatedClass.vue'], resolve),
            meta: {
                title: '课程维护',
                icon: '课程'
            }
        },

        {
            path: '/rollCall',
            component: resolve => require(['../../components/views/Dashboard.vue'], resolve),
            meta: {
                title: '考勤管理',
                icon: '考勤'
            }
        }, {
            path: '/studentManagement',
            component: resolve => require(['../../components/views/teacher/ShowCreateClassForManageMentStudent.vue'], resolve),
            meta: {
                title: '人员管理',
                icon: '班级'
            }
        },

        {
            path: '/vacateManagement',
            component: resolve => require(['../../components/views/Dashboard.vue'], resolve),
            meta: {
                title: '请假管理',
                icon: '课程'
            }
        },
        {
            path: '/showCourseByCid',
            name: 'showCourse',
            hidden: true,

            component: resolve => require(['../../components/views/teacher/ShowCreateCourse.vue'], resolve),
            meta: {
                title: '按班级管理课程',

            }
        },
        {
            path: '/showStudentById',
            name: 'showStudentById',
            hidden: true,

            component: resolve => require(['../../components/views/teacher/StudentManage.vue'], resolve),
            meta: {
                title: '按班级管理课程',

            }
        },
    ]
};

export default teacherRouter
