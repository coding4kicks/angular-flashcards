/* Angular Flash Cards */
'use strict';
angular.module('flashcard', []);

angular.module('flashcard').directive('flashcards', function() {
  return {
    template: '<h3 class="flashcard-icon">click</h3>' +
              '<div class="cards-hide">' +
              '<div class="card"><span class="card-button">X</span><p class="card-content">card1</p><button class="card-button" type="button">Next</button><button class="card-button" type="button">Answer</button></div>' +
              '<div><p>card2</p></div>' +
              '</div>',

    link: function(scope, element, attrs) {
      // Flash Card Icon Element
      var icon = angular.element(element.children()[0]),
          flashcards = angular.element(element.children()[1]),
          card1 = angular.element(flashcards.children()[0]),
          card2 = flashcards.children()[1],
          closebtn = angular.element(card1.children()[0]),
          content = card1.children()[1],
          nextbtn = card1.children()[2],
          answerbtn = card1.children()[3],

          // Opened / closed state
          showing = false;
 
      // Clicking on title should open/close the zippy
      icon.bind('click', toggle);
      closebtn.bind('click', toggle);
 
      // Toggle the closed/opened state
      function toggle() {
        showing = !showing;
        flashcards.removeClass(showing ? 'cards-show' : 'cards-hide');
        flashcards.addClass(showing ? 'cards-hide' : 'cards-show');

        //alert(card2);
      }
 
      // initialize the zippy
      toggle();
    }
  }
});
