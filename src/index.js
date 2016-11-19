$(function() {
  $.ajax({url: "https://gateway.marvel.com:443/v1/public/characters?series=1987%2C%20454%2C%2017285%2C%2020432&limit=100&apikey=57557432956d182efac5d1ba594e0879", crossDomain: true}).then(function(characters) {
    var group = $('<div class="group"></div>');
    $.each(characters.data.results, function(i, charac) {
      var imgboxFound = $('<div class="imgbox"></div>')
      var imgboxUnfound = $('<div class="imgbox-unfound"></div>');
      var linker = $('<a href="' + charac.urls[0].url + '"></a>');
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
  }).catch();

function newResults(e) {
  e.preventDefault();
    var hits = $("#hits").val();
    var page = (hits * ($('#page').val()));
  $.ajax({url: "https://gateway.marvel.com:443/v1/public/characters?series=1987%2C%20454%2C%2017285%2C%2020432&limit=" + hits+ "&offset="+ page + "&apikey=57557432956d182efac5d1ba594e0879", crossDomain: true}).then(function(characters) {
    var group = $('<div class="group"></div>');
    $.each(characters.data.results, function(i, charac) {
      var imgboxFound = $('<div class="imgbox"></div>')
      var imgboxUnfound = $('<div class="imgbox-unfound"></div>');
      var linker = $('<a href="' + charac.urls[0].url + '"></a>');
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
  }).catch();
}

$("#search-options").on("submit", newResults);

})
