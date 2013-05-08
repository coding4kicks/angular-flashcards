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
      // Flash Card Icon Element
      var icon = angular.element(element.children()[0]),

          flashcards = angular.element(element.children()[1]),

          cards = [],

          card1 = angular.element(flashcards.children()[0]),
          card2 = angular.element(flashcards.children()[1]),
          card3 = angular.element(flashcards.children()[2]),
          tempCard, 

          closebtn1 = angular.element(card1.children()[0]),
          content1 = angular.element(card1.children()[1]),
          nextbtn1 = angular.element(card1.children()[2]),
          answerbtn1 = angular.element(card1.children()[3]),

          closebtn2 = angular.element(card2.children()[0]),
          content2 = angular.element(card2.children()[1]),
          nextbtn2 = angular.element(card2.children()[2]),
          answerbtn2 = angular.element(card2.children()[3]),

          closebtn3 = angular.element(card3.children()[0]),
          content3 = angular.element(card3.children()[1]),
          nextbtn3 = angular.element(card3.children()[2]),
          answerbtn3 = angular.element(card3.children()[3]),

          currentCard = card2,
          nextCard = card1,
          previousCard = card3,

          data = { 'title': 'testcards',
                   'cards': [
                     {'content': 'Here is some flash card content',
                      'answer': 'This card has an answer'
                     },
                     {'content': 'Again more flash card content',
                      'answer': 'With an answer too'
                     },
                     {'content': 'This card has no answer'
                     },
                     {'content': 'More content',
                      'answer': 'Another answer'
                     },
                     {'content': 'The last one',
                      'answer': 'With an answer too'
                     }
                   ]
                 },

          muberOfCards = data.cards.length,

          // flashcard showing state
          showing = false,
          answer = false;

      // Set initial state
      card1.addClass("card-next");
      card3.addClass("card-previous");
      card3.addClass("card-hide")

      // Set initial content
      content2.text(data.cards[0].content);
      content1.text(data.cards[1].content);

      icon.bind('click', toggle_cards);
      closebtn1.bind('click', toggle_cards);
      answerbtn1.bind('click', toggle_answer);
      nextbtn1.bind('click', next_question);
      closebtn2.bind('click', toggle_cards);
      answerbtn2.bind('click', toggle_answer);
      nextbtn2.bind('click', next_question);
      closebtn3.bind('click', toggle_cards);
      answerbtn3.bind('click', toggle_answer);
      nextbtn3.bind('click', next_question);

      cards.push(card1);
      cards.push(card2);
      cards.push(card3);

      // Toggle the flashcards visibility
      function toggle_cards() {
        showing = !showing;
        flashcards.removeClass(showing ? 'cards-show' : 'cards-hide');
        flashcards.addClass(showing ? 'cards-hide' : 'cards-show');
      };
 
      // Toggle between questions and answers
      function toggle_answer() {
        answer = !answer;
        content2.text(answer ? data.cards[0].content : data.cards[0].answer);
        answerbtn2.text(answer ? 'answer' : 'question');
      };

      // Move to the next question
      function next_question() {
        currentCard.addClass("card-previous");
        nextCard.removeClass("card-next");
        previousCard.addClass("card-next");
        previousCard.removeClass("card-previous");

        setTimeout(function() {previousCard.removeClass("card-hide");}, 1000);
        setTimeout(function() {currentCard.addClass("card-hide");}, 1000);
        setTimeout(function() {
          tempCard = nextCard;
          nextCard = previousCard;
          previousCard = currentCard;
          currentCard = tempCard;
        }, 1000);
      }

      // initialize
      toggle_answer();
      toggle_cards();
    }
  }
});

