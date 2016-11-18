$(function() {
  $.ajax({url: "https://gateway.marvel.com:443/v1/public/characters?apikey=57557432956d182efac5d1ba594e0879", crossDomain: true}).then(function(characters) {
    console.log(characters.data.results);
    var group = $('<div class="group"></div>');
    $.each(characters.data.results, function(i, charac) {
      var imgboxFound = $('<div class="imgbox"></div>')
      var imgboxUnfound = $('<div class="imgbox-unfound"></div>')
      if (charac.thumbnail.path.indexOf('image_not_available') === -1) {
        imgboxFound.append($('<img class="found">').attr('src', charac.thumbnail.path + '/standard_fantastic.' + charac.thumbnail.extension));
        imgboxFound.append($('<h1></h1>').text(charac.name));
        group.append(imgboxFound);
      } else {
        imgboxUnfound.append($('<img class="not-found">').attr('src', charac.thumbnail.path + '/standard_fantastic.' + charac.thumbnail.extension));
        imgboxUnfound.append($('<h1></h1>').text(charac.name));
        group.append(imgboxUnfound);
      }
      // group.append($('<hr>'));
    })
    $("#characters").append(group);
  }).catch();
})
