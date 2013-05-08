/* Angular Flash Cards */
'use strict';
angular.module('flashcard', []);

angular.module('flashcard').directive('flashcards', function() {
  return {
    template: '<h3 class="flashcard-icon">click</h3>' +
              '<div class="cards-hide">' +
              '<div class="card"><span class="card-button">X</span><p class="card-content"></p><button class="card-button" type="button">Next</button><button class="card-button" type="button">Answer</button></div>' +
              '<div class="card"><span class="card-button">X</span><p class="card-content"></p><button class="card-button" type="button">Next</button><button class="card-button" type="button">Answer</button></div>' +
              '<div class="card"><span class="card-button">X</span><p class="card-content"></p><button class="card-button" type="button">Next</button><button class="card-button" type="button">Answer</button></div>' +
              '</div>',

    link: function(scope, element, attrs) {

      var icon = angular.element(element.children()[0]),
          flashcards = angular.element(element.children()[1]),
          cards = [],
          currentCard,
          nextCard,
          previousCard,
          tempCard,
          cardCounter, 
          showing = false,

          data = { 'title': 'testcards',
                   'cards': [
                     {'question': 'Here is some flash card content',
                      'answer': 'This card has an answer'
                     },
                     {'question': 'Again more flash card content',
                      'answer': 'With an answer too'
                     },
                     {'question': 'This card has no answer'
                     },
                     {'question': 'More content',
                      'answer': 'Another answer'
                     },
                     {'question': 'The last one',
                      'answer': 'With an answer too'
                     }
                   ]
                 },

          numberOfCards = data.cards.length;


      for(var i = 0; i < 3; i++) {
        
        cards[i] = angular.element(flashcards.children()[i]);
        cards[i]['closebtn'] = angular.element(cards[i].children()[0]);        
        cards[i]['content'] = angular.element(cards[i].children()[1]);
        cards[i]['nextbtn'] = angular.element(cards[i].children()[2]);
        cards[i]['answerbtn'] = angular.element(cards[i].children()[3]);
        cards[i].answerbtn.addClass('btn' + i); // hack: pass button id via class
        cards[i]['data'] = '';    
        cards[i]['answerShowing'] = false;
        cards[i].closebtn.bind('click', toggle_cards);
        cards[i].nextbtn.bind('click', next_question);

        cards[i].answerbtn.bind('click', toggleAnswer);
      }

      // Assign cards
      nextCard = cards[0];
      currentCard = cards[1];
      previousCard = cards[2];

      // Initialize starting classes
      nextCard.addClass("card-next");
      previousCard.addClass("card-previous");
      previousCard.addClass("card-hide");

      // Initialize starting content
      nextCard.data = data.cards[1];
      nextCard.content.text(nextCard.data.question);
      currentCard.data = data.cards[0];
      currentCard.content.text(currentCard.data.question);
      previousCard.data = data.cards[numberOfCards - 1];
      previousCard.content.text(previousCard.data.question);

      // Toggle the flashcards' visibility
      icon.bind('click', toggle_cards);
      function toggle_cards() {
        showing = !showing;
        flashcards.removeClass(showing ? 'cards-show' : 'cards-hide');
        flashcards.addClass(showing ? 'cards-hide' : 'cards-show');
      };
 
      // Toggle between questions and answers, uses class hack
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
        function swapContent(card) { 
          card.content.text(card['answerShowing'] ? card.data.question : card.data.answer);
          card.answerbtn.text(card['answerShowing'] ? 'answer' : 'question');
          card['answerShowing'] = !card['answerShowing'];
        }
      };

      // Move to the next question
      function next_question() {
        currentCard.addClass("card-previous");
        nextCard.removeClass("card-next");
        previousCard.addClass("card-next");
        previousCard.removeClass("card-previous");

        // After transition is complete, swap cards & make visible
        setTimeout(function() {
          tempCard = nextCard;
          nextCard = previousCard;
          previousCard = currentCard;
          currentCard = tempCard;
          nextCard.removeClass("card-hide");
          previousCard.addClass("card-hide");
        }, 1000);
      }

      // initialize
      //toggle_answer();
      toggle_cards();
    }
  }
});

