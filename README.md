# worddrop

A twist on the classic game Tetris, where the player needs to create words from falling Scrabble tiles. Built in HTML5 and Canvas.

[Click here to play WordDrop!](https://guanw88.github.io/worddrop)

![WordDrop Game](http://www.george-wang.com/images/worddrop.gif "WordDrop in Action")


# What is WordDrop?
* Scrabble tiles fall from the top of the screen, like in Tetris. (You can toggle between 4 different letters per block by pressing the Up arrow or W.)
* Instead of gaining points by clearing rows, points are gained whenever a valid 4+ letter words are formed in a row or column. (Players need to press SPACE to clear words, in case they want to make longer words.)
* Blocks are highlighted when a 4+ letter word is formed and can be cleared by pressing space. (Scoring is based of Scrabble tile values.)

# Gameplay and Technical Features
* Tiles are generated from the American English Scrabble tileset distribution, as opposed to a uniform random distribution. (This makes it easier to generate valid words.)
* Asynchronous animation frames are used to render the game board and simulate “jerky” motion of Tetris drops. The interval of drops decreases dynamically as the game proceeds. (I.e., the game speeds up as the difficulty increases.)
* Custom keyhandler bindings were used to assign user inputs to move different tile pieces. 
* A binary search of the 250k+ Scrabble dictionary is used to check if any combination of tiles are valid words. (Left to right, right to left, top to bottom, and bottom to top are all checked.)
* Scores are assigned based on the point values of the Scrabble tiles, with additional bonus points given for longer words.
