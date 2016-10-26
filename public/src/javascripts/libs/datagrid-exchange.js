/**
 * Created by 杨浪 on 2016/10/26.
 */
module.exports = {
    /**
     * 向上移动一行
     *
     * @param datagrid
     * @param row
     */
    moveupRow: function (datagrid, row) {
        var index = datagrid.datagrid("getRowIndex", row);
        if (this.isFirstRow(datagrid, row)) {
            console.log("已经是第一条！");
            return;
        }
        datagrid.datagrid("deleteRow", index);
        datagrid.datagrid("insertRow", {
            index: index - 1, // 索引从0开始
            row: row
        });
        datagrid.datagrid("selectRow", index - 1);
    },
    /**
     * 向下移动一行
     *
     * @param datagrid
     * @param row
     */
    movedownRow: function (datagrid, row) {
        var index = datagrid.datagrid("getRowIndex", row);
        if (this.isLastRow(datagrid, row)) {
            console.log("已经是最后一条！");
            return;
        }
        datagrid.datagrid("deleteRow", index);
        datagrid.datagrid("insertRow", {
            index: index + 1, // 索引从0开始
            row: row
        });
        datagrid.datagrid("selectRow", index + 1);

    },
    /**
     * 是否是第一条数据
     *
     * @param datagrid
     * @param row
     * @returns {Boolean}
     */
    isFirstRow: function (datagrid, row) {
        var index = datagrid.datagrid("getRowIndex", row);
        if (index == 0) {
            return true;
        }
        return false;
    },
    /**
     * 是否是最后一条数据
     *
     * @param datagrid
     * @param row
     * @returns {Boolean}
     */
    isLastRow: function (datagrid, row) {
        var rowNum = datagrid.datagrid("getRows").length;
        var index = datagrid.datagrid("getRowIndex", row);
        if (index == (rowNum - 1)) {
            return true;
        }
        return false;
    }
};
