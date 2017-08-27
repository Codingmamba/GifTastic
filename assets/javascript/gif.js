$(document).ready(function(){ 

        //Array holding all of the default names set by me
        var gifArray = ["LeBron James", "Mike Tyson", "James Harden","Tom Brady", "Jackie Robinson", "Russell Wilson", "Eli Manning"];
    
        //function creates a button and add attributes
        function appendNewButton(newGif){ 
            var createButton = $('<button>')
            createButton.attr('type', "button");
            createButton.addClass('btn btn-default');
            createButton.addClass('gif');
            createButton.attr('data-name', newGif);
            createButton.text(newGif);
            $('#buttonsView').append(createButton);
            };
    
            function bButtons(){ 
            for (var i = 0; i < gifArray.length; i++){
            appendNewButton(gifArray[i])
            }
        };
    
        function displayGifInfo(){
            //removes all child nodes and content from the selected elements.
            $('#gifView').empty();
            var gif = $(this).attr('data-name');
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=ca10da6b0c614ef4be658ed08cff8c85";
    
         //\\//\\///\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

            $.ajax({
                url: queryURL, 
                method: 'GET'
            })
            .done(function(response) {
    
                var results = response.data;
    
                for (var i = 0; i < results.length; i++) {
                    // Creates a div tag under variable
                    var gifDiv = $('<div>');
                    var p = $('<p>').text("Rating: " + results[i].rating);
                    var gifImage = $('<img>');
                    var gifStill = response.data[i].images.fixed_height_still.url;
                    var gifAnimate = results[i].images.fixed_height.url
    
                    //Add a class and attributes to the div tag
                    gifImage.addClass('gifToggle');
                    gifImage.attr('data-still', gifStill);
                    gifImage.attr('data-animate', gifAnimate);
                    gifImage.attr('data-state', 'still');
                    gifImage.attr('src', gifStill);
    
                    gifDiv.append(p);
                    gifDiv.append(gifImage);		           	
    
                    $('#gifView').prepend(gifDiv); 	
                }
            }); 
        }
        
        function gifState () {
            var state = $(this).attr('data-state');
    
             if (state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        };
    
    
    
        bButtons();
        
        $('#searchButton').on('click', function(){
            $('#gif-input').text('');
            $('#gifView').empty();
    
            var gifSearch = $('#gif-input').val().trim();
            gifArray.push(gifSearch);
            appendNewButton(gifSearch);
    
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=ca10da6b0c614ef4be658ed08cff8c85";
    
            $.ajax({
                    url: queryURL,
                    method: 'GET'
                })
                .done(function(response) {
                    console.log(response);
    
                    var results = response.data;
    
                    for (var i = 0; i < results.length; i++) {
                        var gifDiv = $('<div>');
                        var gifImage = $('<img>');
                        var p = $('<p>').text("Rating: " + results[i].rating);
                        var gifStill = response.data[i].images.fixed_height_still.url;
                        var gifAnimate = results[i].images.fixed_height.url;
    
                        gifImage.addClass('gifToggle');
    
                        gifImage.attr('data-still', gifStill);
                        gifImage.attr('data-animate', gifAnimate);
                        gifImage.attr('data-state', 'still');
                        gifImage.attr('src', gifStill);
    
                        gifDiv.append(gifImage);
                        gifDiv.append(p);
                        
    
                        $('#gifView').prepend(gifDiv);
                        gifState ();
    
                    }
    
                    if (results.length == 0) {
                        $('#gifView').text("No gifs found")
                    };
    
                });
    
    
            return false;
        });
    
        $(document).on('click', '.gif', displayGifInfo);
        $(document).on('click', '.gifToggle', gifState);
    });