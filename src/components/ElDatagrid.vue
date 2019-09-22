<template>
    <div class="el-datagrid" v-loading="loading">
        <div class="toolbar">
            <el-button v-for="(tool, index) in toolbar" :key="index"
                :size="tool.size || 'small'"
                :type="tool.type"
                :icon="tool.icon"
                @click="toolbarClick(selectRows, tool.prop)"
                :disabled="tool.usableAfterSelect && selectRows.length == 0"
            >
                {{ tool.label }}
            </el-button>
        </div>
        <el-table :data="showData" stripe border @selection-change="selectRowsChange" :defaultSort="defaultSort" @sort-change="sortChange">
            <!-- 多选框 -->
            <el-table-column v-if="checkbox" type="selection"></el-table-column>
            <!-- 序号 -->
            <el-table-column type="index" :index="index"></el-table-column>
            <template v-for="(item, index) in columns">
                <!-- 内容列 -->
                <el-table-column v-if="!item.actions" :key="index" :label="item.label" :prop="item.prop" :sortable="item.sortable && 'custom'" :sort-orders="['ascending', 'descending']" :formatter="item.formatter"/>
                <!-- 操作按钮列 -->
                <el-table-column v-else :key="index" :label="item.label">
                    <template slot-scope="scope">
                        <el-button v-for="(action, index) in item.actions" :key="index"
                            :size="action.size || 'small'"
                            :type="action.type"
                            :icon="action.icon"
                            @click="rowClick(scope.row, action.prop)"
                        >
                            {{ action.label }}
                        </el-button>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <div class="pagination-container">
            <!-- 分页工具 -->
            <el-pagination
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="pageSizes"
                :page-size="defaultPageSize"
                :current-page="currentPage"
                :total="total"
                @size-change="pageSizeChange"
                @current-change="currentPageChange"
            />
            <!-- 刷新图标 -->
            <i class="el-icon-refresh" @click="reload"></i>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        url: {
            type: String,
            default: ''
        },
        params: {
            type: Object,
            default() {
                return {};
            }
        },
        columns: {
            type: Array,
            default() {
                return [];
            }
        },
        checkbox: {
            type: Boolean,
            default: true
        },
        stripe: {
            type: Boolean,
            default: true
        },
        border: {
            type: Boolean,
            default: true
        },
        toolbar: {
            type: Array,
            default() {
                return [];
            }
        },
        pageSizes: {
            type: Array,
            default() {
                return [5, 10, 20, 50, 100];
            }
        },
        defaultPageSize: {
            type: Number,
            default: 10
        },
        defaultSort: {
            type: Object,
            default() {
                return {
                    prop: '',
                    order: ''
                };
            }
        },
        clientPagination: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            data: [],
            index: 1,
            selectRows: [],
            currentPage: 1,
            pageSize: this.defaultPageSize,
            total: 0,
            sort: {
                orderBy: this.defaultSort.prop,
                order: this.defaultSort.order
            },
            loading: false
        }
    },

    computed: {
        showData() {
            if (this.clientPagination) {
                // 若客户端分页，则根据页码和每页数量 截取相应的数据
                return this.data.slice().splice(this.index - 1, this.pageSize);
            } else {
                // 若服务端分页，则直接显示获取到的数据
                return this.data.slice();
            }
        }
    },

    methods: {
        loadData() {
            this.loading = true;
            axios.get(this.url, {
                params: Object.assign(this.params, this.sort, { pageSize: this.pageSize, pageNum: this.currentPage })
            }).then(res => res.data).then(res => {
                this.loading = false;
                if (res.status == 200) {
                    this.data = res.result.data;
                    this.total = res.result.total;
                }
            })
        },
        rowClick(row, prop) {
            this.$emit('rowClick', { row, prop });
        },
        selectRowsChange(rows) {
            this.selectRows = rows;
        },
        toolbarClick(rows, prop) {
            this.$emit('toolbarClick', { rows, prop });
        },
        pageSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.index = (this.currentPage - 1) * this.pageSize + 1;
        },
        currentPageChange(currentPage) {
            this.currentPage = currentPage;
            this.index = (this.currentPage - 1) * this.pageSize + 1;
        },
        sortChange({ column, prop, order }) {
            this.sort.orderBy = prop;
            this.sort.order = order;
            this.reload();
        },
        reload() {
            this.loadData();
        }
    },

    mounted() {
        this.loadData();
    },

    watch: {
        currentPage() {
            if (!this.clientPagination) {
                // 若服务端分页，则重新获取数据
                this.reload();
            }
        },
        pageSize() {
            if (!this.clientPagination) {
                // 若服务端分页，则重新获取数据
                this.reload();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .el-datagrid {
        padding: 5px;
        background-color: #FFF;
        border-radius: 5px;
    }
    .toolbar {
        margin-bottom: 5px;
    }
    .pagination-container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 5px;
    }
    .el-icon-refresh {
        font-size: 18px;
        margin-left: 10px;
        color: #303133;
        cursor: pointer;
        &:hover {
            color: #409EFF;
        }
    }
</style>