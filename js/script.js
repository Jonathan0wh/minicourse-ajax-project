function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var streetStr = $('#street').val();
    var cityStr = $('city').val();
    var address = streetStr + ", " + cityStr;

    var size = "600x400";

    var apikey = "AIzaSyB-ueCJ8yXYXASu6FdC8hOtyYGxuipBal8";

    var src = "https://maps.googleapis.com/maps/api/streetview";
    src += "?" + $.param({
        'key': apikey,
        'size': size,
        'location': address
    });

    $body.append('<img class="bgimg" src=' + src + '>');


    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "a330cf01f00a4d57890d81af8626b7bb",
        'q': "san francisco, ca",
        'sort': "newest",
    });

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json'
    }).done(function (result) {
        $nytHeaderElem.text("New York Times Articles About " + cityStr);

        var articles = result.response.docs;
        articles.forEach(function(item) {
            $nytElem.append('<li class="article">' +
            '<a href="' + item.web_url + '">' + item.headline.main +
            '</a>' +
            '<p>' + item.snippet + '</p>' +
            '</li>');
        });
    }).fail(function (err) {
        throw err;
    });

    return false;
};

$('#form-container').submit(loadData);