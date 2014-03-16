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

        pointX = orig.x;
        pointY = orig.y;

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
        //deze functie duurt te lang...
        var target = e.target || e.srcElement;
        if (dragDivIDCardNumber == target.id.slice(4)) { //is dit per se nodig?
            var orig = e.originalEvent;

            $(this).css({
                left: orig.x - offset.x,
                top: orig.y - offset.y
            });
        }
    };

    var dragend = function (e) {
        e.preventDefault();
        var orig = e.originalEvent;
        //var target = e.target || e.srcElement; //waar wordt deze variabele voor gebruikt?
        var pointX = 0;
        var pointY = 0;

        dragDivIDCardNumber = 0; //to indicate no card is being dragged
        pointX = orig.x;
        pointY = orig.y;

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

    this.live("mousedown", dragstart);
    this.live("mousemove", dragMe);
    this.live("mouseup", dragend);

    //this.live("MSPointerDown", dragstart);
    //this.live("MSPointerMove", dragMe);
    //this.live("MSPointerUp", dragend);
}

$(".draggable").draggable(); //link the touch events to every element with class .draggable including future elements //waarom staat dit hier? misschien logischer na jquery draggable events
