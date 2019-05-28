<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" >
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" >
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" >
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'systemManagement',
                        title: '系统管理',
                        subs: [
                            {
                                index: 'rolePermissions',
                                title: '角色权限设置'
                            },
                            {
                                index: 'departmentManage',
                                title: '部门管理'
                            },
                            {
                                index: 'userManage',
                                title: '用户管理'
                            },
                            {
                                index: 'systemLog',
                                title: '系统日志'
                            },
                            {
                                index: 'userInforWriting',
                                title: '个人信息修改'
                            },
                            {
                                index: 'systemSetup',
                                title: '系统设置'
                            },
                            {
                                index: 'mranchManage',
                                title: '分公司管理'
                            },
                            {
                                index: 'largeAreaManage',
                                title: '大区管理'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'table',
                        title: '标准管理',
                        subs: [
                              {
                                index: 'videoManage',
                                title: '视频管理'
                            },  {
                                index: 'modelManage',
                                title: '型号管理'
                            },
                            {
                                index: 'judgeSettings',
                                title: '评判标准设置'
                            },
                            {
                                index: 'temperatureRange',
                                title: '温度范围管理'
                            },
                            {
                                index: 'parameterSetting',
                                title: '参数设置'
                            },
                            ]
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'tabs',
                        title: '设备管理',
                        subs: [
                            {
                                index: 'operationManage',
                                title: '运行管理'
                            },  {
                                index: 'manufacturingManage',
                                title: '制造管理'
                            },]
                    },
                    {
                        icon: 'el-icon-lx-calendar',
                        index: '3',
                        title: '代理商管理',
                        // subs: [
                        //     {
                        //         index: 'form',
                        //         title: '基本表单'
                        //     },
                        //     {
                        //         index: '3-2',
                        //         title: '三级菜单',
                        //         subs: [
                        //             {
                        //                 index: 'editor',
                        //                 title: '富文本编辑器'
                        //             },
                        //             {
                        //                 index: 'markdown',
                        //                 title: 'markdown编辑器'
                        //             },
                        //         ]
                        //     },
                        //     {
                        //         index: 'upload',
                        //         title: '文件上传'
                        //     }
                        // ]
                    },
                    {
                        icon: 'el-icon-lx-emoji',
                        index: 'icon',
                        title: '数据管理'
                    },
                    // {
                    //     icon: 'el-icon-pie-chart',
                    //     index: 'charts',
                    //     title: 'schart图表'
                    // },
                    // {
                    //     icon: 'el-icon-rank',
                    //     index: '6',
                    //     title: '拖拽组件',
                    //     subs: [
                    //         {
                    //             index: 'drag',
                    //             title: '拖拽列表',
                    //         },
                    //         {
                    //             index: 'dialog',
                    //             title: '拖拽弹框',
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-lx-global',
                    //     index: 'i18n',
                    //     title: '国际化功能'
                    // },
                    // {
                    //     icon: 'el-icon-lx-warn',
                    //     index: '7',
                    //     title: '错误处理',
                    //     subs: [
                    //         {
                    //             index: 'permission',
                    //             title: '权限测试'
                    //         },
                    //         {
                    //             index: '404',
                    //             title: '404页面'
                    //         }
                    //     ]
                    // }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 215px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
