//*********************************************************************
//  JSON Data
//*********************************************************************

resumeData = {
    "fName": "Ryan",
    "lName": "Bauermeister",
    "address": "Apex, NC ******",
    "phone": "919.500.****",
    "linkedin": "www.linkedin.com/in/rbauermeister",
    "email": "ryan.*.*********@gmail.com",
    "introHeader1": "JAVASCRIPT DEVELOPMENT SPECIALIST",
    "introHeader2": "ANALYTICAL | SOLUTIONS-ORIENTED | CUSTOMER-FOCUSED",
    "intro1": "IT professional with notable success developing comprehensive and innovative solutions that support business objectives and resolve critical organization needs in IT, manufacturing and government.  Optimize resources in a timely and cost-effective manner.",
    "intro2": "Adaptable to fast-paced, ever-changing priorities and work environments. Clearly communicate complex concepts to technical and non-technical audiences.",
    "expertiseLabel": "Areas of expertise:",
    "expertise": ["Planning / Requirements Determination", "Implementation", "Software Analysis", "Software Testing", "Software Development", "Software / Database Integration", "Object-Oriented Design", "Application Security"],
    "skillsHeader": "TECHNICAL SKILLS",
    "osLabel": "Operating Systems",
    "os": ["Windows", "Linux"],
    "LanguagesLabel": "Programming Languages",
    "Languages": ["JavaScript", "HTML5", "CSS3", "jQuery", "Bootstrap", "Lodash", "PowerShell", "SQL", "LoopBack", "Angular", "JSON-Transforms", "C#", "Knockout"],
    "dbLabel": "Data Technologies",
    "db": ["JSON", "XML", "MySQL", "DB2", "Oracle"],
    "toolsLabel": "Tools",
    "tools": ["MS Visual Studio", "MS Visual Code", "SharePoint 2013", "AWS"],
    "methodLabel": "Development Methodologies",
    "method": ["Agile (Scrum)", "Waterfall"],
    "jobs": [{
        "experienceHeader": "PROFESSIONAL EXPERIENCE",
        "corp": "OCTO CONSULTING GROUP",
        "dates": "2016 to July 2018",
        "title": "Consultant",
        "location": "Reston, VA",
        "about": "JavaScript Development Specialist with experience in design and development of sites and code fragments.  Working as a member of an award winning Agile Scrum team supporting an application developed for the government.  As a member of this Agile team I designed, developed, tested, and provided maintenance for a wide range of JavaScript and custom UI fragments.",
        "examples": ["Volunteered to create a graphing code fragment utilizing D3.js to provide pie and line graphs in addition to my scheduled project work.",
            "Frequently made use of JavaScript to execute CRUD operations on SharePoint and MySQL data to support the needs of the application.",
            "Created an image carousal code fragment to display a verity of text and images, this also included the logic to display the information in multiple formats and connecting to the SharePoint data.",
            "Participated in the creation of an advanced search tool that included multiple data sources, filtering options, and the ability to save searches.",
            "Created a reusable code fragment to provide the means to select users. This includes automatically filtering users and allowing for multiple selections to be added or removed also including the option to update ACL.",
            "Utilized CSS and Bootstrap to enhance one of the main application pages to have a similar look and feel as the rest of the site.",
            "Utilized server side JavaScript to provide formatting, filtering, and validation through loopback.",
            "Regularly volunteered to pickup additional projects to assist in balancing the workload of the team.",
            "Enhanced multiple code fragments to have the ability to support data analytics.",
            "Volunteered to expand the scope of the Announcements Connectivity project and added additional REST API endpoints with the associated JavaScript logic to provide a more versatile solution for the client.",
            "Frequently picked up new programming languages or tool in days needed to support a project."
        ]
    },
    {
        "experienceHeader": "ADDITIONAL RELEVANT EXPERIENCE",
        "corp": "IBM RESILIENCY SERVICES",
        "dates": "1999 to 2015",
        "title": "Senior IT Specialist",
        "location": "Research Triangle Park, NC",
        "about": "Oversaw full application development life cycle including requirements, design, development, testing, and maintenance of wide range of Lotus Notes applications.  Developed business process, change management, operations, and sales support applications.",
        "examples": ["Drove development effort and implemented survey application that supported any language, providing customizable layout to over 70 countries, complex security needs, ties into web interface, and serving as key tool needed to improve services offered to customers and assist in identifying new opportunities.",
            "Selected as lead developer for defining and implementing organizational change management process, creating and maintaining request tracking applications that coordinated and managed organizational IT development process and fulfilled critical need for complex business processes, prioritization, tracking, workflow, and audit compliance.",
            "Integrated Notes applications with DB2, MS Excel spreadsheets, keeping data current across multiple platforms and allowing flexibility in manipulation large sets of data.",
            "Recognized and received award for taking initiative and creating solution that supported requirements determination and approval process for high-value projects.",
            "Designed innovative recovery instructions application to simulate SAP GUI, minimizing training needed for end users while meeting aggressive schedule / critical goals and implementing without issue.",
            "Created and maintained multiple sales support applications for pricing, call tracking, customer information, and opportunity identification, serving as key components to sales organization, facilitating customer interaction, and providing accurate and timely pricing in winning new business.",
        ]
    }
    ],
    "educationHeader": "EDUCATION",
    "degree": "Bachelor of Science (BS)",
    "major": "Management Information Systems",
    "university": "Indiana State University",
    "universityLocation": "Terre Haute, IN "
}

// To-do:  Add error handling

function addResume() {
    //function buildResume() {
        //*********************************************************************
        //  Add Resume Header section
        //*********************************************************************

        $('.name').append($('<p>', { text: resumeData.fName + ' ' + resumeData.lName }));
        $('.address').append($('<p>', { text: resumeData.address }));
        $('.phone').append($('<p>', { text: resumeData.phone }));
        $('.linkedin').append($('<a>', { href: resumeData.linkedin, text: resumeData.linkedin }));
        $('.email').append($('<a>', { href: resumeData.email, text: resumeData.email }));

        //*********************************************************************
        //  Add About section
        //*********************************************************************

        // About section header
        $('#aboutHeader1').append(resumeData.introHeader1);
        $('#aboutHeader2').append(resumeData.introHeader2);

        // About section discription
        $('#about').append($('<p>', { text: resumeData.intro1 }));
        $('#about').append($('<p>', { text: resumeData.intro2 }));

        // List of areas of expertise
        function addExpertise(label, expertise) {
            $('#expertiseHeader').append($('<p>', { text: label }));
            var target;
            $.each(expertise, function (i, val) {
                if (i < (expertise.length / 2)) {
                    target = "expertiseCol1";
                } else {
                    target = "expertiseCol2";
                }
                $('#' + target).append($('<p>', { text: ' - ' + val }));
            });
        }

        addExpertise(resumeData.expertiseLabel, resumeData.expertise, "skills");

        //*********************************************************************
        //  Add Skills section
        //*********************************************************************

        // Skill section header
        $('#skillsHeader').append($('<p>', { text: resumeData.skillsHeader }));

        // List of skills
        function addSkills(label, skill, target) {
            $('#' + target + "Col1").append(label);
            $.each(skill, function (i, val) {
                $('#' + target + "Col2").append(val);
                if (i < skill.length - 1) {
                    $('#' + target + "Col2").append(", ");
                }
            });
        }

        addSkills(resumeData.osLabel, resumeData.os, "os");
        addSkills(resumeData.LanguagesLabel, resumeData.Languages, "languages");
        addSkills(resumeData.dbLabel, resumeData.db, "db");
        addSkills(resumeData.toolsLabel, resumeData.tools, "tools");
        addSkills(resumeData.methodLabel, resumeData.method, "methods");

        //*********************************************************************
        //  Add Experience sections
        //*********************************************************************
        function addExperience(job, target) {
            // experience header
            $('#' + target).append($('<p>', { class: "sHeader", text: job.experienceHeader }));

            // 1st experience line  ( Company and Date )
            $('#' + target).append($('<div>', { class: "row subHeader label" }));
            $('#' + target + ' .row').append($('<div>', { class: "col-sm", text: job.corp }));
            $('#' + target + ' .row').append($('<div>', { class: "col-sm text-right", text: job.dates }));

            // 2st experience line  ( Title and Location)
            $('#' + target).append($('<p>', { class: "subHeader" }));
            $('#' + target + ' p.subHeader').append($('<span>', { class: "label", text: job.title }));
            $('#' + target + ' p.subHeader').append(", " + job.location);

            // Experience discription
            $('#' + target).append($('<div>', { class: "expAbout", text: job.about }));

            // Experience list
            $('#' + target).append('<ul></ul>');
            $.each(job.examples, function (i, val) {
                $('#' + target + ' ul').append($('<li>', { class: "example", text: val }));
            });
        }

        addExperience(resumeData.jobs[0], "experience1");
        addExperience(resumeData.jobs[1], "experience2");

        //*********************************************************************
        //  Add Education section
        //*********************************************************************
        $('#education').append($('<p>', { class: "sHeader", text: resumeData.educationHeader }));
        $('#education').append($('<span>', { class: "label", text: resumeData.degree + ', ' }));
        $('#education').append($('<span>', { class: "label", text: resumeData.major + ', ' }));
        $('#education').append($('<span>', { class: "label", text: resumeData.university + ', ' }));
        $('#education').append($('<span>', { text: resumeData.universityLocation }));


        (function () {
            $.getJSON("resume.json", function (json) {
                console.log("JSON Data: " + json);
            });
        }());
    //}
/*
    (function () {
            $.ajax({

                // The 'type' property sets the HTTP method.
                // A value of 'PUT' or 'DELETE' will trigger a preflight request.
                type: 'GET',
              
                // The URL to make the request to.
                //url: '../Resume/resume.json',
                url: 'https://github.com/ryan-bauermeister/ryan-bauermeister.github.io/blob/master/resume.json',
              
                // The 'contentType' property sets the 'Content-Type' header.
                // The JQuery default for this property is
                // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
                // a preflight. If you set this value to anything other than
                // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
                // you will trigger a preflight request.
                contentType: 'text/plain',
              
                xhrFields: {
                  // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                  // This can be used to set the 'withCredentials' property.
                  // Set the value to 'true' if you'd like to pass cookies to the server.
                  // If this is enabled, your server must respond with the header
                  // 'Access-Control-Allow-Credentials: true'.
                  withCredentials: false
                },
              
                headers: {
                  // Set any custom headers here.
                  // If you set any non-simple headers, your server must include these
                  // headers in the 'Access-Control-Allow-Headers' response header.
                },
              
                dataType: 'json',
                success: function (status, xhr) {
                    console.log('Resume data loaded - status: ' + status );
                },
                error: function (xhr, status, error) {
                    console.log('Error resume data failed to load - status: ' + status);
                }
              });
    })();


    (function () {
        // $.getJSON("../Resume/resume.json", function (json) {
        $.getJSON("https://github.com/ryan-bauermeister/ryan-bauermeister.github.io/blob/master/resume.json", function (json) {
            console.log("JSON Data: " + json);
        });
    }());


    (function () {
        $.ajaxSetup({
            beforeSend: function (xhr) {
                if (xhr.overrideMimeType) {
                    xhr.overrideMimeType("application/json");
                }
            }
        });

        $.getJSON('https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?', function (data) {
            console.log("JSON Data: " + data);
        });
    })();

     
    (function () {
        var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickerAPI, {
            tags: "mount rainier",
            tagmode: "any",
            format: "json"
        })
            .done(function (data) {
                console.log("JSON Data: " + data);
                
                $.each(data.items, function (i, item) {
                    $("<img>").attr("src", item.media.m).appendTo("#images");
                    if (i === 3) {
                        return false;
                    }
                });
                
            });
    })();


    $.ajaxSetup({
        beforeSend: function (xhr) {
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("application/json");
            }
        }
    });

    

   
        var module = (function () {
            var jqxhr = $.ajax({
                type: 'GET',
                url: 'https://github.com/ryan-bauermeister/Portfolio/blob/master/Resume/resume.json',
                //data: resumeData,
                dataType: 'json',
                success: function (data, status, xhr) {
                    console.log('Resume data loaded - status: ' + data.d.Status + '\n' + data.d.Message);
                },
                error: function (xhr, status, error) {
                    console.log('Error resume data failed to load - status: ' + status);
                }
            });
    
        }());
    */
}

window.onload = function () {
    addResume();

    addSidebar("sidebar");

        addNavbar("navbar");


}