'use strict';

/* Test the flash cards directive. */

describe('flashcard', function() {

  var elm, scope, $httpBackend;

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
                 {"question": "Second Card Question",
                  "answer": "Second Card Answer"
                 },
                 {"question": "Card with no answer"
                 },
                 {"question": "More content 4",
                  "answer": "Another answer 4"
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
  }));

  it('should have 4 h3 title elements', function() {
    var headers = elm.find('h3');
    expect(headers.length).toBe(4);
  });

  it('should have 7 div elements', function() {
    var divs = elm.find('div');
    expect(divs.length).toBe(7);
  });

  it('should have 3 p elements', function() {
    var para = elm.find('p');
    expect(para.length).toBe(3);
  });

  it('should have 3 span elements', function() {
    var span = elm.find('span');
    expect(span.length).toBe(9);
  });

  it('should have 9 button elements', function() {
    var btns = elm.find('button');
    expect(btns.length).toBe(9);
  });

  it('should be hidden onload', function() {
    var divs = elm.find('div');
    expect(angular.element(divs[0]).hasClass('cards-hide')).toBe(true);
  });

  it('should have three cards', function() {
    var divs = elm.find('div');
    expect(angular.element(divs[1]).hasClass('card')).toBe(true);
    expect(angular.element(divs[3]).hasClass('card')).toBe(true);
    expect(angular.element(divs[5]).hasClass('card')).toBe(true);
  });

  it('should have a next card', function() {
    var divs = elm.find('div');
    expect(angular.element(divs[1]).hasClass('card-next')).toBe(true);
  });

  it('should have a previous card', function() {
    var divs = elm.find('div');
    expect(angular.element(divs[5]).hasClass('card-previous')).toBe(true);
  });

  it('titles should be set correctly ', function() {
    var headers = elm.find('h3');
    expect(angular.element(headers[1]).text()).toBe('');
    expect(angular.element(headers[2]).text()).toBe('');
    expect(angular.element(headers[3]).text()).toBe('');
    $httpBackend.flush();
    expect(angular.element(headers[1]).text()).toBe('Test Cards');
    expect(angular.element(headers[2]).text()).toBe('Test Cards');
    expect(angular.element(headers[3]).text()).toBe('Test Cards');
  });

  it('content should be set correctly ', function() {
    var cont = elm.find('p');
    expect(angular.element(cont[0]).hasClass('card-content')).toBe(true);
    expect(angular.element(cont[1]).hasClass('card-content')).toBe(true);
    expect(angular.element(cont[2]).hasClass('card-content')).toBe(true);
    expect(angular.element(cont[0]).text()).toBe('');
    expect(angular.element(cont[1]).text()).toBe('');
    expect(angular.element(cont[2]).text()).toBe('');
    $httpBackend.flush();
    expect(angular.element(cont[1]).text()).toBe('First Card Question');
    expect(angular.element(cont[0]).text()).toBe('Second Card Question');
    expect(angular.element(cont[2]).text()).toBe('Last Card Question');
  });

  it('card numbers should be set correctly', function() {
    var span = elm.find('span');
    expect(angular.element(span[0]).hasClass('card-num')).toBe(true);
    expect(angular.element(span[3]).hasClass('card-num')).toBe(true);
    expect(angular.element(span[6]).hasClass('card-num')).toBe(true);
    expect(angular.element(span[0]).text()).toBe('');
    expect(angular.element(span[3]).text()).toBe('');
    expect(angular.element(span[6]).text()).toBe('');
    $httpBackend.flush();
    expect(angular.element(span[0]).text()).toBe('2');
    expect(angular.element(span[3]).text()).toBe('1');
    expect(angular.element(span[6]).text()).toBe('5');
  });

  it('total number of cards sould be set correctly', function() {
    var span = elm.find('span');
    expect(angular.element(span[1]).hasClass('num-cards')).toBe(true);
    expect(angular.element(span[4]).hasClass('num-cards')).toBe(true);
    expect(angular.element(span[7]).hasClass('num-cards')).toBe(true);
    expect(angular.element(span[0]).text()).toBe('');
    expect(angular.element(span[3]).text()).toBe('');
    expect(angular.element(span[6]).text()).toBe('');
    $httpBackend.flush();
    expect(angular.element(span[1]).text()).toBe(' / 5');
    expect(angular.element(span[4]).text()).toBe(' / 5');
    expect(angular.element(span[7]).text()).toBe(' / 5');
  });

  it('close buttons should be set', function() {
    var span = elm.find('span');
    expect(angular.element(span[2]).hasClass('close-button')).toBe(true);
    expect(angular.element(span[5]).hasClass('close-button')).toBe(true);
    expect(angular.element(span[8]).hasClass('close-button')).toBe(true);
    expect(angular.element(span[2]).text()).toBe('X');
    expect(angular.element(span[5]).text()).toBe('X');
    expect(angular.element(span[8]).text()).toBe('X');
  });

  it('prev buttons should be set', function() {
    var btns = elm.find('button');
    expect(angular.element(btns[0]).hasClass('prev-button')).toBe(true);
    expect(angular.element(btns[3]).hasClass('prev-button')).toBe(true);
    expect(angular.element(btns[6]).hasClass('prev-button')).toBe(true);
    expect(angular.element(btns[0]).text()).toBe('Previous');
    expect(angular.element(btns[3]).text()).toBe('Previous');
    expect(angular.element(btns[6]).text()).toBe('Previous');
  });

  it('next buttons should be set', function() {
    var btns = elm.find('button');
    expect(angular.element(btns[1]).hasClass('next-button')).toBe(true);
    expect(angular.element(btns[4]).hasClass('next-button')).toBe(true);
    expect(angular.element(btns[7]).hasClass('next-button')).toBe(true);
    expect(angular.element(btns[1]).text()).toBe('Next');
    expect(angular.element(btns[4]).text()).toBe('Next');
    expect(angular.element(btns[7]).text()).toBe('Next');
  });

  it('answer buttons should be set', function() {
    var btns = elm.find('button');
    expect(angular.element(btns[2]).hasClass('answer-button')).toBe(true);
    expect(angular.element(btns[5]).hasClass('answer-button')).toBe(true);
    expect(angular.element(btns[8]).hasClass('answer-button')).toBe(true);
    expect(angular.element(btns[2]).text()).toBe('Answer');
    expect(angular.element(btns[5]).text()).toBe('Answer');
    expect(angular.element(btns[8]).text()).toBe('Answer');
  });

});
