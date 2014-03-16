// JQUERY FUNCTION declarations
$.fn.draggable = function () {
    var offset = null; //
    //var cardPosition = null;
    //var dragstarted = false;
    var dragDivIDCardNumber = 0; // 0 = not yet dragged

    var dragstart = function (e) {
        e.preventDefault();  // without this, instead of drawing, you pan
        var orig = e.originalEvent;
        var pointX = 0;
        var pointY = 0;
        var cardPosition = $(this).position();
        var target = e.target || e.srcElement;
        dragDivIDCardNumber = target.id.slice(4);

        pointX = orig.changedTouches[0].pageX;
        pointY = orig.changedTouches[0].pageY;

        originalCardLeft = Math.floor(cardPosition.left); //to put the card back, in case it is dropped incorrectly (during touchend)
        originalCardTop = Math.floor(cardPosition.top);
        originalCardzIndex = $("#card" + dragDivIDCardNumber).css("z-Index");

        offset = {
            x: pointX - cardPosition.left,
            y: pointY - cardPosition.top
        };

        drag(e, dragDivIDCardNumber) // HANDLE DRAG (opacity, images, etc)

        //dragstarted = true;
    };
    var dragMe = function (e) {
        e.preventDefault();  // without this, instead of drawing, you pan
        //var target = e.target || e.srcElement;

        //if (dragDivIDCardNumber == target.id) { //is dit per se nodig? volgens mij niet, aangezien die altijd gelijk is het is de kaart die je draged.
            var orig = e.originalEvent;
            
            $(this).css({
                left: orig.changedTouches[0].pageX - offset.x,
                top: orig.changedTouches[0].pageY - offset.y
            });            
        //}
    };

    var dragend = function (e) {
        e.preventDefault();
        var orig = e.originalEvent;
        //var target = e.target || e.srcElement; //waar wordt deze variabele voor gebruikt?
        var pointX = 0;
        var pointY = 0;

        dragDivIDCardNumber = 0; //to indicate no card is being dragged

        pointX = orig.changedTouches[0].pageX;
        pointY = orig.changedTouches[0].pageY;

        $(this).css({
            left: pointX - offset.x,
            top: pointY - offset.y
        });

        // dragDivIDCardNumber = target.id;
        //DropColumnNumber = cardsArray[dragDivIDCardNumber].columnNumber
        //calculate column number with x y

        var playfieldPosition = $("#playfield").position(); //position() always gives the # pixels, even when a % is used in the css
        var handsPosition = $("#hands").position();
        var pilesPosition = $("#piles").position();
        var cardPosition = $(this).position();

        if (playfieldPosition.left == constantMenuWidth) { //the playfield has been moved 200 px
            pointX = pointX - constantMenuWidth;
        }
        if (pointX > pilesPosition.left) { //check if card was dropped on pile
            droponpile(e);
        }
        else {
            //card was not dropped on pile
            if (pointY > handsPosition.top) {
                //card was dropped on hand
                //pointX = pointX - handsPosition.left; //we can only devide / calculate position in hand after removing the margin
                //var positionInHand;
                //positionInHand = Math.min(3, Math.max(0, Math.floor(pointX / constantCardWidth))); //min result = 0 and max result = 3
                droponhand(e);
            }
            else {
                //not on hand and not on pile : card was dropped on playfield -> determine the column, using left position
                //we can only devide / calculate column number after removing the margin and adding 1/2 cardwidth
                var leftPositionUpToCardMiddle = cardPosition.left - constantPlayfieldLeftmargin + (constantCardWidth / 2); //klopt dit? hertesten.
                if ($(this).hasClass("card_in_hand")) { //correction because card_in_hand-html is within #HANDS
                    leftPositionUpToCardMiddle = leftPositionUpToCardMiddle + handsPosition.left;
                }
                else if ($(this).hasClass("card_on_pile")) { //correction because card_in_hand-html is within #HANDS
                    leftPositionUpToCardMiddle = leftPositionUpToCardMiddle + pilesPosition.left;
                }
                dropColumnNumber = Math.min(9, Math.max(0, Math.floor(leftPositionUpToCardMiddle / constantCardWidth)));
                //                dropColumnNumber = Math.min(9, Math.max(0, Math.floor(pointX / constantCardWidth))); //oud : op basis van mousepointer 
                droponcolumn(e, dropColumnNumber); //waarom geven we variabele "e" mee? op termijn vervangen door target.id
            }
        }
    };
    
    this.live("touchstart", dragstart);
    this.live("touchmove", dragMe);
    this.live("touchend", dragend);    
}

//nutteloos statement
var x = 1;

//doubletap event :
//(function ($) { //waarom staat deze regel hier, terwijl dat niet is bij $.fn.draggable = function () {
//    $.fn.doubleTap = function (doubleTapCallback) { //wat betekent doubleTapCallback ? betere naam = ?
//        return this.each(function () { //waarom staat hier een each? het is toch geen array oid?
//            var doubleTappedElement = this;
//            var lastTappedMoment = 0;
//            $(doubleTappedElement).bind('touchend', function (e) {
//                var now = (new Date()).valueOf();
//                var elapsedTimeSinceLastTapped = (now - lastTappedMoment);
//                lastTappedMoment = now;
//                if (elapsedTimeSinceLastTapped < 250) {
//                    if ($.isFunction(doubleTapCallback)) {
//                        doubleTapCallback.call(doubleTappedElement); //wat doet deze regel?
//                        if ($(doubleTappedElement).hasClass("card_on_playfield") || $(doubleTappedElement).hasClass("card_in_hand")) {
//                            droponpile(e); //try to drop on pile
//                        }
//                        //else {
//                        //hier context-sensitive menu tonen?
//                        //}
//                    }
//                }
//            });
//        });
//    }
//})(jQuery); //waarom staat hier jqeury? reklame?


$(".draggable").draggable(); //link the touch events to every element with class .draggable including future elements //waarom staat dit hier? misschien logischer na jquery draggable events
//$(".draggable").doubleTap(function () { }); //dit geeft problemen...misschien unbind-en na een doubletap?
