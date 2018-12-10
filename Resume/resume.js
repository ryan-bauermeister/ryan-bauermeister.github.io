// To-do:  Add error handling

// ************************************************************************
// function to get resume json and build the resume
// ************************************************************************
function addResume() {

    // ********************************************************************************************
    // function to add resume data and format
    // - resumeData (this parameter should provide the resume data in json format for the section)
    // ********************************************************************************************
    function buildResume(resumeData) {
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

        // ************************************************************************************
        // function to add list of areas of expertise
        // - label (this parameter should provide the label for the areas of expertise section)
        // - expertise (this parameter should provide the array listing the expertise items)
        // ************************************************************************************
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

        // ************************************************************************************
        // function to add list of areas of expertise
        // - label (this parameter should provide the label for the areas of skills section)
        // - skill (this parameter should provide the array listing the skill items)
        // - target (this parameter should provide the target for the expertise items)
        // ************************************************************************************
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
        // ************************************************************************************
        // function to add the experience and job history section.
        // - job (this parameter should provide the job in the jobs array to work with)
        // - target (this parameter should provide the target for the experience section)
        // ************************************************************************************
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
    }

    // ************************************************************************************
    // function to pull JSON data and to add the sidebar and resume data.
    // ************************************************************************************
    (function () {
        $.getJSON({
            url: "resume.json"
        }).done(function (result) {
            buildResume(result.resumeData);
            addSidebar("sidebar", result.sideBarData);                      
            console.log("Sidebar and resume json successful imported.");
        }).fail(function (xhr, status, error) {
            console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        });
    }());
}

window.onload = function () {
    addResume();    
    addNavbar("navbar");  
}