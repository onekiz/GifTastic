$(document).ready(function(){


var animalGif = ["dog","cat","fish","hamster","bird","skunk","rabbit","chicken"];
var swapImage = [];
var swap = true;

for (var i=0; i<animalGif.length; i++){
  var input = $("<button type = 'submit' class = 'btn btn-success' id = "+animalGif[i]+">"+animalGif[i]+"</button>");
  input.attr("data-name",animalGif[i]);
  $("#buttons").append(input);
}

      $(document).on("click", "#add-animalGif", function(){

          event.preventDefault();

          $("#buttons").empty();
          animalGif.push($("#animalGif-input").val());

            for (var i=0; i<animalGif.length; i++){
                var input = $("<button type = 'submit' class = 'btn btn-success' id = "+animalGif[i]+">"+animalGif[i]+"</button>");
                input.attr("data-name",animalGif[i]);
                $("#buttons").append(input);
            }
      });


      $(document).on("click", ".btn.btn-success", function(){
          $("#images").empty();
          swapImage = [];
          var jQueryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=8f2e00a45d704988b4724d84e37d52b7&q='+$(this).attr("data-name")+'+&limit=10&lang=en';
          $.ajax({
                url: jQueryUrl,
                method: "GET"
            }).done(function(response) {

              $("#images").empty();
                for (var i = 0; i<10; i++){
                    var a = $("<div>");
                    a.addClass("gifs");
                    var b = $("<p>");
                    b.text("Rating: "+response.data[i].rating);
                    a.append(b);
                    $("#images").append(a);
                    swapImage.push(response.data[i].images.fixed_height_still.url);
                    swapImage.push(response.data[i].images.original.url);
                    a.append($("<img src="+response.data[i].images.fixed_height_still.url+" alt="+i*2+">"));
                }
              });
          });

        $(document).on("click", "img", function(){

              if (swap){
                  $(this).attr("src", swapImage[parseInt($(this).attr("alt"))+1]);
                  swap = false;
              }
              else {
                  $(this).attr("src", swapImage[parseInt($(this).attr("alt"))]);
                  swap = true;
              }

        });

});
