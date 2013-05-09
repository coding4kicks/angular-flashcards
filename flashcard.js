/* Angular Flash Cards */
'use strict';
angular.module('flashcard', []);

angular.module('flashcard').directive('flashcards', ['$http', function($http) {
  return {
    template: '<h3 class="flashcard-icon">click</h3>' +
              '<div class="cards-hide">' +
                '<div class="card">' +
                  '<span class="card-num"></span>' +
                  '<div class="title"><h3></h3></div>' +
                  '<span class="card-button">X</span><hr />' +
                  '<p class="card-content"></p>' + 
                  '<button class="prev-button" type="button">Previous</button>' +
                  '<button class="card-button" type="button">Next</button>' +
                  '<button class="card-button" type="button">Answer</button>' + 
                '</div>' +
                '<div class="card">' +
                  '<span class="card-num"></span>' +
                  '<div class="title"><h3></h3></div>' +
                  '<span class="card-button">X</span><hr />' +
                  '<p class="card-content"></p>' +
                  '<button class="prev-button" type="button">Previous</button>' +
                  '<button class="card-button" type="button">Next</button>' +
                  '<button class="card-button" type="button">Answer</button>' + 
                '</div>' +
                '<div class="card">' +
                  '<span class="card-num"></span>' +
                  '<div class="title"><h3></h3></div>' +
                  '<span class="card-button">X</span><hr />' +
                  '<p class="card-content"></p>' + 
                  '<button class="prev-button" type="button">Previous</button>' +
                  '<button class="card-button" type="button">Next</button>' +
                  '<button class="card-button" type="button">Answer</button>' + 
                '</div>' +
              '</div>',

    link: function(scope, element, attrs) {

      var icon = angular.element(element.children()[0]),
          flashcards = angular.element(element.children()[1]),
          cards = [], // 3 card objects representing 3 states: next, current, previous
          nextCard,
          currentCard,
          previousCard,
          tempCard,
          cardCounter = 3, // 1 greater than next
          prevCounter,
          showing = false,
          numberOfCards,
          data = {};
         // data = { 'title': 'Test Cards',
         //          'cards': [
         //            {'question': 'Here is some flash card content 1',
         //             'answer': 'This card has an answer 1'
         //            },
         //            {'question': 'Again more flash card content 2',
         //             'answer': 'With an answer too 2'
         //            },
         //            {'question': 'This card has no answer 3'
         //            },
         //            {'question': 'More content 4',
         //             'answer': 'Another answer 4'
         //            },
         //            {'question': 'The last one 5',
         //             'answer': 'With an answer too 5'
         //            }
         //          ]
         //        },

          

      var file = "data/demo.json";
      $http.get(file)
      .then(function(results){
        data = results.data;
        init_data();
      });


      // Initialize cards array with objects on each card.
      for(var i = 0; i < 3; i++) {
        cards[i] = angular.element(flashcards.children()[i]);
        cards[i]['cardNum'] = angular.element(cards[i].children()[0]);
        var div_holder = angular.element(cards[i].children()[1]);
        cards[i]['title'] = angular.element(div_holder.children()[0]);
        cards[i]['closebtn'] = angular.element(cards[i].children()[2]);
        cards[i]['content'] = angular.element(cards[i].children()[4]);
        cards[i]['previousBtn'] = angular.element(cards[i].children()[5]);
        cards[i]['nextBtn'] = angular.element(cards[i].children()[6]);
        cards[i]['answerBtn'] = angular.element(cards[i].children()[7]);
        cards[i].answerBtn.addClass('btn' + i); // 'class hack': pass button id via class
        cards[i]['title'].text(data.title);
        cards[i]['data'] = '';    
        cards[i]['answerShowing'] = false;
        cards[i].closebtn.bind('click', toggle_cards);
        cards[i].nextBtn.bind('click', next_question);
        cards[i].answerBtn.bind('click', toggleAnswer);
        cards[i].previousBtn.bind('click', prev_question);
      }

      // Assign cards to states
      nextCard = cards[0];
      currentCard = cards[1];
      previousCard = cards[2];

      // Initialize starting classes
      nextCard.addClass("card-next");
      nextCard.addClass("card-hide");
      previousCard.addClass("card-previous");
      previousCard.addClass("card-hide");

      // Initialize starting content
      function init_data() {
        numberOfCards = data.cards.length;
        nextCard.data = data.cards[1];
        nextCard.content.text(nextCard.data.question);
        currentCard.data = data.cards[0];
        currentCard.content.text(currentCard.data.question);
        previousCard.data = data.cards[numberOfCards - 1];
        previousCard.content.text(previousCard.data.question);
        nextCard.cardNum.text(2)
        currentCard.cardNum.text(1)
        previousCard.cardNum.text(numberOfCards)
      }

      // Toggle the flashcards' visibility
      icon.bind('click', toggle_cards);
      function toggle_cards() {
        showing = !showing;
        flashcards.removeClass(showing ? 'cards-show' : 'cards-hide');
        flashcards.addClass(showing ? 'cards-hide' : 'cards-show');
      };
 
      // Toggle between questions and answers, uses 'class hack' to id btn/card
      function toggleAnswer() {
        var classes = angular.element(this).attr('class');
        if (classes.search('btn0') > 0) {
          swapContent(cards[0]);
        }
        else if (classes.search('btn1') > 0) {
          swapContent(cards[1]);
        } 
        else {
          swapContent(cards[2]);
        }
      };

      function swapContent(card) { 
        card.content.text(card['answerShowing'] ? card.data.question : card.data.answer);
        card.answerBtn.text(card['answerShowing'] ? 'answer' : 'question');
        card['answerShowing'] = !card['answerShowing'];
      }

      // Move to the next question
      function next_question() {
        nextCard.removeClass("card-hide");
        currentCard.addClass("card-previous");
        nextCard.removeClass("card-next");
        previousCard.addClass("card-next");
        previousCard.removeClass("card-previous");

        // After transition is complete, swap cards, make visible, adjust data.
        setTimeout(function() {
          if (currentCard['answerShowing'] == true) {swapContent(currentCard);}
          tempCard = nextCard;
          nextCard = previousCard;
          previousCard = currentCard;
          currentCard = tempCard;
          previousCard.addClass("card-hide");
          nextCard.cardNum.text(cardCounter);
          nextCard.data = data.cards[cardCounter-1];
          nextCard.content.text(nextCard.data.question);
          if (typeof nextCard.data.answer === "undefined") {
            nextCard.answerBtn.addClass("button-hide");
          }
          else {
            nextCard.answerBtn.removeClass("button-hide");
          }
          if (cardCounter++ >= numberOfCards) {cardCounter = 1;}
        }, 1000);
      }

      // Move to the previous question
      function prev_question() {
        previousCard.removeClass("card-hide");
        currentCard.addClass("card-next");
        previousCard.removeClass("card-previous");
        nextCard.addClass("card-previous");
        nextCard.removeClass("card-next");

        // After transition is complete, swap cards, make visible, adjust data.
        setTimeout(function() {
          if (currentCard['answerShowing'] == true) {swapContent(currentCard);}          
          tempCard = previousCard;
          previousCard = nextCard;
          nextCard = currentCard;
          currentCard = tempCard;
          nextCard.addClass("card-hide");
          if (cardCounter - 4 <= 0){
            prevCounter = numberOfCards - (4 - cardCounter);
          }
          else {
            prevCounter = cardCounter-4;
          }
          previousCard.cardNum.text(prevCounter);
          previousCard.data = data.cards[prevCounter-1];
          previousCard.content.text(previousCard.data.question);
          if (typeof previousCard.data.answer === "undefined") {
            previousCard.answerBtn.addClass("button-hide");
          }
          else {
            previousCard.answerBtn.removeClass("button-hide");
          }
          if (cardCounter-- <= 1) {cardCounter = numberOfCards;}
        }, 1000);
      }

      // initialize
      toggle_cards();
    }
  }
}]);

