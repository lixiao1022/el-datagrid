# API 文档

## 属性

属性名 | 说明 | 类型 | 默认值
---|---|---|---
url | 远程数据请求地址 | String |  
params | 请求的额外参数（一般是除分页的相关参数外） | Object |  | 
checkbox | 是否显示多选框 | Boolean | true
stripe | 是否显示斑马效果 | Boolean | true
border | 是否显示纵向边框 | Boolean | true
columns | 列配置，具体见列属性 | Array | 
toolbar | 工具栏，具体见操作按钮属性 | Array |  | 
pageSizes | 可选的分页 | Array | [5, 10, 20, 50]
defaultPageSize | 初始的分页大小 | Number | 10
defaultSort | 初始排序，具体见排序属性 | Object | 
clientPagination | 是否在客户端分页（默认服务端分页） | Boolean | false

## 事件

事件名 | 说明 | 参数
---|---|---
rowClick | 点击每一行触发，`row` 代表这一行的数据，`prop` 代表按钮的 prop 值 | { row, prop }
toolbarClick  | 点击工具栏触发， `rows` 代表所有选中的行，`prop` 代表按钮的 prop 值 | { rows, prop }

## 方法

方法名 | 说明 | 参数
---|---|---
reload | 重新获取数据，通常在父组件中使用 `ref` 属性获取到这个实例。例如，再调用实例的这个方法 `this.$refs['xxx'].reload()` | 

### 列属性

属性名 | 说明 | 类型 | 默认值
---|---|---|---
label | 显示的内容 | String | 
prop | 数据的属性 | String | 
formmater | 格式化，与 `el-table` 中的用法相同，共4个参数 | Function(row, column, cellValue, index) | 
sortable | 是否可以排序 | Boolean | false
actions | 每行最后一列渲染的操作按钮，见操作按钮属性 | Array | 

### 排序属性

属性名 | 说明 | 类型 | 默认值
---|---|---|---
prop | 进行排序的列的数据属性 | String | 
order | `ascending` 顺序，`descending`逆序 | String | 



### 操作按钮属性

属性名 | 说明 | 类型 | 默认值
---|---|---|---
label | 显示的内容 | String | 
prop | 传递的值 | String | 
type | 按钮类型，与 `el-button` 用法类似 | String | 
icon | 按钮的图标类名 | String | 
usableAfterSelect | 是否需要选择一行之后可用，仅在工具栏配置的按钮中有效 | Boolean | false