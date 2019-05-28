import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                //系统管理》角色权限管理
                {
                    path: '/rolePermissions',
                    component: resolve => require(['../components/page/systemManagement/rolePermissions.vue'], resolve),
                    meta: { title: '角色权限管理' }
                },
                //系统管理》部门管理
                {
                    path: '/departmentManage',
                    component: resolve => require(['../components/page/systemManagement/departmentManage.vue'], resolve),
                    meta: { title: '部门管理' }
                },
                //系统管理》用戶管理
                {
                    path: '/userManage',
                    component: resolve => require(['../components/page/systemManagement/userManage.vue'], resolve),
                    meta: { title: '用戶管理' }
                },
                //系统管理》系统日志
                {
                    path: '/systemLog',
                    component: resolve => require(['../components/page/systemManagement/systemLog.vue'], resolve),
                    meta: { title: '系统日志' }
                },
                //系统管理》个人信息修改
                {
                    path: '/userInforWriting',
                    component: resolve => require(['../components/page/systemManagement/userInforWriting.vue'], resolve),
                    meta: { title: '个人信息修改' }
                },
                //系统管理》系统设置
                {
                    path: '/systemSetup',
                    component: resolve => require(['../components/page/systemManagement/systemSetup.vue'], resolve),
                    meta: { title: '系统设置' }
                },
                //系统管理》分公司管理
                {
                    path: '/mranchManage',
                    component: resolve => require(['../components/page/systemManagement/mranchManage.vue'], resolve),
                    meta: { title: '分公司管理' }
                },
                //系统管理》大区管理
                {
                    path: '/largeAreaManage',
                    component: resolve => require(['../components/page/systemManagement/largeAreaManage.vue'], resolve),
                    meta: { title: '大区管理' }
                },
                //标准管理》型号管理
                {
                    path: '/modelManage',
                    component: resolve => require(['../components/page/standardManagement/modelManage.vue'], resolve),
                    meta: { title: '型号管理' }
                },
                //标准管理》评判标准设置
                {
                    path: '/judgeSettings',
                    component: resolve => require(['../components/page/standardManagement/judgeSettings.vue'], resolve),
                    meta: { title: '评判标准设置' }
                },
                //标准管理》参数设置
                {
                    path: '/parameterSetting',
                    component: resolve => require(['../components/page/standardManagement/parameterSetting.vue'], resolve),
                    meta: { title: '参数设置' }
                },
                //标准管理》温度范围管理
                {
                    path: '/temperatureRange',
                    component: resolve => require(['../components/page/standardManagement/temperatureRange.vue'], resolve),
                    meta: { title: '温度范围管理' }
                },
                //标准管理》视频管理
                {
                    path: '/videoManage',
                    component: resolve => require(['../components/page/standardManagement/videoManage.vue'], resolve),
                    meta: { title: '视频管理' }
                },
                //设备管理》运行管理
                {
                    path: '/operationManage',
                    component: resolve => require(['../components/page/equipmentManage/operationManage.vue'], resolve),
                    meta: { title: '运行管理' }
                },
                //设备管理》制造管理
                {
                    path: '/manufacturingManage',
                    component: resolve => require(['../components/page/equipmentManage/manufacturingManage.vue'], resolve),
                    meta: { title: '制造管理' }
                },

                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: resolve => require(['../components/page/I18n.vue'], resolve),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
