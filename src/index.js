$(function() {
  $.ajax({url: "https://gateway.marvel.com:443/v1/public/characters?series=1987%2C%2020432%2C%2020694%2C%20454%2C%2017285%2C%2020432%2C%201126%2C%202234%2C%203101&limit=50&apikey=57557432956d182efac5d1ba594e0879", crossDomain: true}).then(function(characters) {
    var group = $('<div class="group"></div>');
    $.each(characters.data.results, function(i, charac) {
      var imgboxFound = $('<div class="imgbox"></div>')
      var imgboxUnfound = $('<div class="imgbox-unfound"></div>');
      var linker = $('<a href="' + charac.urls[1].url + '"></a>');
      if (charac.thumbnail.path.indexOf('image_not_available') === -1) {
        imgboxFound.append($('<img class="found">').attr('src', charac.thumbnail.path + '/standard_fantastic.' + charac.thumbnail.extension));
        imgboxFound.append($('<h1></h1>').text(charac.name));
        linker.append(imgboxFound)
        group.append(linker);
      } else {
        imgboxUnfound.append($('<img class="not-found">').attr('src', charac.thumbnail.path + '/standard_fantastic.' + charac.thumbnail.extension));
        imgboxUnfound.append($('<h1></h1>').text(charac.name));
        linker.append(imgboxUnfound)
        group.append(linker);
      }
      // group.append($('<hr>'));
    })
    $("#characters").append(group);
    $("#attribution").append($('<h5></h5>').text(characters.attributionText));
  }).catch();

  function newResults(e) {
    e.preventDefault();

    if ($("#search").val() === "") {
      var search = "";
    } else {
      var search = "nameStartsWith=" + $("#search").val() + "&";
    }

    if ($("#hits").val() === "") {
      var hits = "50";
    } else {
      var hits = $("#hits").val();
    }

    if ($('#page').val() === "" || $('#page').val() === "1") {
      var page = "1"
    } else {
      var page = (hits * ($('#page').val()));
    }
    $.ajax({
      url: "https://gateway.marvel.com:443/v1/public/characters?" + search + "series=1987%2C%2020432%2C%2020694%2C%20454%2C%2017285%2C%2020432%2C%201126%2C%202234%2C%203101&limit=" + hits + "&offset=" + page + "&apikey=57557432956d182efac5d1ba594e0879",
      crossDomain: true
    }).then(function(characters) {
      var group = $('<div class="group"></div>');
      if (characters.data.results.length === 0) {
        $(group).empty().append($('<h2></h2>').text('No results, try a lower page or less specific search term'));
      }
      $.each(characters.data.results, function(i, charac) {
        var imgboxFound = $('<div class="imgbox"></div>')
        var imgboxUnfound = $('<div class="imgbox-unfound"></div>');
        var linker = $('<a href="' + charac.urls[1].url + '"></a>');
        if (charac.thumbnail.path.indexOf('image_not_available') === -1) {
          imgboxFound.append($('<img class="found">').attr('src', charac.thumbnail.path + '/standard_fantastic.' + charac.thumbnail.extension));
          imgboxFound.append($('<h1></h1>').text(charac.name));
          linker.append(imgboxFound)
          group.append(linker);
        } else {
          imgboxUnfound.append($('<img class="not-found">').attr('src', charac.thumbnail.path + '/standard_fantastic.' + charac.thumbnail.extension));
          imgboxUnfound.append($('<h1></h1>').text(charac.name));
          linker.append(imgboxUnfound)
          group.append(linker);
        }
        // group.append($('<hr>'));
      })
      $("#characters").empty().append(group);
      $("#attribution").append($('<h5></h5>').text(characters.attributionText));
    }).catch(function() {
      $("#characters").empty().append($('<h2></h2>').text('Page unavailable'));
    });
  }

  $("#search-options").on("submit", newResults);

})
