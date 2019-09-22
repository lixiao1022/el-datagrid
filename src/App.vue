<template>
    <div id="app">
        <el-datagrid
            ref="datagridTest"
            :url="url"
            :params="params"
            :columns="columns"
            @rowClick="rowClick"
            :toolbar="toolbar"
            @toolbarClick="toolbarClick"
            :defaultSort="defaultSort"
            clientPagination
        />

        <el-button type="primary" @click="reloadDatagrid">在父组件中通过 refs 属性访问子组件，刷新 datagrid</el-button>
    </div>
</template>

<script>
import elDatagrid from './components/ElDatagrid';

export default {
    components: {
        elDatagrid
    },

    data() {
        return {
            url: '/api/list',
            params: {
                name: ''
            },
            columns: [
                {
                    label: '姓名',
                    prop: 'name',
                    sortable: true
                }, {
                    label: '邮箱',
                    prop: 'email',
                    sortable: true
                }, {
                    label: '操作',
                    actions: [
                        {
                            label: '修改',
                            prop: 'edit',
                            type: 'warning',
                            icon: 'el-icon-edit'
                        }, {
                            label: '删除',
                            prop: 'delete',
                            type: 'danger',
                            icon: 'el-icon-delete'
                        }
                    ]
                }
            ],
            toolbar: [
                {
                    label: '新增',
                    prop: 'add',
                    type: 'primary',
                    icon: 'el-icon-plus',
                }, {
                    label: '删除多行',
                    prop: 'delete',
                    type: 'danger',
                    icon: 'el-icon-delete',
                    usableAfterSelect: true
                }
            ],
            defaultSort: {
                prop: 'name',
                order: 'descending'
            }
        }
    },

    methods: {
        rowClick(data) {
            const { row, prop } = data;
            console.log(row);
            switch (prop) {
                case 'edit':
                    console.log('edit');
                    break;
                case 'delete':
                    console.log('delete');
                    break;
                default:
                    break;
            }
        },
        toolbarClick(data) {
            const { rows, prop } = data;
            console.log(rows); 
            switch (prop) {
                case 'add':
                    console.log('add');
                    break;
                case 'delete':
                    console.log('delete');
                    break;
                default:
                    break;
            }
        },
        reloadDatagrid() {
            this.$refs['datagridTest'].reload();
        }
    }
}
</script>

<style lang="scss" scoped>

</style>