# Angular Flashcards #

A directive to insert flashcards into an Angular application.

To use: 
1.  Copy and paste flashcard.js into your angular code.
2.  Copy and paste flashcard.css into your css code.
3.  Copy the icon to your image folder, or use your own.
4.  Add a json file with the title, and a list of cards (questions and answers).
5.  Place the directive into your application with attributes specifying the path to the icon and json file.

### Example Directive ###
    <div flashcards data='data/demo.json' src='img/card-icon.png'></div>

### Example Json ###
    { "title": "Test Cards",
      "cards": [
       {"question": "Do I live a trivial life?",
        "answer": "Why yes I do."
       },
       {"question": "Do shenanigans foobar?",
        "answer": "Sometimes."
       },
       {"question": "Sometimes there aren't any answers."
       },
       {"question": "Important question number four.",
        "answer": "Irrelevant answer number four."
       },
       {"question": "What are two great words?",
        "answer": "Fly Navy!"
       }
      ]
    }
