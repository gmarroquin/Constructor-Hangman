//function to initiate the game
prompt.start();

//Word bank
hangman = {
    wordBank: [
        'Otis',
        'Notorious',
        'Obama',
        'Selena',
        'Drake',
        'Ghandi',
        'Licorice'
    ],
    wordsRight: 0,
    remainingGuesses: 10,
    initialWord: null,

    //Randomize words to start game 
    startGame: function() {
        this.resetGuesses();
        this.initialWord = new Word(this.wordBank[Math.floor(Math.random() * this.wordBank.length)]);
        this.initialWord.getLet();
        this.promptUser();
    },

    //Resets the number of guesses the player has
    resetGuesses: function() {
        this.remainingGuesses = 10;
    },

    //that is being used because of scope - this was previously used and in order to call this  
    //it helps to identify it by another name to deal with the correct this  
    promptUser: function() {
        var that = this;
        prompt.get(['guessLet'], function(err, result) {
            console.log("You guessed: " + result.guessLet);
            var guessesMade = that.initialWord.checkLetter(result.guessLet);

            if (guessesMade == 0) {
                console.log("INCORRECT");
                that.remainingGuesses--;

            } else {
                console.log("CORRECT");
                if (that.initialWord.findWord()) {
                    console.log("You won!");
                    console.log("-----");
                    return;
                }
            }

            //prompt alerting remaining guesses per game
            //if amount of incorrect guesses is up --> game over 
            console.log("Guesses remaining: " + that.remainingGuesses);
            console.log("-----");
            if ((that.remainingGuesses > 0) && (that.initialWord.found == false)) {
                that.promptUser();
            } else if (that.remainingGuesses == 0) {
                console.log("Game over", that.initialWord.target);
            } else {
                console.log(that.initialWord.wordRender());
            }
        });

    }


};

hangman.startGame();