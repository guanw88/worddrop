# worddrop

A twist on the classic game Tetris, where the player needs to create words from falling Scrabble tiles. Built in HTML5 and Canvas.

![WordDrop Game](http://www.george-wang.com/images/worddrop.gif "WordDrop in Action")


# What is WordDrop?
* Scrabble tiles fall from the top of the screen, like in Tetris. (You can toggle between 4 different letters per block by pressing the Up arrow or W.)
* Instead of gaining points by clearing rows, points are gained whenever a valid 4+ letter words are formed in a row or column.
* Blocks are highlighted when a 4+ letter word is formed and can be cleared by pressing space. (Scoring is based of Scrabble tile values.)

# Technical Features
* Used asynchronous animation frames and HTML5 Canvas to render game board and simulate “jerky” motion of Tetris drops
* Used custom keyhandler bindings to assign user inputs to move different tile pieces
* Implemented binary search to check if any combination of locked tiles were in a 250k+ word  Scrabble dictionary
