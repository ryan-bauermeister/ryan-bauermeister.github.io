// To-do:  Add error handling

// ********************************************************************************************
// function to add home screen table content.
// - target (this parameter should provide the target for the experience section)
// - tableData (this parameter should provide data object for all the home screen table data)
// ********************************************************************************************
function addtable(target, tableData) {

    // Add table header
    $(target).append($('<thead>'));
    $(target + ' thead').append($('<tr>'));
    for (i = 0, l = tableData.header.length; i < l; i++) {
        $('thead tr').append($('<th>', { text: tableData.header[i] }));
    }

    // Add table contents
    $(target).append($('<tbody>'));
    for (i = 0, l = tableData.pages.length; i < l; i++) {
        $('tbody').append($('<tr>', { id: 'tr' + i }));
        $('#tr' + i).append($('<td>', {}));
        $('#tr' + i + ' td').append($('<a>', { href: tableData.pages[i].url, text: tableData.pages[i].name }));
        $('#tr' + i).append($('<td>', { text: tableData.pages[i].discription }));
        $('#tr' + i).append($('<td>', { text: tableData.pages[i].skills }));
        $('#tr' + i).append($('<td>', { text: tableData.pages[i].status }));
    }
}

// ************************************************************************************
// function to pull JSON data and to add the sidebar and home screen table data.
// ************************************************************************************
(function () {
    $.getJSON({
        url: "home.json"
    }).done(function (result) {
        console.log("Sidebar and home json successful imported.");
        try {
            addtable("table", result.tableData);
            addSidebar("sidebar", result.sideBarData);
            console.log("Home page loaded.");
        } catch (error) {
            console.log("Error in building sidebar or home page -- " + error);
        }
    }).fail(function (xhr, status, error) {
        console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
    });
}());

addNavbar("navbar");


