const readline = require('readline-sync');

const TARGET_SCORE = 21;
const DEALER_STAY = 17;

function lineBreak() {
    console.log('');
}

function randomizeDeck(deck) {
    for (let index = 0; index < deck.length; index++) {
        let randomIndex = Math.floor(Math.random() * deck.length);
        let temp = deck[index];
        deck[index] = deck[randomIndex];
        deck[randomIndex] = temp;
    }
    return deck;
}

function createDeck() {
    let deck = [];
    let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10',
                    'Jack', 'Queen', 'King', 'Ace'];
    
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
        deck.push([suits[suitIndex], values[valueIndex]]);
        }
    }
    
    return randomizeDeck(deck);
}

function dealCard(deck) {
    return deck.pop();
}

function dealCards(deck, playerDeck, dealerDeck) {
    playerDeck.push(dealCard(deck));
    playerDeck.push(dealCard(deck));
    dealerDeck.push(dealCard(deck));
    dealerDeck.push(dealCard(deck));
}

function specialJoin(arr, isDealer=false) {
    const newArr = arr.map(card => card[1]);
    return newArr.slice(0, arr.length - 1).join(', ') + ' and ' + `${isDealer ? 'unknown card' : newArr[arr.length - 1]}`;
}

function displayCards(playerDeck, dealerDeck, hideDealerCard=true) {
    console.log(`Dealer ${!hideDealerCard ? 'had': 'has'}: ${specialJoin(dealerDeck, hideDealerCard)}`);
    console.log(`You ${!hideDealerCard ? 'had' : 'have'}: ${specialJoin(playerDeck)}`);
    lineBreak();
}

function getCardValue(card) {
    if (['Jack', 'Queen', 'King'].includes(card[1])) {
        return 10;
    } else if (card[1] === 'Ace') {
        return 11;
    } else {
        return parseInt(card[1], 10);
    }
}

function calculateTotal(deck) {
    let total = 0;
    let aceCount = 0;

    deck.forEach(card => {
        if (card[1] === 'Ace') {
            aceCount += 1;
        }
        total += getCardValue(card);
    });

    while (total > TARGET_SCORE && aceCount > 0) {
        total -= 10;
        aceCount -= 1;
    }

    return total;
}


while (true) {
    console.clear();

    const INITIAL_DECK = createDeck();
    const PLAYER_DECK = [];
    const DEALER_DECK = [];
    let isPlayerBusted = false;
    let isDealerBusted = false;
    let isPlayerStay = false;
    let isDealerStay = false;

    dealCards(INITIAL_DECK, PLAYER_DECK, DEALER_DECK);
    displayCards(PLAYER_DECK, DEALER_DECK);

    let playerTotal = calculateTotal(PLAYER_DECK);
    let dealerTotal = calculateTotal(DEALER_DECK);

    while (!isPlayerBusted && !isPlayerStay) {
        let answer = readline.question('Do you want to hit or stay? (h or s) ');
        if (answer === 'h' || answer === 's') {
            if (answer === 'h') {
                PLAYER_DECK.push(dealCard(INITIAL_DECK));
                playerTotal = calculateTotal(PLAYER_DECK);
                displayCards(PLAYER_DECK, DEALER_DECK, true);
                if (playerTotal > TARGET_SCORE) {
                    console.log('You busted!');
                    lineBreak();
                    displayCards(PLAYER_DECK, DEALER_DECK, false);
                    console.log('Dealer wins!');
                    isPlayerBusted = true;
                }
            } else {
                isPlayerStay = true;
            }
            
        } else {
            console.log('Invalid input. Please enter h or s.');
            lineBreak();
            continue;
        }
    }

    if (!isPlayerBusted) {
        while (dealerTotal < DEALER_STAY) {
            DEALER_DECK.push(dealCard(INITIAL_DECK));
            dealerTotal = calculateTotal(DEALER_DECK);
        }

        if (dealerTotal > TARGET_SCORE) {
            console.log('Dealer busted!');
            lineBreak();
            displayCards(PLAYER_DECK, DEALER_DECK, false);
            console.log('You win!');
            isDealerBusted = true;
        } else {
            isDealerStay = true;
        }
    }

    if (isDealerStay && isPlayerStay) {

        if (playerTotal > dealerTotal) {
            console.log('You win!');
            lineBreak();
        } else if (playerTotal < dealerTotal) {
            console.log('Dealer wins!');
            lineBreak();
        } else {
            console.log('It\'s a tie!');
            lineBreak();
        }
        displayCards(PLAYER_DECK, DEALER_DECK, false);
    }

    while (true) {
        let answer = readline.question('Do you want to play again? (y or n) ');
        if (answer === 'y' || answer === 'n') {
            if (answer === 'n') {
                console.log('Thanks for playing Twenty-One!');
                lineBreak();
                return;
            } else {
                break;
            }
        } else {
            console.log('Invalid input. Please enter y or n.');
            lineBreak();
            continue;
        }
    }
}

