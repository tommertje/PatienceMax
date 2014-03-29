//global constant DECLARATIONS
//var constantMenuWidth = 190; //not (yet) related to the device width (we already resized font size to device...)
//var constantPlayfieldLeftmargin = screen.width * 13/1000; // = 1,3% of the device width
//var constantPlayfieldTopmargin = parseInt($("#menu_bar").css("height")) + (screen.width * 2 / 100); //playfield starts a bit below the menu bar
//var constantCardWidth = /*screen.width / 14 > 71 ? 71 :*/ Math.round(screen.width / 14); /*$("#card0").width()*/;//* 1.1126760563; //was 79 ; used for card positioning, max=71px
//if (constantCardWidth > parseInt($(".card").css("max-width"))) constantCardWidth = parseInt($(".card").css("max-width")); //ideal for iPad
//var constantCardHeight = Math.round(96 / 71 * constantCardWidth);//aspect ratio must be equal to source images, but no decimals //moet worden $("#0").height(); // used for card positioning
//var constantCardWidthInterspace = Math.round(constantCardWidth / 9); //8; //margin between columns, used for card positioning on playfield
//constantCardWidth += constantCardWidthInterspace; //this variable is used more often wíth interspace, than without.
////if ($("#card0").css("height") > $(".card").css("max-height")) $("#card99").css("height") = $(".card").css("max-height");
//var constantCardHeightInterspace = constantCardHeight / 4;//22; // used for card positioning on playfield ; this determines how much of the card is shown, before the next card in the column is shown
//var constantHandHeight = constantCardHeight + 5; //5 extra pixels because background image contains edges
//var constantHandTop = screen.height - constantHandHeight - Math.round(screen.height / 70) - 20; //ipad = ca. 14 margin from the bottom
//var constantHandLeftMargin = screen.width < 800 ? 1 : 2; //pixels related to the device
//var constantHandCardMargin = screen.width < 800 ? 3 : 3;//9;12; //1.18426760563; //was 1.1826760563 //this comes close to the cardmargin in the background image
//var constantPilesWidth = 2 * (constantCardWidth - constantCardWidthInterspace) + 11;
//var constantPilesHeight = 4 * constantCardHeight + 16; //3 times the margin(3) between the card + 7? extra pixels because background image contains edges

var constantMenuWidth;
var constantPlayfieldLeftmargin;
var constantPlayfieldTopmargin;
var constantCardWidth;
var constantCardHeight;
var constantCardWidthInterspace;
var constantCardHeightInterspace;
var constantHandHeight;
var constantHandTop;
var constantHandLeftMargin;
var constantHandCardMargin;
var constantPilesWidth;
var constantPilesHeight;

var constantRed = 0; //for initiation and to check dropallowed
var constantBlack = 1;
var constantKing = 13;
var arrayHighlightColors = ["blue", "red", "yellow", "lime", "cyan", "orange", "brown", "olive", "purple", "maroon", "fuchsia", "navy", "teal"]; //used for showDroppability
var stringRefreshSpeedDescription = ["directly", "quickly", "slowly"]; //used for menu text

//global variable DECLARATIONS
var deckArray = [52]; //part 1 to build up cardsArray
var deckArray2 = [52]; //part 2 to build up cardsArray
var cardsArray = [104]; //this is the actual array for playing the game and knowing EVERYTHING!
var numberOfCardsInColumn = [10]; //to calculate NewCardTop and to decide if a King may be dropped in the column
var draggableArray = [10]; //during initiation, this array will become two dimensional, contains cardID
var pilesArray = [8]; //for building up - from the aces upwords, contains cardID
var intMaxPilesInOneColumn = 4;
var handIsOccupiedArray = [4]; //for information on the four cards you may hold in your hand
var numberOfKingsDroppedInPlace = 0;
var originalCardLeft; //to put the card back, in case it is dropped incorrectly
var originalCardTop; //to put the card back, in case it is dropped incorrectly
var originalCardzIndex; //to put the card back, in case it is dropped incorrectly
//var blnIsPortrait = false;
var timerIDmustbeglobal = 0; //moet dit zeker global zijn??
var savedSettings;
//var savedSettingsString;
var intSoundsOn = true;
var intNotificationsOn = true;
//var blnSkipGameIntro = true;
var intRefreshSpeed = 2; // = quickly
var allowDragfrompile = false;
var maxCardsinHand = 4; //4 or 5

//INITIATIONS
initiateDeck(deckArray);
initiateDeck(deckArray2); //create a second deck, exactly the same as the first
cardsArray = deckArray.concat(deckArray2); // we need 2 of the same decks, put together
//cardsArray = ShuffleArray(cardsArray); shuffle doen we al in build the gamefield

//GAME INTRO
//$('#skipIntro').click(function (e) {
//    e.preventDefault();
//    clearInterval(timerId); //Make sure we kill the intro timer
//    //FADE SOUND OUT AND THEN REMOVE
//    if (intSoundsOn) {
//        $('#game_intro_sound').remove();
//    }
                      
//    //buildTheGamefield(true); // true = show fade
//});

//$(function () {
    //Simple way to restart game
    //this way we dont get problems with positions in cardsArray etc.
    //localstorage.skipgameintro is declaired on game start
    //then we set the value to true on a refresh click and do a checkhere
    //if there is a true then skip and delete (delete so that when we close the game
    //on the ipad and start again we still see an intro. if were in the game and we refresh
    //we skip the intro by setting it to true befor deleting it in this part.

    //if (localStorage.skipgameintro) {
    //    delete localStorage.skipgameintro;        
    //    $('#picLoading').fadeIn(500).delay(1600).fadeOut(2500);
    //    $('#loading').delay(100).fadeIn(1400).delay(1500).fadeOut(0);
    //    setTimeout(function () {$('#loading').attr('src', 'images/intro_patiencemax_3_loading_2.png')}, 1500);
    //    setTimeout(function () { $('#loading').attr('src', 'images/intro_patiencemax_3_loading_3.png')}, 2450);

    //    setTimeout(function () {
    //        $('#skipIntro').trigger('click');
    //    }, 2500);
        
    //} else {
    //    if (intSoundsOn) {
    //        $('#game_intro_sound').trigger('play');
    //    }
    //    $('#picOne').fadeIn(2500).delay(5000).fadeOut(2500);
    //    $('#picTwo').delay(9500).fadeIn(2500).delay(1500000).fadeOut(2500);
    //    $('#skipIntro').delay(15500).fadeIn(2500).delay(1500000).fadeOut(2500);
    //}

    //timerId = setTimeout(function () {

    //$(window).bind("load", function() {
        //buildTheGamefield(true); // true = show fade     
    //}
    //}, 1500000);   
//});
//END GAME INTRO 

$(window).resize(function () {
    if (screen.width < screen.height) {
        $("#playfield").addClass("portrait_mode");
        $("#menu").addClass("portrait_mode");
    }
    else {
        $("#playfield").removeClass("portrait_mode");
        $("#menu").removeClass("portrait_mode");
    }
});

//INITIATIONS from storage
$(window).bind("load", function () {

    var savedSettingsString = localStorage["PatienceSettings"];

    if (typeof savedSettingsString == "undefined") {
        saveSettings(); //make sure there is always a settings-item in localStorage
    } else {
        savedSettings = /*window.*/JSON.parse(savedSettingsString);

        intSoundsOn = savedSettings["sound"];
        //console.log(intSoundsOn);
        intNotificationsOn = savedSettings["notifications"];
        intRefreshSpeed = savedSettings["refreshspeed"];
        if (savedSettings["allow_dragfrompile"]) allowDragfrompile = true;
        maxCardsinHand = parseInt(savedSettings["maxallowedcardsinhand"]);

        if (typeof intRefreshSpeed == "undefined") intRefreshSpeed = 1; //only occurs the very first time the game is started
        if (typeof maxCardsinHand == "undefined") maxCardsinHand = 4; //only occurs the very first time the game is started

        //possibly the menu texts must be changed, based on the user's settings
        if (!intSoundsOn) {
            //deviation from default
            $('#turn_soundsonoff').click();
        };

        if (!intNotificationsOn) {
            //deviation from default
            $('#turn_notificationsonoff').click();
        };

        //menu text can always be (re)set :
        $('#change_refresh_speed').text("Show new game " + stringRefreshSpeedDescription[intRefreshSpeed - 1]);

        if (allowDragfrompile) {
            //deviation from default
            $('#allow_dragfrompile').click();
        };

        if (maxCardsinHand == 5) {
            //deviation from default
            $('#maxallowedcardsinhand').click();
        };
    }

    constantMenuWidth = parseInt($("#menu").css("width"));//190; //related to the device width
    constantPlayfieldLeftmargin = screen.width * 13 / 1000; // = 1,3% of the device width
    constantPlayfieldTopmargin = parseInt($("#menu_bar").css("height")) + (screen.width * 2 / 100); //playfield starts a bit below the menu bar
    constantCardWidth = Math.round(screen.width / 14); //was 79 ; used for card positioning, max=71px
    if (constantCardWidth > parseInt($(".card").css("max-width"))) constantCardWidth = parseInt($(".card").css("max-width")); // = ideal for iPad
    constantCardHeight = Math.round(96 / 71 * constantCardWidth);//aspect ratio must be equal to source images, but no decimals //moet worden $("#0").height(); // used for card positioning
    constantCardWidthInterspace = Math.round(constantCardWidth / 9); //8; //margin between columns, used for card positioning on playfield
    //constantCardWidth += constantCardWidthInterspace; //this variable is used less often wíth interspace, than without.
    //if ($("#card0").css("height") > $(".card").css("max-height")) $("#card99").css("height") = $(".card").css("max-height");
    constantCardHeightInterspace = constantCardHeight / 4;//22; // used for card positioning on playfield ; this determines how much of the card is shown, before the next card in the column is shown
    constantHandHeight = constantCardHeight + 5; //5 extra pixels because background image contains edges
    constantHandTop = screen.height - constantHandHeight - Math.round(screen.height / 70); // = ca. 14 margin from the bottom
    if (screen.width > 1300) constantHandTop -= 60; //for testing with RIPPLE disabled
    constantHandLeftMargin = screen.width < 800 ? 1 : 2; //pixels related to the device
    constantHandCardMargin = screen.width < 800 ? 3 : 3;//9;12; //1.18426760563; //was 1.1826760563 //this comes close to the cardmargin in the background image
    constantPilesWidth = 2 * constantCardWidth + 11;
    constantPilesHeight = 4 * constantCardHeight + 38; //3 times the margin(3) between the card + 7? extra pixels because background image contains edges

    buildTheGamefield(true);
});

//function mobiledraganddrop() {
//    // Event handler for drop zones                
//}

function buildTheGamefield(blnShowFade) {
    var intCardLeftPosition = 0; //in pixels
    var intCardTopPosition = 0; //in pixels
    var loopingCardNumber = 0; //used when building the playfield & the Hand and to further initiate cardsArray values to comply with HTML values
    var loopingRowNumber = 0; // simple counters
    var loopingColumnNumber = 0; // simple counters
    var loopingColumnNumber; // simple counters
    var loopingCardInHandNumber; // simple counters

    numberOfKingsDroppedInPlace = 0;

    //if (blnShowFade) {
        //ALL IS LOADED; NOW SHOW THE DIVS IN A FANCY WAY
        //$('#preloading_screen').fadeOut(45, function () { //was : 4500
        //    $('#preloading_screen').hide();
        //});

        $('#menu').show();

        $('#notification_message_sp').css("top", constantHandTop);
        $('#notification_message_sp').css("height", constantHandHeight);
        $('#notification_message_sp').css("width", (constantCardWidth + constantCardWidthInterspace) * 2);
    //$('#notification_message_sp').css("font-size", parseInt($('#menu').css("font-size")));
        
        //$('#playfield').addClass("menu_is_open");
        //$("#playfield.menu_is_open").css("left", constantMenuWidth); //px
        //$('#playfield').removeClass("menu_is_open");

        $('#playfield').show();
        //set the location of Hands & Piles
        $("#hands").css("top", constantHandTop);
        $("#hands").css("height", constantHandHeight);
        $("#hands").css("width", (constantCardWidth + constantCardWidthInterspace) * maxCardsinHand + 9); //some extra pixels because background image contains edges

        $(".card_border_background").css("height", constantCardHeight + 5);
        $(".card_border_background").css("width", constantCardWidth + 3);//Math.round(parseInt($("#hands").css("width")) / maxCardsinHand));

        $("#cardbackground_in_hand1").css("left", 0 * (constantCardWidth + constantCardWidthInterspace + constantHandCardMargin));
        $("#cardbackground_in_hand2").css("left", 1 * (constantCardWidth + constantCardWidthInterspace + constantHandCardMargin));
        $("#cardbackground_in_hand3").css("left", 2 * (constantCardWidth + constantCardWidthInterspace + constantHandCardMargin));
        $("#cardbackground_in_hand4").css("left", 3 * (constantCardWidth + constantCardWidthInterspace + constantHandCardMargin));
        $("#cardbackground_in_hand5").css("left", 4 * (constantCardWidth + constantCardWidthInterspace + constantHandCardMargin));
        $("#cardbackground_in_hand1").css("top", 0);
        $("#cardbackground_in_hand2").css("top", 0);
        $("#cardbackground_in_hand3").css("top", 0);
        $("#cardbackground_in_hand4").css("top", 0);
        $("#cardbackground_in_hand5").css("top", 0);

        $('#hands').transition({ y: '100' }); //this is relative to 'top'
        $('#hands').show();
        $('#hands').transition({ y: '0', duration: intRefreshSpeed * 800 });

        $("#piles").css("left", (2 * constantPlayfieldLeftmargin) + (10 * (constantCardWidth+ constantCardWidthInterspace)));
        $("#piles").css("top", constantPlayfieldTopmargin);
        $("#piles").css("height", constantPilesHeight);
        $("#piles").css("width", constantPilesWidth);

        $("#cardbackground_in_pile1").css("left", 0);
        $("#cardbackground_in_pile2").css("left", 0);
        $("#cardbackground_in_pile3").css("left", 0);
        $("#cardbackground_in_pile4").css("left", 0);
        $("#cardbackground_in_pile5").css("left", constantCardWidth + 7);
        $("#cardbackground_in_pile6").css("left", constantCardWidth + 7);
        $("#cardbackground_in_pile7").css("left", constantCardWidth + 7);
        $("#cardbackground_in_pile8").css("left", constantCardWidth + 7);
        $("#cardbackground_in_pile1").css("top", 0 * (constantCardHeight + 9));
        $("#cardbackground_in_pile2").css("top", 1 * (constantCardHeight + 9));
        $("#cardbackground_in_pile3").css("top", 2 * (constantCardHeight + 9));
        $("#cardbackground_in_pile4").css("top", 3 * (constantCardHeight + 9));
        $("#cardbackground_in_pile5").css("top", 0 * (constantCardHeight + 9));
        $("#cardbackground_in_pile6").css("top", 1 * (constantCardHeight + 9));
        $("#cardbackground_in_pile7").css("top", 2 * (constantCardHeight + 9));
        $("#cardbackground_in_pile8").css("top", 3 * (constantCardHeight + 9));

        //$("#piles").css("background-size", "cover");
        $('#piles').show();
        $('#piles').transition({ x: '300' }); // starting position for the transition, relative to 'top'
        $('#piles').transition({ x: '0', duration: intRefreshSpeed * 800 }); // 0 = the value 'top'

        //blnSkipGameIntro = false;

        var feedback_top = parseInt($("#piles").css("top")) + constantPilesHeight;
        //console.log(feedback_top);
        $("#feedback").css("top", feedback_top + 10);
        $("#feedback").css("left", parseInt($("#piles").css("left"))); //todo ideale positie ontwerpen/bepalen
        $("#feedback").css("zIndex", 1); //dit is gelijk aan de onderste kaart en gaat daar overheen... ************
        $('#feedback').transition({ x: '300' }); //move to the position, where the visual transition starts
        $('#feedback').show(); //turn visual
        $('#feedback').transition({ x: '0', duration: intRefreshSpeed * 800 }); //start (visual) transition
    //}

    cardsArray = ShuffleArray(cardsArray);
    //further initiate cardsArray values to comply with HTML values
    for (loopingColumnNumber = 0; loopingColumnNumber < 10; loopingColumnNumber++) {
        for (loopingRowNumber = 0; loopingRowNumber < 10; loopingRowNumber++) {
            //some more initiation of variables
            cardsArray[loopingCardNumber].rowNumber = loopingRowNumber;
            cardsArray[loopingCardNumber].columnNumber = loopingColumnNumber;
            cardsArray[loopingCardNumber].highercard = loopingCardNumber - 1; //this is the card, on which we place the new card (-1 for the highest cards)
            
            if (loopingRowNumber == 0 && cardsArray[loopingCardNumber].rank == constantKing) {
                numberOfKingsDroppedInPlace++;
                checkGameEnd();
            }
            loopingCardNumber++;
        }
    } //DONE initiate cardsArray values to comply with HTML values

    //actual build
    //first initiate the cards in the playfield (positions)    
    intCardLeftPosition = constantPlayfieldLeftmargin;    
    if (intSoundsOn) {
        $('#card_shuffle').clone()[0].play();
    }
    
    $(".card").css('height', constantCardHeight); //47
    $(".card").css('width', constantCardWidth); //35
    $(".card").css('background-size', 'cover'); //this option respects the aspect ratio

    for (loopingCardNumber = 0; loopingCardNumber <= 99; loopingCardNumber++) {
        loopingColumnNumber = Math.floor(loopingCardNumber / 10) // operand "DIV"
        loopingRowNumber = loopingCardNumber % 10; //modulus : remove all 10s

        if (loopingRowNumber == 9) {
            //we have reached the last card of the column
            draggableArray[loopingColumnNumber] = new Array(0);
            draggableArray[loopingColumnNumber].push(loopingCardNumber);
            numberOfCardsInColumn[loopingColumnNumber] = 10; //initially, there are 10 cards in each column. set this value each time at the 10th card
        }

        //$("#card" + loopingCardNumber).AddClass('card_on_playfield shadow ');
        //$("#card" + loopingCardNumber).css('height', constantCardHeight); //47
        //$("#card" + loopingCardNumber).css('width', constantCardWidth - constantCardWidthInterspace); //35
        $("#card" + loopingCardNumber).css('background-image', 'url(images/vintage_cards/' + cardsArray[loopingCardNumber]['filename'] + ')');
        //$("#card" + loopingCardNumber).css('background-size', 'cover'); //this option respects the aspect ratio
        $("#card" + loopingCardNumber).css('z-index', loopingRowNumber);
        //$("#card" + loopingCardNumber).css('left', 20);
        //$("#card" + loopingCardNumber).css('top', 70);
        //$("#card" + loopingCardNumber).show();
        intCardLeftPosition = constantPlayfieldLeftmargin + (loopingColumnNumber * (constantCardWidth + constantCardWidthInterspace));
        intCardTopPosition = constantPlayfieldTopmargin + (loopingRowNumber * constantCardHeightInterspace);
        $("#card" + loopingCardNumber).transition({ left: intCardLeftPosition, duration: 2500 });
        $("#card" + loopingCardNumber).transition({ top: intCardTopPosition, duration: 2500 });
    }

    // Build The Hand *********
    $(".card_in_hand").css('height', constantCardHeight); //47
    $(".card_in_hand").css('width', constantCardWidth); //35
    //$(".card_in_hand").css('background-size', 'cover'); //this option respects the aspect ratio
    //reuse some variables
    intCardLeftPosition = constantHandLeftMargin;//3 the first card starts after the left corner signs //390 rvr aan gepast anders werkt niet goed per divice width //dit vervangen door dragDiv.getAttributeNode('left') ter vervanging van constantCardInHandLeftMargin hoe

    for (loopingCardNumber = 100; loopingCardNumber <= 103; loopingCardNumber++) {
        loopingCardInHandNumber = loopingCardNumber - 100;
        handIsOccupiedArray[loopingCardInHandNumber] = true;
        cardsArray[loopingCardNumber].positioninhand = loopingCardInHandNumber;
        //genius idea by Roel : div ID is same as Card ID, so during an event we know the Card ID, so we can use CardsArray anywhere for card details
        //$('#hands').append("<div id='" + loopingCardNumber + "' class='card_in_hand shadow draggable' style='left:" + 0 + "px; background-image: url(images/vintage_cards/" + passedCardsArray[loopingCardNumber]['filename'] + ");opacity:0.01;\'  ></div>"); //a div must be "draggable"='true' if you want the div to be droppable / drop event
        $("#card" + loopingCardNumber).css('background-image', 'url(images/vintage_cards/' + cardsArray[loopingCardNumber]['filename'] + ')');
        //no initial z-index value needed, because no card can be dropped on a card-in-hand
        $("#card" + loopingCardNumber).transition({ left: intCardLeftPosition, duration: 2200 });

        intCardLeftPosition += constantCardWidth + constantCardWidthInterspace + constantHandCardMargin;
    }
           
    // Initiate the piles with invalid cardnumber, to indicate the piles are empty
    pilesArray[0] = -1;
    pilesArray[1] = -1;
    pilesArray[2] = -1;
    pilesArray[3] = -1;
    pilesArray[4] = -1;
    pilesArray[5] = -1;
    pilesArray[6] = -1;
    pilesArray[7] = -1;

    for (loopingColumnNumber = 0; loopingColumnNumber < 10; loopingColumnNumber++) {
        refreshDraggableArray(loopingColumnNumber);
    }    
    declareMenuBarToggle();
    declareRefreshClick();    
} //build-the-gamefield()

function ShuffleArray(oldArray) {
    //in case of cheat :         var newArray = oldArray;
    var newArray = oldArray.slice();
    var AmountofCards = newArray.length;
    var loopingCardNumber = AmountofCards;

    while (loopingCardNumber--) {
        var randomCardNumber = parseInt(Math.random() * AmountofCards); //declarations should be outside while loop
        var oldArrayElement = newArray[loopingCardNumber];
        newArray[loopingCardNumber] = newArray[randomCardNumber];
        newArray[randomCardNumber] = oldArrayElement;
    }
    return newArray;
}

function drag(source_node, dragDivIDCardNumber) {
    var loopingRowNumber;
    //this function is triggered on touchend (ondragstart) and is used for both hand and playfield and pile
    $("#card" + dragDivIDCardNumber).css("z-index", 100); //moet hoger dan de rest zijn, zodat de kaart over de rest zweeft.    
    $("#card" + dragDivIDCardNumber).addClass("drag_shadow");
    //$("#card" + dragDivIDCardNumber).removeClass("shadow"); class drag_shadow visually overlaps class shadow, so no need to remove the class.
 
    //DRAG ALL CARDS THAT HAVE THE GO CLASS ... DIT MOET ERGENS ANDERS GEBEUREN
    //$(".GO").wrapAll("<div id='draggDraggableDivs' class="draggable" />"); //.multiDraggable({ group: [$("#1"), $("#2")] });
    /*$("#card" + dragDivIDCardNumber).css("box-shadow", "12px 12px 13px black");*/

    if ($("#card" + dragDivIDCardNumber).hasClass("card_on_playfield")) {
        if (draggableArray[cardsArray[dragDivIDCardNumber].columnNumber].length > 1) {
            //the card being dragged is part of a row, longer than 1 card
            if (dragDivIDCardNumber == draggableArray[cardsArray[dragDivIDCardNumber].columnNumber][0]) {
                //$("#card" + dragDivIDCardNumber).addClass("GO");       
            }
            else {
                //the card being dragged is somewhere in the draggable Array
                loopingRowNumber = 0;

                while (dragDivIDCardNumber != draggableArray[cardsArray[dragDivIDCardNumber].columnNumber][loopingRowNumber]) {
                    $("#card" + draggableArray[cardsArray[dragDivIDCardNumber].columnNumber][loopingRowNumber]).css("opacity", "0.3"); //this makes it look like the card is already gone & it makes the cards/playfield below more visible
                    loopingRowNumber++;
                }
                $("#card" + draggableArray[cardsArray[dragDivIDCardNumber].columnNumber][loopingRowNumber]).css("opacity", "0.3"); //this makes it look like the card is already gone & it makes the cards/playfield below more visible                
            }
        }
        else {            
            // *** source_node.data.dataTransfer.setDragImage(dragimage, 0, 0); //ik moet eigenlijk dit gebruiken : dragDivIDCardNumber maar dan gaat de opacity mis
        }
    }    
    source_node.target.style.opacity = '0.3'; //this makes it look like the card is already gone & it makes the cards/playfield below more visible
} //drag()

function droponcolumn(e, dropColumnNumber) {  // als we blijven redeneren obv coordinaten, dan kan de inhoud van deze functie naar dropCardOnPlayfield (en dropCardOnPlayfield => gewoon "droponplayfield")
    var target = e.target || e.srcElement;
    if (numberOfCardsInColumn[dropColumnNumber] > 0) {
        //a drop on the playfield on a 'filled' column
        dropCardOnPlayfield(e, draggableArray[dropColumnNumber][0], dropColumnNumber);
    }
    else {
        //card dropped on empty column
        dragDivIDCardNumber = target.id.slice(4);
        if (cardsArray[dragDivIDCardNumber].rank == constantKing) {
            if ($("#card" + dragDivIDCardNumber).hasClass("card_on_playfield")) {
                if (originalCardzIndex != 0) {
                    //only count another king-in-place if the dragged king was not already at the top of the dragcolumn //hertesten 07-04-2013
                    numberOfKingsDroppedInPlace++;
                }
            }
            else {
                //king from hand
                numberOfKingsDroppedInPlace++;
            }
            dropCardOnPlayfield(e, -1, dropColumnNumber); //dropnr = -1, because it is used as value for highercard
            //performDropOnPlayfield(dragDivIDCardNumber, -1, dropColumnNumber); //dropnr = -1, because it is used as value for highercard
            checkGameEnd();
        }
        else {
            setCardBack(dragDivIDCardNumber, cardsArray[dragDivIDCardNumber].columnNumber, cardsArray[dragDivIDCardNumber].highercard);
            //no drop : undo all actions from function drag()
            $("#card" + dragDivIDCardNumber).css("opacity", "1"); //card completely visible again
            $("#card" + dragDivIDCardNumber).removeClass("drag_shadow");
        }
    }
}

function dropCardOnPlayfield(e, dropDivIDCardNumber, dropColumnNumber) {
    //used for playfield only. NOTE that DropDivIDCardNumber can be -1 which means : king dropped on empty column
    var dragDivIDCardNumber;
    var dragColumnNumber = 0;
    var dragHigherCard = 0;
    var loopingDraggableArrayNumber;
    var cardofdraggableArray = 0;
    var target = e.target || e.srcElement;

    dragDivIDCardNumber = parseInt(target.id.slice(4)); //hertesten
    if ($("#card" + dragDivIDCardNumber).hasClass("card_on_playfield")) {
        dragColumnNumber = cardsArray[dragDivIDCardNumber].columnNumber;
        dragHigherCard = cardsArray[dragDivIDCardNumber].highercard;
    }

    if (dropallowed(dragDivIDCardNumber, dropDivIDCardNumber)) {
        if ($("#card" + dragDivIDCardNumber).hasClass("card_on_playfield")) {
            //card dragged from playfield to playfield
            if (draggableArray[dragColumnNumber].length > 1) {
                //the dragged card is part of a Draggable Array
                //find out the position of the dragged card in the Draggable Array, starting from the top
                loopingDraggableArrayNumber = draggableArray[dragColumnNumber].length - 1;
                while (dragDivIDCardNumber != draggableArray[dragColumnNumber][loopingDraggableArrayNumber]) {
                    //go through each card in the draggableArray until you get to the card, which is being dragged - dit kan ook met .each en return
                    loopingDraggableArrayNumber--;
                }

                while (loopingDraggableArrayNumber >= 0) {
                    //again decrease by 1, this time because the initally dragged card has already been dropped (18 statement earlier) -> now drop the rest of the Array
                    cardofdraggableArray = draggableArray[dragColumnNumber][loopingDraggableArrayNumber];
                    performDropOnPlayfield(cardofdraggableArray, dropDivIDCardNumber, dropColumnNumber);
                    $("#card" + cardofdraggableArray).css("opacity", "1"); //card completely visible again
                    //$("#card" + cardofdraggableArray).addClass("shadow");
                    $("#card" + cardofdraggableArray).css("z-index", parseInt($("#card" + cardsArray[cardofdraggableArray].highercard).css("z-Index")) + 1);

                    dropDivIDCardNumber = draggableArray[dragColumnNumber][loopingDraggableArrayNumber];
                    loopingDraggableArrayNumber--;
                }

                //update the draggableArray of the drag column                
                refreshDraggableArray(dragColumnNumber, dragHigherCard);
            }
            else {
                //the draggableArray of the drag column is 1, so the draggableArray must be reinitiated
                performDropOnPlayfield(dragDivIDCardNumber, dropDivIDCardNumber, dropColumnNumber);
                //draggableArray[dragColumnNumber][0] = dragHigherCard; //replace the single item of the draggableArray in the drag column with the highercard
                refreshDraggableArray(dragColumnNumber, dragHigherCard); //replace the single item of the draggableArray in the drag column with the highercard
            }
        }
        else {
            //card dragged from hand to playfield (there is only a dropcolumn)
            performDropOnPlayfield(dragDivIDCardNumber, dropDivIDCardNumber, dropColumnNumber);
        }
    }
    else {
        //drop is not allowed
        if (dragDivIDCardNumber == dropDivIDCardNumber) {
            showNotification("You can only drop a card on another column.");
        } else if (cardsArray[dragDivIDCardNumber].rank == constantKing) {
            showNotification("You may only drop a king on an empty column.");
        } else {
            var cardRank = getRankName(cardsArray[dragDivIDCardNumber].rank);
            var higherCardRank = getRankName(cardsArray[dragDivIDCardNumber].rank + 1);
            var cardColor;
            var oppositeColor;
            if (cardsArray[dragDivIDCardNumber].color == constantBlack) {
                cardColor = "black";
                oppositeColor = "red";
            } else {
                cardColor = "red";
                oppositeColor = "black";
            }
            showNotification("You may only drop this " + cardColor + " " + cardRank + " <br/>on a column with a " + oppositeColor + " " + higherCardRank + ".");
        }

        setCardBack(dragDivIDCardNumber, dragColumnNumber, dragHigherCard);
    }
    //drop or no drop : undo all actions from function drag()
    $("#card" + dragDivIDCardNumber).css("opacity", "1"); //card completely visible again
    //$("#card" + dragDivIDCardNumber).addClass("shadow");
    $("#card" + dragDivIDCardNumber).removeClass("drag_shadow");

} //end of dropCardOnPlayfield()

function dropallowed(passedForCheckdragDivIDCardNumber, passedForCheckDropDivIDCardNumber) {
    if ((passedForCheckDropDivIDCardNumber == -1)) { // -1 means : king dropped on empty column //) || $("#dropallowedcheckbox").is(":checked"
        return true;
    }
    else {
        return (cardsArray[passedForCheckdragDivIDCardNumber].color != cardsArray[passedForCheckDropDivIDCardNumber].color && cardsArray[passedForCheckdragDivIDCardNumber].rank == (cardsArray[passedForCheckDropDivIDCardNumber].rank - 1))
        //return (cardsArray[passedForCheckdragDivIDCardNumber].rank == (cardsArray[passedForCheckDropDivIDCardNumber].rank - 1))
    }
}

function performDropOnPlayfield(passeddragDivIDCardNumber, passedDropDivIDCardNumber, dropColumnNumber) {
    //drop is allowed, now do the actual drop (and stay)
    var cardTopMargin = constantCardHeightInterspace;
    var loopingPileNumber = 0;

    if (intSoundsOn) {        
        $('#card_drop_sound').clone()[0].play(); //is dit vertragend? performance
    }

    if (passedDropDivIDCardNumber == -1) {
        //special indication : King dropped in an empty column
        var kingLeft = constantPlayfieldLeftmargin + (dropColumnNumber * (constantCardWidth + constantCardWidthInterspace)); //here the + means "add numbers"
        $("#card" + passeddragDivIDCardNumber).css("left", kingLeft + "px");                //here the + means "concatenate strings"
        $("#card" + passeddragDivIDCardNumber).css("top", constantPlayfieldTopmargin + "px");
        $("#card" + passeddragDivIDCardNumber).css("z-index", 0);
        $("#card" + passeddragDivIDCardNumber).css("opacity", "1"); //(king) card completely visible again 
        //$("#card" + passeddragDivIDCardNumber).addClass("shadow");
    }
    else {
        //dropped on an actual card
        if (numberOfCardsInColumn[dropColumnNumber] > 15) {
            //less margin for long columns, to avoid running into HANDS
            cardTopMargin = constantCardHeightInterspace / 2;
        }
        //dropColumnNumber = cardsArray[passedDropDivIDCardNumber].columnNumber;
        $("#card" + passeddragDivIDCardNumber).css("left", $("#card" + passedDropDivIDCardNumber).css("left")); //.offsetLeft + "px";
        $("#card" + passeddragDivIDCardNumber).css("top", parseInt($("#card" + passedDropDivIDCardNumber).css("top")) + cardTopMargin + "px");
        $("#card" + passeddragDivIDCardNumber).css("z-index", parseInt($("#card" + passedDropDivIDCardNumber).css("z-index")) + 1); //card really completely visible again, because it is in front of the higher card
    }

    // Insert The New Card At The Beginning Of The drop Array. this method always works correctly, no matter how short the array is.
    draggableArray[dropColumnNumber].splice(0, 0, passeddragDivIDCardNumber);

    if ($("#card" + passeddragDivIDCardNumber).hasClass("card_in_hand")) { //dragged from hands to playfield        
        //get the card_in_hand-card out of #hands and into #playfield
        $("#playfield").append($("#card" + passeddragDivIDCardNumber));
        //set appropriate css class & event
        $("#card" + passeddragDivIDCardNumber).removeClass("card_in_hand");
        $("#card" + passeddragDivIDCardNumber).addClass("card_on_playfield"); //already contains class draggable
        //set some new values
        handIsOccupiedArray[cardsArray[passeddragDivIDCardNumber].positioninhand] = false;
    }
    else if ($("#card" + passeddragDivIDCardNumber).hasClass("card_on_pile")) { //dragged from pile to playfield
        //get the card out of #pile and into #playfield
        $("#playfield").append($("#card" + passeddragDivIDCardNumber));
        //set appropriate css class & event
        $("#card" + passeddragDivIDCardNumber).removeClass("card_on_pile");
        $("#card" + passeddragDivIDCardNumber).addClass("card_on_playfield"); //already contains class draggable
        //set some new values
        //first find out on which pile the card was
        while (loopingPileNumber < 8 && pilesArray[loopingPileNumber] != passeddragDivIDCardNumber) {
            loopingPileNumber++;
        }
        pilesArray[loopingPileNumber] = cardsArray[passeddragDivIDCardNumber].highercard; // top of the pile is the previous card
    }
    else {
        // dragged from playfield to playfield, so update stuff for dragged column
        //the number of cards in the draggable Array is 1 less
        numberOfCardsInColumn[cardsArray[passeddragDivIDCardNumber].columnNumber]--;
        //the card, higher than the dragged card, must now be draggable
        $("#card" + cardsArray[passeddragDivIDCardNumber].highercard).addClass("draggable");
    }

    //these new values must be updated as late as possible, but always for dragged to playfield
    cardsArray[passeddragDivIDCardNumber].highercard = passedDropDivIDCardNumber; //in case of King in empty column, highercard gets value -1
    cardsArray[passeddragDivIDCardNumber].columnNumber = dropColumnNumber;
    cardsArray[passeddragDivIDCardNumber].rowNumber = numberOfCardsInColumn[dropColumnNumber]; //not equal to the new number of cards, but 1 less! see next statement
    numberOfCardsInColumn[dropColumnNumber]++;
}

function refreshDraggableArray(columnNumber, passedHighestCard) {
    if (passedHighestCard != null) {
        draggableArray[columnNumber] = []; //empty the array of the drag column                
        draggableArray[columnNumber][0] = passedHighestCard;
    }
    //the first item is always draggable MOET DIT in bovenstaande if ?
    $("#card" + draggableArray[columnNumber][0]).addClass("draggable");
    
    var loopingDraggableArrayNumber = 0;
    //$("#card" + draggableArray[columnNumber][0]).addClass("GO"); // wat is dit? kan dit weg?

    //now check if the new draggable Array is an Array of more than 1 card
    //we only have to check this, until the one BEFORE the last, because, if dropallowed, we add the highercard to the Array.
    while (loopingDraggableArrayNumber < (numberOfCardsInColumn[columnNumber]-1) && dropallowed(draggableArray[columnNumber][loopingDraggableArrayNumber], cardsArray[draggableArray[columnNumber][loopingDraggableArrayNumber]].highercard)) {
        //fill the array
        draggableArray[columnNumber].push(cardsArray[draggableArray[columnNumber][loopingDraggableArrayNumber]].highercard);        
        //continue to the higher card
        loopingDraggableArrayNumber++;
        $("#card" + draggableArray[columnNumber][loopingDraggableArrayNumber]).addClass("draggable");
        //$("#card" + draggableArray[columnNumber][loopingDraggableArrayNumber]).addClass("GO"); // wat is dit? kan dit weg? 
        //$("#drag1").multiDraggable({ group: [$("#drag1"), $("#drag2")] });
    }
} //refreshDraggableArray()

function droponhand(e) {
    //from hand/playfield to hand
    var dragDivIDCardNumber;
    var dropColumnNumber;
    var dragColumnNumber;
    var cardPositionInHandCounter; // to search the first unoccupied position in the hand
    var loopingDraggableArrayNumber;

    var target = e.target || e.srcElement;
    dragDivIDCardNumber = target.id.slice(4);
   
    if ($("#card" + dragDivIDCardNumber).hasClass("card_in_hand")) {
        $("#card" + dragDivIDCardNumber).css("left", originalCardLeft);
        $("#card" + dragDivIDCardNumber).css("top", originalCardTop);
        
        if (intSoundsOn) {
            $('#card_drop_sound').clone()[0].play();
        }
    }
    else {
        //from playfield to hand
        dragColumnNumber = cardsArray[dragDivIDCardNumber].columnNumber;
        if (dragDivIDCardNumber == draggableArray[dragColumnNumber][0]) {
            //the lowest card of the Array
            //search the first unoccupied position in the hand
            cardPositionInHandCounter = 0;
            while (cardPositionInHandCounter < maxCardsinHand && handIsOccupiedArray[cardPositionInHandCounter]) {
                cardPositionInHandCounter++;
            }

            if (cardPositionInHandCounter < maxCardsinHand) {
                //PerformDrop from playfield to hand because the unoccupied position is 0, 1, 2 or 3
                if (intSoundsOn) {
                    $('#card_drop_sound').clone()[0].play();
                }
                
                numberOfCardsInColumn[dragColumnNumber]--;

                // remove The old Card from The Beginning Of The dragged column Array
                if (draggableArray[dragColumnNumber].length > 1 || numberOfCardsInColumn[dragColumnNumber] == 0) {
                    //the dragged card is part of an Array -> the lowest item must be removed from the Array
                    draggableArray[dragColumnNumber].splice(0, 1);
                }
                else {
                    //draggable Array consisted of 1 single card and will now consist of the higher card
                    if (numberOfCardsInColumn[dragColumnNumber] > 0) {
                        //there are still cards left in the dragcolumn
                        refreshDraggableArray(dragColumnNumber, cardsArray[dragDivIDCardNumber].highercard);
                    }
                }
                //get the card out of #playfield and into #hands 
                $("#hands").append($("#card" + dragDivIDCardNumber));
                //set appropriate css class & event
                $("#card" + dragDivIDCardNumber).removeClass("card_on_playfield");
                $("#card" + dragDivIDCardNumber).addClass("card_in_hand"); //it is already draggable, obviously

                //dragDiv.setAttribute('ondrop', "droponhand(event, " + dragDivIDCardNumber + ")");
                //set new position                
                $("#card" + dragDivIDCardNumber).css("left", constantHandLeftMargin + (cardPositionInHandCounter * (constantCardWidth + constantCardWidthInterspace + constantHandCardMargin)));
                $("#card" + dragDivIDCardNumber).css("top", 2); // 2 pixels because of the edge in the background image
                //the z-index does not have to be changed ; it will be (re)set whenever card is dropped in playfield

                //set some new values
                cardsArray[dragDivIDCardNumber].positioninhand = cardPositionInHandCounter;
                handIsOccupiedArray[cardPositionInHandCounter] = true;
                if (numberOfCardsInColumn[cardsArray[dragDivIDCardNumber].columnNumber] == 0 && cardsArray[dragDivIDCardNumber].rank == constantKing) {
                    //the dragged card was a king-in-place
                    numberOfKingsDroppedInPlace--;
                }
            }
            else {
                //droponhand not allowed, because the hand is full
                showNotification("You may only drop a card in the hand, <br/>if there is an empty spot.");
                setCardBack(dragDivIDCardNumber, dragColumnNumber, cardsArray[dragDivIDCardNumber].highercard);
            }
        }
        else {
            //droponhand not allowed, because it is not the lowest card in the Array
            showNotification("You may only drop the lowest card of a column in the hand.");
            setCardBack(dragDivIDCardNumber, dragColumnNumber, cardsArray[dragDivIDCardNumber].highercard);
        }
    }

    //drop or no drop : undo all actions from function drag()
    $("#card" + dragDivIDCardNumber).css("opacity", "1"); //card completely visible again 
    //$("#card" + dragDivIDCardNumber).addClass("shadow");
    $("#card" + dragDivIDCardNumber).removeClass("drag_shadow");
} //droponhand

function droponpile(e) {    
    var dragDivIDCardNumber;
    var dragColumnNumber;
    var cardPositionInHandCounter;
    var loopingPileNumber = 0;
    var loopingDraggableArrayNumber;

    var target = e.target || e.srcElement;
    dragDivIDCardNumber = target.id.slice(4);
    //if (source_node.target.id = 'piles') {
    //dragDivIDCardNumber = source_node.dataTransfer.getData("Text"); //get the ID of the passed parameter. en nog andere data?
    //}
    //else {
    //    dragDivIDCardNumber = source_node.target.id;//source_node.dataTransfer.getData("Text"); //get the ID of the passed parameter. en nog andere data?
    //}

    //check if the card is already on a pile
    if ($("#card" + dragDivIDCardNumber).hasClass("card_on_pile")) {
        setCardBack(dragDivIDCardNumber, dragColumnNumber, cardsArray[dragDivIDCardNumber].highercard);
    }
    else { //card is from hand or playfield
        if ($("#card" + dragDivIDCardNumber).hasClass("card_on_playfield")) {
            dragColumnNumber = cardsArray[dragDivIDCardNumber].columnNumber;
        }

        if (cardsArray[dragDivIDCardNumber].rank == 1) {
            //card_on_playfield is ace : look for an empty pile -> will always find one!
            while (loopingPileNumber < 8 && pilesArray[loopingPileNumber] != -1) {
                loopingPileNumber++;
            }

            //PerformDrop on pile
            if (intSoundsOn) {
                $('#card_drop_sound').clone()[0].play();
            }
        
            if ($("#card" + dragDivIDCardNumber).hasClass("card_on_playfield")) {
                //card dragged from playfield to pile
                $("#card" + dragDivIDCardNumber).removeClass("card_on_playfield");
                numberOfCardsInColumn[dragColumnNumber]--;

                // remove The old Card from The Beginning Of The dragged column Array
                if (draggableArray[dragColumnNumber].length > 1 || numberOfCardsInColumn[dragColumnNumber] == 0) {
                    //the dragged card is part of an Array -> the lowest item must be removed from the Array
                    draggableArray[dragColumnNumber].splice(0, 1);
                }
                else {
                    //draggable Array consisted of 1 single card and will now consist of the higher card
                    //draggableArray[dragColumnNumber][0] = cardsArray[dragDivIDCardNumber].highercard;
                    //$("#card" + cardsArray[dragDivIDCardNumber].highercard).addClass("draggable"); hertesten
                    if (numberOfCardsInColumn[dragColumnNumber] > 0) {
                        //there are still cards left in the dragcolumn
                        refreshDraggableArray(dragColumnNumber, cardsArray[dragDivIDCardNumber].highercard);
                    }
                }
            }
            else {
                $("#card" + dragDivIDCardNumber).removeClass("card_in_hand");
                handIsOccupiedArray[cardsArray[dragDivIDCardNumber].positioninhand] = false;
            }

            $("#piles").append($("#card" + dragDivIDCardNumber));
            $("#card" + dragDivIDCardNumber).addClass("card_on_pile");
            $("#card" + dragDivIDCardNumber).removeClass("draggable"); //final destination : an ace is no longer draggable 

            //set some new values
            //cardsArray[dragDivIDCardNumber].highercard = -1; //the ace is never dragged away
            pilesArray[loopingPileNumber] = dragDivIDCardNumber;

            // MAKE TWO ROWS IN CASE OF LANDSCAPE MODE : intMaxPilesInOneColumn = 4 (in portraitmode (not implemented) intMaxPilesInOneColumn is 8 = all aces are shown in 1 column & switch ace_background_new.png)
            if (loopingPileNumber < intMaxPilesInOneColumn) { //the 1st column / left column
                $("#card" + dragDivIDCardNumber).css("left", 1); //(document.getElementById('piles').offsetLeft + (loopingPileNumber * constantCardWidth)).toString() + "px";
                $("#card" + dragDivIDCardNumber).css("top", loopingPileNumber * (constantCardHeight + 9) + 2);//2 extra pixels because the background image contains edges
                $("#card" + dragDivIDCardNumber).css("z-Index", 1); //ace may have very low zIndex
            } else { //the 2nd column / right column
                $("#card" + dragDivIDCardNumber).css("left", constantCardWidth + constantCardWidthInterspace + 1); //(document.getElementById('piles').offsetLeft + (loopingPileNumber * constantCardWidth)).toString() + "px";
                $("#card" + dragDivIDCardNumber).css("top", (loopingPileNumber - intMaxPilesInOneColumn) * (constantCardHeight + 9) + 2);//(document.getElementById('piles').offsetTop).toString() + "px";
                $("#card" + dragDivIDCardNumber).css("z-Index", 1); //ace may have very low zIndex
            }
        }
        else {
            //card is higher than an ace -> look for a corresponding pile
            while (loopingPileNumber < 8 && pilesArray[loopingPileNumber] > -1 && (cardsArray[dragDivIDCardNumber].suit != cardsArray[pilesArray[loopingPileNumber]].suit || cardsArray[dragDivIDCardNumber].rank != (cardsArray[pilesArray[loopingPileNumber]].rank + 1))) {
                //search only 8 spots  && search only spots with at least an ace &&
                loopingPileNumber++;
            }

            if (loopingPileNumber < 8 && pilesArray[loopingPileNumber] > -1) {
                //corresponding pile found ; PerformDrop
                if (intSoundsOn) {
                    $('#card_drop_sound').clone()[0].play();
                    //$('#card_drop_sound').trigger('play');
                }

                if ($("#card" + dragDivIDCardNumber).hasClass("card_on_playfield")) {
                    //card dragged from playfield to pile
                    numberOfCardsInColumn[dragColumnNumber]--;
                    $("#card" + dragDivIDCardNumber).removeClass("card_on_playfield");
                    //remove The old Card from The Beginning Of The dragged column Array
                    if (draggableArray[dragColumnNumber].length > 1 || numberOfCardsInColumn[dragColumnNumber] == 0) {
                        //the dragged card is part of an Array -> the lowest item must be removed from the Array
                        draggableArray[dragColumnNumber].splice(0, 1);
                    }
                    else {
                        //draggable Array consisted of 1 single card and will now consist of the higher card
                        if (numberOfCardsInColumn[dragColumnNumber] > 0) {
                            //there are still cards left in the dragcolumn
                            refreshDraggableArray(dragColumnNumber, cardsArray[dragDivIDCardNumber].highercard);
                        }
                    }
                }

                if ($("#card" + dragDivIDCardNumber).hasClass("card_in_hand")) {
                    $("#card" + dragDivIDCardNumber).removeClass("card_in_hand");
                    handIsOccupiedArray[cardsArray[dragDivIDCardNumber].positioninhand] = false; //free a spot in the hand
                }

                //get the card out of #hand or #playfield and into #pile
                $("#piles").append($("#card" + dragDivIDCardNumber));
                //set appropriate css class & event
                $("#card" + dragDivIDCardNumber).addClass("card_on_pile");
                if (!allowDragfrompile) $("#card" + dragDivIDCardNumber).removeClass("draggable"); //**** TEST IN-APP PURCHASE ***

                //set new position
                $("#card" + dragDivIDCardNumber).css("left", $("#card" + pilesArray[loopingPileNumber]).css("left"));
                $("#card" + dragDivIDCardNumber).css("top", $("#card" + pilesArray[loopingPileNumber]).css("top"));
                $("#card" + dragDivIDCardNumber).css("z-Index", parseInt($("#card" + pilesArray[loopingPileNumber]).css("z-index")) + 1); //one higher than previous card on this pile

                //set some new values
                $("#card" + cardsArray[dragDivIDCardNumber].highercard).addClass("draggable");
                if (cardsArray[dragDivIDCardNumber].rank == constantKing && originalCardzIndex != 0) { //hertesten 07-04-2013
                    numberOfKingsDroppedInPlace++
                    checkGameEnd();
                }
                //reset some old values
                cardsArray[dragDivIDCardNumber].columnNumber = -1;
                cardsArray[dragDivIDCardNumber].rowNumber = -1;
                //set some new values
                cardsArray[dragDivIDCardNumber].highercard = pilesArray[loopingPileNumber]; //remember the higher card in the pile, because the highest card may be dragged away
                pilesArray[loopingPileNumber] = dragDivIDCardNumber;
            }
            else {
                //droponpile not allowed
                var cardRank = getRankName(cardsArray[dragDivIDCardNumber].rank);
                var lowerCardRank = getRankName(cardsArray[dragDivIDCardNumber].rank - 1);
                showNotification("You may only drop this " + cardRank + " of " + cardsArray[dragDivIDCardNumber].suit + "<br/> on a pile with a " + lowerCardRank + " of " + cardsArray[dragDivIDCardNumber].suit + ".");
                setCardBack(dragDivIDCardNumber, dragColumnNumber, cardsArray[dragDivIDCardNumber].highercard);
            }
        }
    }
    $("#card" + dragDivIDCardNumber).css("opacity", "1");
    //$("#card" + dragDivIDCardNumber).addClass("shadow");
    $("#card" + dragDivIDCardNumber).removeClass("drag_shadow");
}

function getRankName(requestedRank) {
    if (requestedRank == 1) {
        requestedRank = "ace";
    } else if (requestedRank == 11) {
        requestedRank = "jack";
    } else if (requestedRank == 12) {
        requestedRank = "queen";
    } else if (requestedRank == 13) {
        requestedRank = "king";
    }
    return requestedRank;
}

function setCardBack(passeddragDivIDCardNumber, passedDragColumnNumber, passedHigherCard) {    
    var loopingDraggableArrayNumber = 0;

    if (intSoundsOn) {
        $('#card_drop_sound').clone()[0].play();
    }
    
    $("#card" + passeddragDivIDCardNumber).css("left", originalCardLeft);
    $("#card" + passeddragDivIDCardNumber).css("top", originalCardTop);
    if ($("#card" + passeddragDivIDCardNumber).hasClass("card_on_playfield")) {
        if (originalCardzIndex == 0) {            
            $("#card" + passeddragDivIDCardNumber).css("z-Index", 0);
        }
        else {
            //1 higher than the higher card //als je snel dragt, gaat dit soms fout....
            $("#card" + passeddragDivIDCardNumber).css("z-Index", parseInt($("#card" + passedHigherCard).css("z-index")) + 1);
        }

        while (loopingDraggableArrayNumber < draggableArray[passedDragColumnNumber].length) {
            $("#card" + draggableArray[passedDragColumnNumber][loopingDraggableArrayNumber]).css("opacity", "1");
            //$("#card" + draggableArray[passedDragColumnNumber][loopingDraggableArrayNumber]).addClass("shadow");
            loopingDraggableArrayNumber++;
        }
    }
}

//DESCRIPTION   : EACH ARRAY ITEM IS AN OBJECT
function initiateDeck(passedDeckArray) {    
    passedDeckArray[0] = { 'filename': 'KING_C.png', 'color': constantBlack, 'suit': 'clubs', 'rank': 13 };
    passedDeckArray[1] = { 'filename': 'KING_D.png', 'color': constantRed, 'suit': 'diamonds', 'rank': 13 };
    passedDeckArray[2] = { 'filename': 'KING_H.png', 'color': constantRed, 'suit': 'hearts', 'rank': 13 };
    passedDeckArray[3] = { 'filename': 'KING_S.png', 'color': constantBlack, 'suit': 'spades', 'rank': 13 };
    passedDeckArray[4] = { 'filename': 'QUEEN_C.png', 'color': constantBlack, 'suit': 'clubs', 'rank': 12 };
    passedDeckArray[5] = { 'filename': 'QUEEN_D.png', 'color': constantRed, 'suit': 'diamonds', 'rank': 12 };
    passedDeckArray[6] = { 'filename': 'QUEEN_H.png', 'color': constantRed, 'suit': 'hearts', 'rank': 12 };
    passedDeckArray[7] = { 'filename': 'QUEEN_S.png', 'color': constantBlack, 'suit': 'spades', 'rank': 12 };
    passedDeckArray[8] = { 'filename': 'JACK_C.png', 'color': constantBlack, 'suit': 'clubs', 'rank': 11 };
    passedDeckArray[9] = { 'filename': 'JACK_D.png', 'color': constantRed, 'suit': 'diamonds', 'rank': 11 };
    passedDeckArray[10] = { 'filename': 'JACK_H.png', 'color': constantRed, 'suit': 'hearts', 'rank': 11 };
    passedDeckArray[11] = { 'filename': 'JACK_S.png', 'color': constantBlack, 'suit': 'spades', 'rank': 11 };
    passedDeckArray[12] = { 'filename': 'TEN_C.png', 'color': constantBlack, 'suit': 'clubs', 'rank': 10 };
    passedDeckArray[13] = { 'filename': 'TEN_D.png', 'color': constantRed, 'suit': 'diamonds', 'rank': 10 };
    passedDeckArray[14] = { 'filename': 'TEN_H.png', 'color': constantRed, 'suit': 'hearts', 'rank': 10 };
    passedDeckArray[15] = { 'filename': 'TEN_S.png', 'color': constantBlack, 'suit': 'spades', 'rank': 10 };
    passedDeckArray[16] = { 'filename': 'NINE_C.png', 'color': constantBlack, 'suit': 'clubs', 'rank': 9 };
    passedDeckArray[17] = { 'filename': 'NINE_D.png', 'color': constantRed, 'suit': 'diamonds', 'rank': 9 };
    passedDeckArray[18] = { 'filename': 'NINE_H.png', 'color': constantRed, 'suit': 'hearts', 'rank': 9 };
    passedDeckArray[19] = { 'filename': 'NINE_S.png', 'color': constantBlack, 'suit': 'spades', 'rank': 9 };
    passedDeckArray[20] = { 'filename': 'EIGHT_C.png', 'color': constantBlack, 'suit': 'clubs', 'rank': 8 };
    passedDeckArray[21] = { 'filename': 'EIGHT_D.png', 'color': constantRed, 'suit': 'diamonds', 'rank': 8 };
    passedDeckArray[22] = { 'filename': 'EIGHT_H.png', 'color': constantRed, 'suit': 'hearts', 'rank': 8 };
    passedDeckArray[23] = { 'filename': 'EIGHT_S.png', 'color': constantBlack, 'suit': 'spades', 'rank': 8 };
    passedDeckArray[24] = { 'filename': 'SEVEN_C.png', 'color': constantBlack, 'suit': 'clubs', 'rank': 7 };
    passedDeckArray[25] = { 'filename': 'SEVEN_D.png', 'color': constantRed, 'suit': 'diamonds', 'rank': 7 };
    passedDeckArray[26] = { 'filename': 'SEVEN_H.png', 'color': constantRed, 'suit': 'hearts', 'rank': 7 };
    passedDeckArray[27] = { 'filename': 'SEVEN_S.png', 'color': constantBlack, 'suit': 'spades', 'rank': 7 };
    passedDeckArray[28] = { 'filename': 'SIX_C.png', 'color': constantBlack, 'suit': 'clubs', 'rank': 6 };
    passedDeckArray[29] = { 'filename': 'SIX_D.png', 'color': constantRed, 'suit': 'diamonds', 'rank': 6 };
    passedDeckArray[30] = { 'filename': 'SIX_H.png', 'color': constantRed, 'suit': 'hearts', 'rank': 6 };
    passedDeckArray[31] = { 'filename': 'SIX_S.png', 'color': constantBlack, 'suit': 'spades', 'rank': 6 };
    passedDeckArray[32] = { 'filename': 'FIVE_C.png', 'color': constantBlack, 'suit': 'clubs', 'rank': 5 };
    passedDeckArray[33] = { 'filename': 'FIVE_D.png', 'color': constantRed, 'suit': 'diamonds', 'rank': 5 };
    passedDeckArray[34] = { 'filename': 'FIVE_H.png', 'color': constantRed, 'suit': 'hearts', 'rank': 5 };
    passedDeckArray[35] = { 'filename': 'FIVE_S.png', 'color': constantBlack, 'suit': 'spades', 'rank': 5 };
    passedDeckArray[36] = { 'filename': 'FOUR_C.png', 'color': constantBlack, 'suit': 'clubs', 'rank': 4 };
    passedDeckArray[37] = { 'filename': 'FOUR_D.png', 'color': constantRed, 'suit': 'diamonds', 'rank': 4 };
    passedDeckArray[38] = { 'filename': 'FOUR_H.png', 'color': constantRed, 'suit': 'hearts', 'rank': 4 };
    passedDeckArray[39] = { 'filename': 'FOUR_S.png', 'color': constantBlack, 'suit': 'spades', 'rank': 4 };
    passedDeckArray[40] = { 'filename': 'THREE_C.png', 'color': constantBlack, 'suit': 'clubs', 'rank': 3 };
    passedDeckArray[41] = { 'filename': 'THREE_D.png', 'color': constantRed, 'suit': 'diamonds', 'rank': 3 };
    passedDeckArray[42] = { 'filename': 'THREE_H.png', 'color': constantRed, 'suit': 'hearts', 'rank': 3 };
    passedDeckArray[43] = { 'filename': 'THREE_S.png', 'color': constantBlack, 'suit': 'spades', 'rank': 3 };
    passedDeckArray[44] = { 'filename': 'TWO_C.png', 'color': constantBlack, 'suit': 'clubs', 'rank': 2 };
    passedDeckArray[45] = { 'filename': 'TWO_D.png', 'color': constantRed, 'suit': 'diamonds', 'rank': 2 };
    passedDeckArray[46] = { 'filename': 'TWO_H.png', 'color': constantRed, 'suit': 'hearts', 'rank': 2 };
    passedDeckArray[47] = { 'filename': 'TWO_S.png', 'color': constantBlack, 'suit': 'spades', 'rank': 2 };
    passedDeckArray[48] = { 'filename': 'ACE_C.png', 'color': constantBlack, 'suit': 'clubs', 'rank': 1 };
    passedDeckArray[49] = { 'filename': 'ACE_D.png', 'color': constantRed, 'suit': 'diamonds', 'rank': 1 };
    passedDeckArray[50] = { 'filename': 'ACE_H.png', 'color': constantRed, 'suit': 'hearts', 'rank': 1 };
    passedDeckArray[51] = { 'filename': 'ACE_S.png', 'color': constantBlack, 'suit': 'spades', 'rank': 1 };
}

//GAME END
function checkGameEnd() {
    if (numberOfKingsDroppedInPlace == 8) {
        //Play Game Winning Sound
        $('#game_end_sound').trigger('play');

        //Build The Message
        clearInterval(timerIDmustbeglobal);
        message = /*"<center>*/"<br/><h3>You have reached the goal of Patience Max.<br/><br/><br/>Many activities appear to be simple, <br/>but to completely master them is a challenge.<br/></h3>"/*</center>"*/
        $('#notification_message_sp_game_end').html(message);
     
        //Fade the Message
        $('#notification_message_sp_game_end').fadeIn(function () {
            timerIDmustbeglobal = setTimeout(function () {
                //$('#notification_message_sp_game_end').fadeOut(600).delay(600); //.slideUp(function () { });
            }, 6500);
        });

        //why wait here (Slowly Fade Game Playfield To Black)
        setTimeout(function () {
            //$('#picLoading').fadeIn(500).delay(1600).fadeOut(6500);
            //$('#playfield').fadeOut(2500).delay(2600);
            //$('#menu').fadeOut(0).delay(1600);
                   ClearPlayfieldAndReload();
        }, 8500);

    }
}

//MENU FUNCTIONS
function showDroppability(showRank) {    
    $.each(cardsArray, function (cardID, card) {
        if (card.rank == showRank) {
            $("#card" + cardID).addClass("droppable_highlight");
            $("#card" + cardID).css("border-color",arrayHighlightColors[showRank]);
        }
    });
}

function hideDroppability(hideRank) {
    //removes highlights of all cards everywhere, of a certain rank
    $.each(cardsArray, function (cardID, card) {
        if (card.rank == hideRank) {
            $("#card" + cardID).removeClass("droppable_highlight");
        }
    });
}

function loadGame(gameToBeLoaded) {
    var loopingCardNumber = 0;
    var loopingColumnNumber = 0;

    //OVERRIDE GLOBAL VARIABLES
    loadedGame = JSON.parse(localStorage[gameToBeLoaded]);    
    cardsArray = loadedGame["cardsArray"];
    handIsOccupiedArray = loadedGame["handIsOccupiedArray"];
    pilesArray = loadedGame["pilesArray"];
    draggableArray = loadedGame["draggableArray"];
    numberOfKingsDroppedInPlace = loadedGame["numberOfKingsDroppedInPlace"];
    numberOfCardsInColumn = loadedGame["numberOfCardsInColumn"];

    $('#playfield').html(loadedGame["playfield"]);
    $('#hands').html(loadedGame["hands"]);
    $('#piles').html(loadedGame["piles"]);

    declareMenuBarToggle(); //ik weet niet of dit beter kan...
    declareRefreshClick();
}
//end of MENU FUNCTIONS

function saveToStorage(saveID, data) {
    localStorage[saveID] = /*window.*/JSON.stringify(data); //this is the memory of the user's device
}

// FUNCTION TO START NEW GAME IN AN ANIMATED WAY
function ClearPlayfieldAndReload() {
    //localStorage.skipgameintro = true;
    //the duration of this sequence depends on HIGHEST delay-value
    var cardDuration = intRefreshSpeed * 800;
    var otherDuration = cardDuration + 30; //for the other html elements
    var reloadDuration = otherDuration + 20; //for the reload-call

    //CLEAN THE PLAYFIELD IN A FANCY WAY
    for (loopingCardNumber = 0; loopingCardNumber <= 104; loopingCardNumber++) {
        loopingColumnNumber = Math.floor(loopingCardNumber / 10) // operand "DIV"
        loopingRowNumber = loopingCardNumber % 10; //modulus : remove all 10s
        //$("#card" + loopingCardNumber).transition({ scale: [40.0, 38.5], duration: 4500 });
        $("#card" + loopingCardNumber).transition({ left: loopingColumnNumber - 950, duration: cardDuration });
        $("#card" + loopingCardNumber).transition({ top: loopingRowNumber, duration: cardDuration });
    }

    $('#playfield').fadeOut(otherDuration).delay(otherDuration);
    $('#menu').fadeOut(0).delay(otherDuration);
    $('#notification_message_sp').fadeOut(0).delay(otherDuration);
    //$('#notification_sp').fadeOut(0).delay(otherDuration);
    
    setTimeout(function () {
        location.reload(); //this will trigger buildTheGamefield()
    }, reloadDuration);
}

function declareRefreshClick() {
    $('#refresh_button').on('click', function () {
        ClearPlayfieldAndReload();
    });
}

/*$('#end_game_new_game').click(function () {
    $('#game_end').hide('slow', function () {
        $('#menu_button').trigger('click'); //close the menu
        ClearPlayfieldAndReload();        
     });
});*/

$('#new_game').click(function () {
    ClearPlayfieldAndReload();
    //blnSkipGameIntro = true;
});

$('#load_game').click(function () {
    if (localStorage.length > 1) {        //check if there are loadbable games. there is always at least 1 saved item : PatienceSettings
        $("#loadgamedialog").html('<h1>Load Game</h1><br /><h2>Which game would you like to load?</h2>');
        //fill the rest of the modal dialog with loadable games
        var intSavedGamesCounter = 1; //to show a numbered list
        $.each(localStorage, function (savedGameID, savedGame) {
            if (localStorage.key(savedGameID).substring(0,("PatienceMaxGame").length) == "PatienceMaxGame") {
                //$('<div class="loadablegames simplemodal-close" style="display:block;margin-bottom:10px;" id="' + localStorage.key(savedGameID) + '">&nbsp;' + localStorage.key(savedGameID) + '</div>').insertBefore('#anchorforsavedgameslist');                
                $("#loadgamedialog").append('<div class="loadablegames simplemodal-close" style="display:block;margin-bottom:10px;" id="' + localStorage.key(savedGameID) + '">&nbsp;<b>' + intSavedGamesCounter++ + ')</b>&nbsp;' + localStorage.key(savedGameID).slice(("PatienceMaxGame").length).toUpperCase() + '</div>');//.insertBefore('#anchorforsavedgameslist'); 
            }
        });
    } else {
        $("#loadgamedialog").css('display', 'block');
        $("#loadgamedialog").html('<h1>Load Game</h1><i>Sorry there are no loadable games at this time.</i>');
    }

    $('#loadgamedialog').modal();

    //$('#loadgamedialog').removeChild($("#loadablegamesform")); //clean up, next time may be a different list ... help? deze moet zeker als de modal gesloten is, maar daar hebben we nog geen event voor...
});

$.fn.loadablegames = function () {
    var klik = function (e) {
        loadGame(e.target.id);

        //deze doet het wel, maar er is (natuurlijk) een dubbele aanroep nodig, omdat declareMenuBarToggle er vanuit gaat dat het menu gesloten begint.
        $('#menu_button').trigger('click'); //close the menu
        $('#menu_button').trigger('click'); //close the menu
       }
    this.live("click", klik);
}
$(".loadablegames").loadablegames(); //link the onclick event to every element with class .loadablegames including future elements //waarom staat dit hier? misschien logischer na jquery draggable events

$('#delete_game').click(function () {
    if (localStorage.length > 1) {
        $(".deletablegames").remove(); //deze functie haalt de input tags weg, maar laat de text/inhoud staan. suf hoor. SUF? je removed de class met die aanroep
        $("#deletegamedialog").html('<h1>Delete Game</h1><br /><h2>Which game would you like to delete?</h2>');

        //start inserting html to show list of loadable games
        var intSavedGamesCounter = 1;
        $.each(localStorage, function (savedGameID, savedGame) {
            if (localStorage.key(savedGameID) != "PatienceSettings") {
                $("#deletegamedialog").append('<div class="deletablegames simplemodal-close" style="display:block;margin-bottom:10px;" id="' + localStorage.key(savedGameID) + '">&nbsp;<b>' + intSavedGamesCounter++ + ')</b>&nbsp;' + localStorage.key(savedGameID).toUpperCase() + '</div>');
            }
        });
    } else {
        $("#deletegamedialog").html("<h1>Delete Game</h1><br /><i>Sorry, there are no saved games at this time.</i>"); //na dit is de initiele html vergeten/verdwenen -> heropbouwen!
   }

    $('#deletegamedialog').modal();
});

$.fn.deletablegames = function () {
    var klik = function (e) {
        localStorage.removeItem(e.target.id);

        $('#menu_button').trigger('click'); //close the menu
       }
    this.live("click", klik);
}
$(".deletablegames").deletablegames(); //link the onclick events to every element with class .loadablegames including future elements //waarom staat dit hier? misschien logischer na jquery draggable events

$('#save_game').click(function () {
    $('#savegamedialog').modal();
});

$('#yes_save_game').click(function () {
    var gameToBeSaved = {};
    gameToBeSaved["cardsArray"] = cardsArray;
    gameToBeSaved["handIsOccupiedArray"] = handIsOccupiedArray;
    gameToBeSaved["pilesArray"] = pilesArray;
    gameToBeSaved["draggableArray"] = draggableArray;
    gameToBeSaved["numberOfKingsDroppedInPlace"] = numberOfKingsDroppedInPlace;
    gameToBeSaved["numberOfCardsInColumn"] = numberOfCardsInColumn;
    gameToBeSaved["playfield"] = $('#playfield').html();
    gameToBeSaved["hands"] = $('#hands').html();
    gameToBeSaved["piles"] = $('#piles').html(); 
    saveToStorage("PatienceMaxGame" + $("#savename").val(), gameToBeSaved); //wat als een andere app ook iets in localstorage zet? overal PatienceMaxGame achter zetten en dat er weer afhalen bij Load ?
    $('#menu_button').trigger('click'); //close the menu
});

$('#load_help').click(function () {
	$('#help').modal();
});

$('#turn_soundsonoff').toggle(function () {
    intSoundsOn = false;
    $('#turn_soundsonoff').text("Turn sounds on");
    saveSettings();
},
    function () {
        intSoundsOn = true;
        $('#turn_soundsonoff').text("Turn sounds off");
        saveSettings();
    }
);

//initialisation -> hoort dit hier of bij de andere initialisaties?
$('#showdroppability_submenu').hide();
    $('#showdroppability_parentmenuitem').toggle(function () {
        $("#showdroppability_submenu").show();
    },
    function () {
        $("#showdroppability_submenu").hide();
    });

//menu actions
$('.showdroppability_menuitem').toggle(function () {
    var stringShowRank = $(this).attr("id").slice(-2); //get the rank by getting the last 2 characters at the end of the ID
    showDroppability(parseInt(stringShowRank));
    var newMenuText = $('#showdroppability' + stringShowRank).text();
    $('#showdroppability' + stringShowRank).text("hide" + newMenuText.slice(4));
},
    function () {
        var stringShowRank = $(this).attr("id").slice(-2);
        hideDroppability(parseInt(stringShowRank));
        var newMenuText = $('#showdroppability' + stringShowRank).text();
        $('#showdroppability' + stringShowRank).text("show" + newMenuText.slice(4));
    }
);

$('#load_about').click(function () {
    $('#about').modal()
});

$('#turn_notificationsonoff').toggle(function () {
    intNotificationsOn = false;
    saveSettings();
    $('#turn_notificationsonoff').text("Turn notifications on");
},
    function () {
        intNotificationsOn = true;
        saveSettings();
        $('#turn_notificationsonoff').text("Turn notifications off");
    }
);

$('#change_refresh_speed').click(function () {
    intRefreshSpeed += 1;
    if (intRefreshSpeed == 4) intRefreshSpeed = 1;
    saveSettings();

    $('#change_refresh_speed').text("Show new game " + stringRefreshSpeedDescription[intRefreshSpeed - 1]);
});

$('#allow_dragfrompile').toggle(function () {
    var pilesCounter;
    allowDragfrompile = true;
    saveSettings();
    $('#allow_dragfrompile').text("Drag from pile allowed");
    for (pilesCounter = 0; pilesCounter < 8; pilesCounter++) {
        $("#card" + pilesArray[pilesCounter]).addClass("draggable");
    }
},
    function () {
        var pilesCounter;
        allowDragfrompile = false;
        saveSettings();
        $('#allow_dragfrompile').text("No dragging from pile");
        for (pilesCounter = 0; pilesCounter < 8; pilesCounter++) {
            $("#card" + pilesArray[pilesCounter]).removeClass("draggable");
        }
    }
);

$('#maxallowedcardsinhand').toggle(function () {
    maxCardsinHand = 5;
    saveSettings();
    $('#maxallowedcardsinhand').text("Allow 4 cards in hand"); //the menu text is ready for the next toggle back to 4
    $("#hands").css("width", (constantCardWidth + constantCardWidthInterspace) * maxCardsinHand + 9); //some extra pixels because background image contains edges
    //$('#hands').css('background-image', 'url(images/hand_background_5cards.png)');
    $('#cardbackground_in_hand5').show();
},
    function () {
        if (handIsOccupiedArray[4]) {
            showNotification("5th hand is currently occupied. You must first free the 5th hand, before you can change this setting.")
            $('#maxallowedcardsinhand').click(); //toggle back
        } else {
            maxCardsinHand = 4;
            saveSettings();
            $('#maxallowedcardsinhand').text("Allow 5 cards in hand");
            $("#hands").css("width", (constantCardWidth + constantCardWidthInterspace) * maxCardsinHand + 9); //some extra pixels because background image contains edges
            //$('#hands').css('background-image', 'url(images/hand_background.png)');
            $('#cardbackground_in_hand5').hide(); //if we use hide, we don't really have to narrow the #hands, but we do it to be sure.
        }
    }
);
//end of Menu Actions

function declareMenuBarToggle() {
    $('#menu_button').toggle(function () {
        //$('#playfield').addClass('menu_is_open');
        $("#playfield").css("left", constantMenuWidth); //px

        //$('#playfield').animate({ left: constantMenuWidth }, 750, function (e) {
        //    // $('#menu_button').html('<img id="menu_button" src="images/menu_button.png" width="80" height="29" />');
        //});
    },
    function () {
//        $('#playfield').removeClass('menu_is_open')/*.addClass('totheleft')*/;
        $("#playfield").css("left", 0); //px

        //$('#playfield').animate({ left: 0 }, 750, function (e) {
        //    // $('#menu_button').html('<img id="menu_button" src="images/menu_button.png" width="80" height="29" />');
        //});
    });
}

function openURL(url) {
    var ref = window.open(url, '_blank', 'location=yes');
    //ref.addEventListener('loadstart', function() { alert('start: ' + event.url); });
    //ref.addEventListener('loadstop', function() { alert('stop: ' + event.url); });
    //ref.addEventListener('exit', function() { alert(event.type); });
}

function showNotification(message) {
    if (!intNotificationsOn) {
        return
    }
    //if user keeps dragging imnposible cards it keeps updating the message without craching
    clearInterval(timerIDmustbeglobal);
    //message = /*"<center>*/"<br/><h3>" + message + "</h3>"/*"<center>*/
    $('#notification_message_sp').html(message);

    $('#notification_message_sp').fadeIn(function () {
        timerIDmustbeglobal = setTimeout(function () {
            $('#notification_message_sp').fadeOut(600).delay(600); //.slideUp(function () { });            
        }, 2400);
    });
}

function saveSettings() {
    //save all settings to a storage, which cannot be seen/loaded by the player
    var settingsToBeSaved = {};//new Array(0);  
 //   settingsToBeSaved["skipgameintro"] = blnSkipGameIntro;
    settingsToBeSaved["sound"] = intSoundsOn;
    settingsToBeSaved["notifications"] = intNotificationsOn;
    settingsToBeSaved["refreshspeed"] = intRefreshSpeed;
    settingsToBeSaved["allow_dragfrompile"] = allowDragfrompile;
    settingsToBeSaved["maxallowedcardsinhand"] = maxCardsinHand;

    saveToStorage("PatienceSettings", settingsToBeSaved);
}