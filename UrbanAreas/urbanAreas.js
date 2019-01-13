var urbanAreaName;

//Provides formatting for currency values.
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

// ********************************************************************************************
// function to function to push out a list of urban areas to the UI.
// - data (this parameter should provide the function with a dataset containing urban areas names)
// ********************************************************************************************
function addUrbanAreasList(data) {
    var uaList = data._links["ua:items"];

    if (uaList.length > 0) {
        $('#urbanAreasOptions').append($('<select>', { id: "uaList", size: 20 }));

        //Creates a list of name of urban areas.
        for (i = 0, l = uaList.length; i < l; i++) {
            $('#uaList').append($('<option>', { text: uaList[i].name, value: i }));
        }

        //On change of urban area update all of the details with new urban area information.
        $('#urbanAreasOptions').change(function () {
            var ua = $('#urbanAreasOptions option:selected').val();
            var topic = "urban area details";
            var uaDetailsUrl = uaList[ua].href;
            getData(topic, uaDetailsUrl, urbanArea);
        })
    } else {
        console.log("Error - Urban Areas List not found");
    }
}

// ********************************************************************************************************
// function to build information content for a given urban area.
// - data (this parameter should provide the function with a dataset that contains this urban area's info.)
// ********************************************************************************************************
function urbanArea(data) {
    urbanAreaName = data.full_name;

    $('#urbanAreasDetails').empty();
    $('#urbanAreasDetails').append($('<p>', { text: data.full_name }));
    $('#urbanAreasDetails').append($('<p>', { text: data.teleport_city_url }));

    var topic = "urban area cities";
    var uaDetailsUrl = data._links["ua:cities"].href;
    getData(topic, uaDetailsUrl, urbanAreaCities);

    var topic = "urban area details";
    var uaDetailsUrl = data._links["ua:details"].href;
    getData(topic, uaDetailsUrl, urbanAreaDetails);

    var topic = "urban area images";
    var uaDetailsUrl = data._links["ua:images"].href;
    getData(topic, uaDetailsUrl, urbanAreaImages);

    var topic = "urban area salaries";
    var uaDetailsUrl = data._links["ua:salaries"].href;
    getData(topic, uaDetailsUrl, urbanAreaSalaries);

    var topic = "urban area scores";
    var uaDetailsUrl = data._links["ua:scores"].href;
    getData(topic, uaDetailsUrl, urbanAreaScores);

    // To Do: need to add condition here
    $("section.hidden").removeClass("hidden");
    $("#greeting").addClass("hidden");
}

// ********************************************************************************************************
// function to provides a list of cities in a given urban area.
// - data (this parameter should provide the function with a dataset that contains a list of cities).
// ********************************************************************************************************
function urbanAreaCities(data) {
    $('#urbanAreaCities').empty();
    $('#urbanAreaCities').append($('<h4>', { text: "Cities of the " + urbanAreaName + " urban area." }));

    var cityList = [];

    //Populate values to the cityList.
    for (i = 0, l = data._links["city:items"].length; i < l; i++) {
        cityList.push(data._links["city:items"][i].name);
    }
    $('#urbanAreaCities').append($('<p>', { text: cityList.join(", ") }));
}

// ********************************************************************************************
// function to provides a number of detail categoies in a given urban area.
// - data (this parameter should provide the function with a dataset that contains the details).
// ********************************************************************************************
function urbanAreaDetails(data) {
    console.log(data.categories);

    $('#urbanAreasDetails').empty();

    // ********************************************************************************************
    // function to create a table row.
    // - tableID - Provides a unique table id for the current category.
    // - row - Is the number of the current row.
    // - rowLabel - is the text label for the row.
    // - rowValue - is a text value for the result for a given row.
    // ********************************************************************************************
    function detailRow(tableID, row, rowLabel, rowValue) {
            $('#' + tableID + ' tbody').append($('<tr>', { id: tableID + 'Row' + row }));
            $('#' + tableID + 'Row' + row).append($('<td>', { text: rowLabel }));
            $('#' + tableID + 'Row' + row).append($('<td>', { text: rowValue }));
    }

    // Loops through data categories and sets up table passing relevent data to detail Row function.
    for (i = 0, l = data.categories.length; i < l; i++) {
        var tableID = data.categories[i].id;

        // Setup article for a given category
        $('#urbanAreasDetails').append($('<article>', { id: "urbanAreasDetails" + i, class: "rightContent" }));
        $('#urbanAreasDetails' + i).append($('<h4>', { text: data.categories[i].label }));

        // Setup table for a given category
        $('#urbanAreasDetails' + i).append($('<table>', { id: tableID, class: "table table-sm" }));
        $('#' + tableID).append($('<thead>'));
        $('#' + tableID + ' thead').append($('<tr>'));
        $('#' + tableID + ' thead tr').append($('<th>', { text: "Categories" }));
        $('#' + tableID + ' thead tr').append($('<th>', { text: "Value", class: "detailValue" }));
        $('#' + tableID).append($('<tbody>'));

        // Gathers data for table rows
        for (r = 0, l = data.categories[i].data.length; r < l; r++) {
            try {
                var rowLabel = data.categories[i].data[r].label;
                var valueType = data.categories[i].data[r].type;
                var formatedValue;

                //Determines which value to look for based on value type.
                switch (valueType) {
                    case 'float':
                        if (!isNaN(data.categories[i].data[r].float_value)) {
                            formatedValue = parseFloat(data.categories[i].data[r].float_value).toFixed(2);
                        } else {
                            formatedValue = "Data Error"
                        }
                        break;
                    case 'currency_dollar':
                        formatedValue = formatter.format(data.categories[i].data[r].currency_dollar_value);
                        break;
                    case 'percent':
                        formatedValue = (parseFloat(data.categories[i].data[r].percent_value).toFixed(2) * 100) + '%';
                        break;
                    case 'int':
                        formatedValue = data.categories[i].data[r].int_value;
                        break;
                    case 'string':
                        formatedValue = data.categories[i].data[r].string_value;
                        break;
                    default:
                        formatedValue = valueType;
                        break;
                }

                //Build the current row.
                detailRow(tableID, r, rowLabel, formatedValue, valueType);
            } catch (e) {
                console.log("Error in urban area details - " + e)
            }
        }
    }
}

// ********************************************************************************************
// function to find the image for a given urban area.
// - data - dataset containing the image. 
// ********************************************************************************************
function urbanAreaImages(data) {
    $('#urbanAreaImage').empty();
    $('#urbanAreaImage').append($('<img>', { src: data.photos[0].image.web, alt: "City Image" }));
}

// ********************************************************************************************
// function to create salaries table.
// - data - contains dataset with all off the salary information.
// ********************************************************************************************
function urbanAreaSalaries(data) {
    $('#urbanAreaSalaries').empty();
    $('#urbanAreaSalaries').append($('<h4>', { text: "Salaries" }));

    //Add table and table header.
    $('#urbanAreaSalaries').append($('<table>', { class: "table table-sm" }));
    $('#urbanAreaSalaries table').append($('<thead>'));
    $('#urbanAreaSalaries table thead').append($('<tr>'));
    $('#urbanAreaSalaries table thead tr').append($('<th>', { text: "Job Title" }));
    $('#urbanAreaSalaries table thead tr').append($('<th>', { text: "25 Percentile", class: "salary" }));
    $('#urbanAreaSalaries table thead tr').append($('<th>', { text: "50 Percentile", class: "salary" }));
    $('#urbanAreaSalaries table thead tr').append($('<th>', { text: "75 Percentile", class: "salary" }));
    $('#urbanAreaSalaries table').append($('<tbody>'));

    //Add detail rows.
    for (i = 0, l = data.salaries.length; i < l; i++) {
        $('#urbanAreaSalaries table tbody').append($('<tr>', { id: 'salaryRow' + i }));
        $('#salaryRow' + i).append($('<td>', { text: data.salaries[i].job.title }));
        $('#salaryRow' + i).append($('<td>', { text: formatter.format(data.salaries[i].salary_percentiles.percentile_25), class: "salary" }));
        $('#salaryRow' + i).append($('<td>', { text: formatter.format(data.salaries[i].salary_percentiles.percentile_50), class: "salary" }));
        $('#salaryRow' + i).append($('<td>', { text: formatter.format(data.salaries[i].salary_percentiles.percentile_75), class: "salary" }));
    }
}

// ********************************************************************************************
// function to build table with ratings information for a given urban area.
// - data - is a dataset containing all of the rates information.
// ********************************************************************************************
function urbanAreaScores(data) {
    $('#urbanAreaScores').empty();
    $('#urbanAreaScores').append($('<h4>', { text: "Scores" }));

    //Add table and table header.
    $('#urbanAreaScores').append($('<table>', { class: "table table-sm" }));
    $('#urbanAreaScores table').append($('<thead>'));
    $('#urbanAreaScores table thead').append($('<tr>'));
    $('#urbanAreaScores table thead tr').append($('<th>', { text: "Categories" }));
    $('#urbanAreaScores table thead tr').append($('<th>', { text: "Score from 1 to 10", class: "score" }));
    $('#urbanAreaScores table').append($('<tbody>'));

    //Add detail rows.
    for (i = 0, l = data.categories.length; i < l; i++) {
        $('#urbanAreaScores table tbody').append($('<tr>', { id: 'scoreRow' + i }));
        $('#scoreRow' + i).append($('<td>', { text: data.categories[i].name }));
        $('#scoreRow' + i).append($('<td>', { text: data.categories[i].score_out_of_10.toFixed(2), class: "score" }));
    }
}

// ********************************************************************************************
// function to retrieve data based on topic.
// - topic - description of information being retrieved.
// - url - is the url for the api with given information.
// - callback - provides the correct callback for a given topic.
// ********************************************************************************************
function getData(topic, url, callback) {
    $.getJSON({
        url: url
    }).done(function (results) {
        console.log("JSON " + topic + " successful imported.");
        try {
            callback(results);
            console.log("Retrieved " + topic + ".");
        } catch (error) {
            console.log("Error in retrieving " + topic + ".  Error:  " + error);
        }
    }).fail(function (xhr, status, error) {
        console.log("Failed to retrieve " + topic + ".  Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
    });
}

window.onload = function () {
    var topic = "urban areas list";
    var urbanAreasUrl = "https://api.teleport.org/api/continents/geonames%3ANA/urban_areas/";
    getData(topic, urbanAreasUrl, addUrbanAreasList);

    addNavbar("navbar");
}

