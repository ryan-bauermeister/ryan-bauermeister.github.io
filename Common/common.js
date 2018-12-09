//*********************************************************************
//  JSON Data
//*********************************************************************

// To-do:  After local testing is done JSON needs to be moved to its own file.
sideBarData = {
    "segment": [{
        "label": "Page Discription",
        "url": "",
        "icon": "fas fa-bars"
    },
    {
        "label": "Technologies",
        "url": "",
        "icon": "fas fa-cog"
    },
    {
        "label": "Github Files",
        "url": "",
        "icon": "fab fa-github"
    }],
    "discription": "This page is based on my resume and utilizes the technologies listed below.  All of the resume content is pulled from a JSON file.",
    "technologies": ["HTML", "JavaScript", "jQuery", "CSS", "Bootstrap"],
    "github": [{
        "label": "resume.js",
        "location": "https://www.google.com",
        "icon": "far fa-file"
    }, {
        "label": "resume.css",
        "location": "https://www.google.com",
        "icon": "far fa-file"
    },
    {
        "label": "resume.html",
        "location": "https://www.google.com",
        "icon": "far fa-file"
    },
    {
        "label": "resume.json",
        "location": "https://www.google.com",
        "icon": "far fa-file"
    },
    {
        "label": "common.css",
        "location": "https://www.google.com",
        "icon": "far fa-file"
    },
    {
        "label": "common.js",
        "location": "https://www.google.com",
        "icon": "far fa-file"
    }
    ]
}

menuData = {
    "title": "Ryan Bauermeister",
    "col": [{
        "label": "Home",
        "location": "../Home/home.html"
    },
    {
        "label": "Basic Site",
        "options": [{
            "label": "Resume",
            "location": "../Resume/resume.html"
        }, {
            "label": "Menu Option 2",
            "location": "../ComingSoon/comingSoon.html"
        }, {
            "label": "Menu Option 3",
            "location": "../ComingSoon/comingSoon.html"
        }]
    },
    {
        "label": "Angular Site",
        "options": [{
            "label": "Option 1 - for future development",
            "location": "../ComingSoon/comingSoon.html"
        }, {
            "label": "Option 2 - for future development",
            "location": "../ComingSoon/comingSoon.html"
        }, {
            "label": "Option 3 - for future development",
            "location": "../ComingSoon/comingSoon.html"
        }]
    },
    {
        "label": "React Site",
        "options": [{
            "label": "Option 1 - for future development",
            "location": "../ComingSoon/comingSoon.html"
        }, {
            "label": "Option 2 - for future development",
            "location": "../ComingSoon/comingSoon.html"
        }, {
            "label": "Option 3 - for future development",
            "location": "../ComingSoon/comingSoon.html"
        }]
    }
    ],
}


// To-do:  Add error handling


// ************************************************************************
// ************************************************************************
//    Navbar section
// ************************************************************************
// ************************************************************************

// ************************************************************************
// function to add the navbar
// - target (this parameter should provide the ID for the navbar section)
// ************************************************************************
function addNavbar(target) {

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

// ************************************************************************
// ************************************************************************
//    Sidebar section
// ************************************************************************
// ************************************************************************

// ************************************************************************
// function to add the sidebar
// - target (this parameter should provide the ID for the sidebar section)
// ************************************************************************
function addSidebar(target) {

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