// To-do:  Add error handling


// ************************************************************************
// ************************************************************************
//    Navbar section
// ************************************************************************
// ************************************************************************

// ************************************************************************
// function to add the navbar and get menuData
// - target (this parameter should provide the ID for the navbar section)
// ************************************************************************
function addNavbar(target) {

    // ********************************************************************************************
    // function to add resume data and format
    // - target (this parameter should provide the ID for the navbar section)
    // - menuData (this parameter should provide the JSON data for the navbar section)
    // ********************************************************************************************
    function buildNavbar(target, menuData) {

        //  Build navbar
        $('#' + target).append('<a class="navbar-brand" href="#">' + menuData.title + '</a>');
        $('#' + target).append('<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"></button>');
        $('#' + target + ' button').append('<span class="navbar-toggler-icon"></span>');
        $('#' + target).append('<div class="collapse navbar-collapse" id="navbarNavDropdown"></div>');
        $('#navbarNavDropdown').append('<ul class="navbar-nav" id="menuOptions"> </ul>');

        //  Add navbar columns and options
        for (i = 0, l = menuData.col.length; i < l; i++) {

            //  Check for dropdown options
            if (menuData.col[i].options) {
                //  Add navbar column header
                $('#menuOptions').append($('<li>', { class: "nav-item dropdown", id: "navCol" + i }));
                $('#navCol' + i).append('<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink' + i + '" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + menuData.col[i].label + '</a>');

                if (menuData.col[i].options) {
                    //  Add options inside of dropdown menu
                    $('#navCol' + i).append('<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink' + i + '" id="dropdownCol' + i + '"></div>');
                    for (x = 0, ll = menuData.col[i].options.length; x < ll; x++) {
                        $('#dropdownCol' + i).append($('<a>', { class: 'dropdown-item', href: menuData.col[i].options[x].location, text: menuData.col[i].options[x].label }));
                    }
                }
            } else {
                //  Add navbar column header
                $('#menuOptions').append($('<li>', { class: "nav-item", id: "navCol" + i }));
                $('#navCol' + i).append($('<a>', { class: "nav-link", href: menuData.col[i].location, text: menuData.col[i].label }));
            }
        }
    }
        // ************************************************************************************
        // function to pull JSON data and to add the navBar and menu data.
        // ************************************************************************************
        (function () {
            $.getJSON({
                url: "../Common/common.json"
            }).done(function (result) {
                buildNavbar(target, result.menuData);
                console.log("Menu json successful imported in.");
            }).fail(function (xhr, status, error) {
                console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            });
        }());
}

// ************************************************************************
// ************************************************************************
//    Sidebar section
// ************************************************************************
// ************************************************************************

// ************************************************************************
// function to add the sidebar
// - target (this parameter should provide the ID for the sidebar section)
// ************************************************************************
function addSidebar(target, sideBarData) {

    // ****************************************************************************
    // function to add a segment header to the sidebar
    // - s (this parameter should be an init value related to that segment array)
    // ****************************************************************************
    function addSegmentHeader(s) {
        // Add segment header text
        if (sideBarData.segment[s].url) {
            $('#' + target).append($('<a>', { class: "label no-underline hover-white", id: "sideSegment" + s, href: sideBarData.segment[s].url, text: sideBarData.segment[s].label }));
        } else {
            $('#' + target).append($('<p>', { class: "label", id: "sideSegment" + s, text: sideBarData.segment[s].label }));
        }

        // Add segment header icon
        if (sideBarData.segment[s].icon) {
            $("#sideSegment" + s).append($('<span>', { class: "icon segmentIcon " + sideBarData.segment[s].icon }));
        }
    }

    // *** Discription section of the sidebar ***
    addSegmentHeader(0);
    $('#' + target).append($('<p>', { text: sideBarData.discription }));
    $('#' + target).append($('<div>', { class: "sidebar-divider" }));


    // *** Technologies section of the sidebar ***
    addSegmentHeader(1);

    //  Add technologies list
    for (i = 0, l = sideBarData.technologies.length; i < l; i++) {
        $('#' + target).append($('<li>', { class: "tech", text: sideBarData.technologies[i] }));
    }
    $('#' + target).append($('<div>', { class: "sidebar-divider" }));


    // *** Github section of the sidebar  ***
    addSegmentHeader(2);

    //  Add Github file list
    for (i = 0, l = sideBarData.github.length; i < l; i++) {
        $('#' + target).append($('<li>', { id: target + i }));
        $('#' + target + i).append($('<a>', { href: sideBarData.github[i].location, text: sideBarData.github[i].label }));
        $('#' + target + i + ' a').append($('<span>', { class: "icon " + sideBarData.github[i].icon }));
    }
}