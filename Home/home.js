//*********************************************************************
//  JSON Data
//*********************************************************************

tableData = {
    "header": ["Pages/Link", "Discription", "Technologies Used"],
    "pages": [{
        "name": "Home",
        "discription": "Introduction",
        "skills": "HTML, CSS, JavaScript, jQuery",
        "level": "Basic",
        "url": "../Home/home.html"
    },
    {
        "name": "Resume",
        "discription": "My Resume",
        "skills": "HTML, CSS, Bootstrap, JavaScript, jQuery",
        "level": "Basic",
        "url": "../Resume/resume.html"
    },
    {
        "name": "External Data Pull",
        "discription": "Getting and Displaying Data",
        "skills": "HTML, CSS, Bootstrap, JavaScript, jQuery",
        "level": "Basic",
        "url": "../ComingSoon/comingSoon.html"
    },
    {
        "name": "Angular Graph",
        "discription": "Angular Graph",
        "skills": "HTML, CSS, Bootstrap, JavaScript, jQuery, Angular, D3",
        "level": "Basic",
        "url": "../ComingSoon/comingSoon.html"
    },
    {
        "name": "More Angular",
        "discription": "Angular",
        "skills": "HTML, CSS, Bootstrap, JavaScript, jQuery, Angular",
        "level": "Basic",
        "url": "../ComingSoon/comingSoon.html"
    },
    {
        "name": "More Angular part 2",
        "discription": "Angular",
        "skills": "HTML, CSS, Bootstrap, JavaScript, jQuery, Angular",
        "level": "Basic",
        "url": "../ComingSoon/comingSoon.html"
    },
    {
        "name": "React",
        "discription": "React",
        "skills": "HTML, CSS, Bootstrap, JavaScript, jQuery, React",
        "level": "Basic",
        "url": "../ComingSoon/comingSoon.html"
    },
    {
        "name": "More React",
        "discription": "More React",
        "skills": "HTML, CSS, Bootstrap, JavaScript, jQuery, React",
        "level": "Basic",
        "url": "../ComingSoon/comingSoon.html"
    }
    ]
}

// To-do:  Add error handling

//*********************************************************************
//  Add table content
//*********************************************************************
function addtable(target) {

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
        $('#tr' + i).append($('<td>', {  }));
        $('#tr' + i + ' td').append($('<a>', { href: tableData.pages[i].url, text: tableData.pages[i].name }));
        $('#tr' + i).append($('<td>', { text: tableData.pages[i].discription }));
        $('#tr' + i).append($('<td>', { text: tableData.pages[i].skills }));
    }
}

window.onload = function () {

    addSidebar("sidebar");

    addNavbar("navbar");

    addtable("table");
}

