// To-do:  Add error handling
var urbanAreaName;

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

// ********************************************************************************************
// function to add home screen table content.
// - target (this parameter should provide the target for the experience section)
// - tableData (this parameter should provide data object for all the home screen table data)
// ********************************************************************************************

function addUrbanAreasList(data) {
    var uaList = data._links["ua:items"];

    if (uaList.length > 0) {
        $('#urbanAreasOptions').append($('<select>', { id: "uaList", size: 20 }));
        for (i = 0, l = uaList.length; i < l; i++) {
            $('#uaList').append($('<option>', { text: uaList[i].name, value: i }));
        }

        $('#urbanAreasOptions').change(function () {

            $("section.hidden").removeClass("hidden");
            $("#greeting").addClass("hidden");

            var ua = $('#urbanAreasOptions option:selected').val();
            var topic = "urban area details";
            var uaDetailsUrl = uaList[ua].href;
            getData(topic, uaDetailsUrl, urbanArea);


        })
    } else {
        console.log("Error - Urban Areas List not found");
    }
}

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
}

function urbanAreaCities(data) {
    $('#urbanAreaCities').empty();
    $('#urbanAreaCities').append($('<h4>', { text: "Cities of the " + urbanAreaName + " urban area." }));

    var cityList = [];
    for (i = 0, l = data._links["city:items"].length; i < l; i++) {
        cityList.push(data._links["city:items"][i].name);
    }
    $('#urbanAreaCities').append($('<p>', { text: cityList.join(", ") }));
}

function urbanAreaDetails(data) {
    console.log(data.categories);

    $('#urbanAreasDetails').empty();

    function detailRow(tableID, row, rowLabel, rowValue) {

        $('#' + tableID + ' tbody').append($('<tr>', { id: tableID + 'Row' + row }));
        $('#' + tableID + 'Row' + row).append($('<td>', { text: rowLabel }));
        $('#' + tableID + 'Row' + row).append($('<td>', { text: rowValue }));
    }

    for (i = 0, l = data.categories.length; i < l; i++) {
        var tableID = data.categories[i].id;

        $('#urbanAreasDetails').append($('<article>', { id: "urbanAreasDetails" + i, class: "rightContent" }));
        $('#urbanAreasDetails' + i).append($('<h4>', { text: data.categories[i].label }));
        $('#urbanAreasDetails' + i).append($('<table>', { id: tableID, class: "table table-sm" }));
        $('#' + tableID).append($('<thead>'));
        $('#' + tableID + ' thead').append($('<tr>'));
        $('#' + tableID + ' thead tr').append($('<th>', { text: "Categories" }));
        $('#' + tableID + ' thead tr').append($('<th>', { text: "Value", class: "detailValue" }));
        $('#' + tableID).append($('<tbody>'));

        for (r = 0, l = data.categories[i].data.length; r < l; r++) {
            try {
                var rowLabel = data.categories[i].data[r].label;
                var valueType = data.categories[i].data[r].type;
                var formatedValue;

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

                detailRow(tableID, r, rowLabel, formatedValue, valueType);
            } catch (e) {
                console.log("Error in urban area details - " + valueType)
            }
        }
    }
}

function urbanAreaImages(data) {
    $('#urbanAreaImage').empty();
    $('#urbanAreaImage').append($('<img>', { src: data.photos[0].image.web, alt: "City Image" }));
}

function urbanAreaSalaries(data) {
    $('#urbanAreaSalaries').empty();
    $('#urbanAreaSalaries').append($('<h4>', { text: "Salaries" }));

    $('#urbanAreaSalaries').append($('<table>', { class: "table table-sm" }));
    $('#urbanAreaSalaries table').append($('<thead>'));
    $('#urbanAreaSalaries table thead').append($('<tr>'));
    $('#urbanAreaSalaries table thead tr').append($('<th>', { text: "Job Title" }));
    $('#urbanAreaSalaries table thead tr').append($('<th>', { text: "25 Percentile", class: "salary" }));
    $('#urbanAreaSalaries table thead tr').append($('<th>', { text: "50 Percentile", class: "salary" }));
    $('#urbanAreaSalaries table thead tr').append($('<th>', { text: "75 Percentile", class: "salary" }));
    $('#urbanAreaSalaries table').append($('<tbody>'));

    for (i = 0, l = data.salaries.length; i < l; i++) {
        $('#urbanAreaSalaries table tbody').append($('<tr>', { id: 'salaryRow' + i }));
        $('#salaryRow' + i).append($('<td>', { text: data.salaries[i].job.title }));
        $('#salaryRow' + i).append($('<td>', { text: formatter.format(data.salaries[i].salary_percentiles.percentile_25), class: "salary" }));
        $('#salaryRow' + i).append($('<td>', { text: formatter.format(data.salaries[i].salary_percentiles.percentile_50), class: "salary" }));
        $('#salaryRow' + i).append($('<td>', { text: formatter.format(data.salaries[i].salary_percentiles.percentile_75), class: "salary" }));
    }
}

function urbanAreaScores(data) {
    $('#urbanAreaScores').empty();
    $('#urbanAreaScores').append($('<h4>', { text: "Scores" }));

    $('#urbanAreaScores').append($('<table>', { class: "table table-sm" }));
    $('#urbanAreaScores table').append($('<thead>'));
    $('#urbanAreaScores table thead').append($('<tr>'));
    $('#urbanAreaScores table thead tr').append($('<th>', { text: "Categories" }));
    $('#urbanAreaScores table thead tr').append($('<th>', { text: "Score from 1 to 10", class: "score" }));
    $('#urbanAreaScores table').append($('<tbody>'));

    for (i = 0, l = data.categories.length; i < l; i++) {
        $('#urbanAreaScores table tbody').append($('<tr>', { id: 'scoreRow' + i }));
        $('#scoreRow' + i).append($('<td>', { text: data.categories[i].name }));
        $('#scoreRow' + i).append($('<td>', { text: data.categories[i].score_out_of_10.toFixed(2), class: "score" }));
    }
}

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

