'use strict';

/* Test the Angular flash cards directive. */

describe('flashcard', function() {

  var elm, scope, $httpBackend,
      divs, headers, para, span, btns, 
      iconLink;

  beforeEach(module('flashcard'));

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });
  
  beforeEach(inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('data/test.json').
    respond({ "title": "Test Cards",
              "cards": [
                 {"question": "First Card Question",
                  "answer": "First Card Answer"
                 },
                 {"question": "Second Card Question"
                 },
                 {"question": "Third Card Question"
                 },
                 {"question": "Second to Last Card Question",
                  "answer": "Silly Irrelevent Answer"
                 },
                 {"question": "Last Card Question",
                  "answer": "Last Card Question"
                 }
                ]
             });
  }));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $compile) {

    elm = angular.element('<div flashcards data="data/test.json" src="img/icon.png">click here yo</div>');
    scope = $rootScope;
    $compile(elm)(scope);
    scope.$digest();

    divs = elm.find('div');
    headers = elm.find('h3');
    para = elm.find('p');
    span = elm.find('span');
    btns = elm.find('button');
    iconLink = elm.find('a')[0];
  }));

  it('should have 3 h3 title elements', function() {
    expect(headers.length).toBe(3);
  });

  it('should have 7 div elements', function() {
    expect(divs.length).toBe(7);
  });

  it('should have 3 p elements', function() {
    expect(para.length).toBe(3);
  });

  it('should have 3 span elements', function() {
    expect(span.length).toBe(9);
  });

  it('should have 9 button elements', function() {
    expect(btns.length).toBe(9);
  });

  it('should be hidden on page load', function() {
    expect(angular.element(divs[0]).hasClass('cards-hide')).toBe(true);
  });

  it('should be visible on icon click', function() {
    expect(angular.element(divs[0]).hasClass('cards-hide')).toBe(true);
    expect(angular.element(divs[0]).hasClass('cards-show')).toBe(false);
    iconLink.click();
    expect(angular.element(divs[0]).hasClass('cards-show')).toBe(true);
    expect(angular.element(divs[0]).hasClass('cards-hide')).toBe(false);
  });


  it('should have three cards', function() {
    expect(angular.element(divs[1]).hasClass('card')).toBe(true);
    expect(angular.element(divs[3]).hasClass('card')).toBe(true);
    expect(angular.element(divs[5]).hasClass('card')).toBe(true);
  });

  it('should have a next card', function() {
    expect(angular.element(divs[1]).hasClass('card-next')).toBe(true);
  });

  it('should have a previous card', function() {
    expect(angular.element(divs[5]).hasClass('card-previous')).toBe(true);
  });

  it('titles should be set correctly ', function() {
    expect(angular.element(headers[0]).text()).toBe('');
    expect(angular.element(headers[1]).text()).toBe('');
    expect(angular.element(headers[2]).text()).toBe('');
    iconLink.click();
    $httpBackend.flush();
    expect(angular.element(headers[0]).text()).toBe('Test Cards');
    expect(angular.element(headers[1]).text()).toBe('Test Cards');
    expect(angular.element(headers[2]).text()).toBe('Test Cards');
  });

  it('content should be set correctly ', function() {
    expect(angular.element(para[0]).hasClass('card-content')).toBe(true);
    expect(angular.element(para[1]).hasClass('card-content')).toBe(true);
    expect(angular.element(para[2]).hasClass('card-content')).toBe(true);
    expect(angular.element(para[0]).text()).toBe('');
    expect(angular.element(para[1]).text()).toBe('');
    expect(angular.element(para[2]).text()).toBe('');
    iconLink.click();
    $httpBackend.flush();
    expect(angular.element(para[1]).text()).toBe('First Card Question');
    expect(angular.element(para[0]).text()).toBe('Second Card Question');
    expect(angular.element(para[2]).text()).toBe('Last Card Question');
  });

  it('card numbers should be set correctly', function() {
    expect(angular.element(span[0]).hasClass('card-num')).toBe(true);
    expect(angular.element(span[3]).hasClass('card-num')).toBe(true);
    expect(angular.element(span[6]).hasClass('card-num')).toBe(true);
    expect(angular.element(span[0]).text()).toBe('');
    expect(angular.element(span[3]).text()).toBe('');
    expect(angular.element(span[6]).text()).toBe('');
    iconLink.click();
    $httpBackend.flush();
    expect(angular.element(span[0]).text()).toBe('2');
    expect(angular.element(span[3]).text()).toBe('1');
    expect(angular.element(span[6]).text()).toBe('5');
  });

  it('total number of cards sould be set correctly', function() {
    expect(angular.element(span[1]).hasClass('num-cards')).toBe(true);
    expect(angular.element(span[4]).hasClass('num-cards')).toBe(true);
    expect(angular.element(span[7]).hasClass('num-cards')).toBe(true);
    expect(angular.element(span[0]).text()).toBe('');
    expect(angular.element(span[3]).text()).toBe('');
    expect(angular.element(span[6]).text()).toBe('');
    iconLink.click();
    $httpBackend.flush();
    expect(angular.element(span[1]).text()).toBe(' / 5');
    expect(angular.element(span[4]).text()).toBe(' / 5');
    expect(angular.element(span[7]).text()).toBe(' / 5');
  });

  it('close buttons should be set', function() {
    expect(angular.element(span[2]).hasClass('close-button')).toBe(true);
    expect(angular.element(span[5]).hasClass('close-button')).toBe(true);
    expect(angular.element(span[8]).hasClass('close-button')).toBe(true);
    expect(angular.element(span[2]).text()).toBe('X');
    expect(angular.element(span[5]).text()).toBe('X');
    expect(angular.element(span[8]).text()).toBe('X');
  });

  it('prev buttons should be set', function() {
    expect(angular.element(btns[0]).hasClass('prev-button')).toBe(true);
    expect(angular.element(btns[3]).hasClass('prev-button')).toBe(true);
    expect(angular.element(btns[6]).hasClass('prev-button')).toBe(true);
    expect(angular.element(btns[0]).text()).toBe('Previous');
    expect(angular.element(btns[3]).text()).toBe('Previous');
    expect(angular.element(btns[6]).text()).toBe('Previous');
  });

  it('next buttons should be set', function() {
    expect(angular.element(btns[1]).hasClass('next-button')).toBe(true);
    expect(angular.element(btns[4]).hasClass('next-button')).toBe(true);
    expect(angular.element(btns[7]).hasClass('next-button')).toBe(true);
    expect(angular.element(btns[1]).text()).toBe('Next');
    expect(angular.element(btns[4]).text()).toBe('Next');
    expect(angular.element(btns[7]).text()).toBe('Next');
  });

  it('answer buttons should be set', function() {
    expect(angular.element(btns[2]).hasClass('answer-button')).toBe(true);
    expect(angular.element(btns[5]).hasClass('answer-button')).toBe(true);
    expect(angular.element(btns[8]).hasClass('answer-button')).toBe(true);
    expect(angular.element(btns[2]).text()).toBe('Answer');
    expect(angular.element(btns[5]).text()).toBe('Answer');
    expect(angular.element(btns[8]).text()).toBe('Answer');
  });

  it('answer button hides when no answer content', function() {
    var curr = angular.element(divs[3]),
        nextBtn = curr.find('button')[1];
    expect(angular.element(btns[2]).hasClass('answer-button')).toBe(true);
    expect(angular.element(btns[2]).text()).toBe('Answer');
    expect(angular.element(btns[2]).hasClass('button-hide')).toBe(false);
    iconLink.click();
    $httpBackend.flush();
    expect(angular.element(btns[2]).hasClass('button-hide')).toBe(true);
  });


  it('answer button selects answer content', function() {
    var curr = angular.element(divs[3]),
        currCont = angular.element(curr.find('p')),
        answerBtn = curr.find('button')[2];
    iconLink.click();
    $httpBackend.flush();
    expect(currCont.text()).toBe('First Card Question');
    expect(angular.element(answerBtn).hasClass('answer-button')).toBe(true);
    expect(angular.element(answerBtn).text()).toBe('Answer')
    answerBtn.click();
    expect(currCont.text()).toBe('First Card Answer');
    expect(angular.element(answerBtn).text()).toBe('Question')
    answerBtn.click();
    expect(currCont.text()).toBe('First Card Question');
    expect(angular.element(answerBtn).text()).toBe('Answer')
  });

  it('next button selects next card', function() {
    var curr = angular.element(divs[3]),
        next = angular.element(divs[1]),
        prev = angular.element(divs[5]),
        currCont = angular.element(curr.find('p')),
        nextCont = angular.element(next.find('p')),
        prevCont = angular.element(prev.find('p')),
        nextBtn = curr.find('button')[1],
        flag;

    iconLink.click();
    $httpBackend.flush();
    expect(curr.hasClass('card-previous')).toBe(false);
    expect(curr.hasClass('card-next')).toBe(false);
    expect(next.hasClass('card-next')).toBe(true);
    expect(prev.hasClass('card-previous')).toBe(true);
    expect(currCont.text()).toBe('First Card Question');
    expect(nextCont.text()).toBe('Second Card Question');
    expect(prevCont.text()).toBe('Last Card Question');
    expect(angular.element(nextBtn).hasClass('next-button')).toBe(true);
    nextBtn.click();
    expect(curr.hasClass('card-previous')).toBe(true);
    expect(next.hasClass('card-next')).toBe(false);
    expect(prev.hasClass('card-previous')).toBe(false);
    expect(prev.hasClass('card-next')).toBe(true);

    runs(function() {
      flag = false;
      setTimeout(function() {
        flag = true;
      }, 1001);    });

    waitsFor(function() {
      return flag;
    }, "Third Card Question should be set", 1250);

    runs(function() {
      expect(currCont.text()).toBe('First Card Question');
      expect(nextCont.text()).toBe('Second Card Question');
      expect(prevCont.text()).toBe('Third Card Question');
    });  
  });

  it('next button selects next card', function() {
    var curr = angular.element(divs[3]),
        next = angular.element(divs[1]),
        prev = angular.element(divs[5]),
        currCont = angular.element(curr.find('p')),
        nextCont = angular.element(next.find('p')),
        prevCont = angular.element(prev.find('p')),
        prevBtn = curr.find('button')[0],
        flag;

    iconLink.click();
    $httpBackend.flush();
    expect(curr.hasClass('card-previous')).toBe(false);
    expect(curr.hasClass('card-next')).toBe(false);
    expect(next.hasClass('card-next')).toBe(true);
    expect(prev.hasClass('card-previous')).toBe(true);
    expect(currCont.text()).toBe('First Card Question');
    expect(nextCont.text()).toBe('Second Card Question');
    expect(prevCont.text()).toBe('Last Card Question');
    expect(angular.element(prevBtn).hasClass('prev-button')).toBe(true);
    prevBtn.click();
    expect(curr.hasClass('card-next')).toBe(true);
    expect(prev.hasClass('card-previous')).toBe(false);
    expect(next.hasClass('card-next')).toBe(false);
    expect(next.hasClass('card-previous')).toBe(true);

    runs(function() {
      flag = false;
      setTimeout(function() {
        flag = true;
      }, 1001);    });

    waitsFor(function() {
      return flag;
    }, "Third Card Question should be set", 1250);

    runs(function() {
      expect(currCont.text()).toBe('First Card Question');
      expect(nextCont.text()).toBe('Second to Last Card Question');
      expect(prevCont.text()).toBe('Last Card Question');
    });  
  });
 
});
