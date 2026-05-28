import random

with open("chatarewecooked (1).txt", "r") as file:
    words = file.read().splitlines()

random_word = random.choice(words).upper()


input("WELCOME TO DIDDY'S WORDLE! PRESS ENTER TO START")
input("YOU HAVE 6 TRIES TO GUESS A 5 LETTER WORD. PRESS ENTER TO CONTINUE")
print("YOUR WORD HAS BEEN SELECTED. GOOD LUCK!")
#

for attempt in range(1, 7):
    guess = input(f"Attempt {attempt}/6 - Enter your guess: ").upper()

    if len(guess) != 5:
         print("HEY enter a five letter word u stupid diddy blud")
         continue

    result = ["⬜"]*5
    remaining_letters = list(random_word) # to keep track of letters that have been matched

    for i in range(5):
        if guess[i] == random_word[i]:
            result[i] = ("🟩") #this is if it is at the right place with the right letter
            remaining_letters[i] = None #remove matched letter from remaining letters

    for i in range(5):
            if result[i] == "⬜" and guess[i] in remaining_letters:
                 result[i] = "🟨"
                 remaining_letters[remaining_letters.index(guess[i])] = None

    print("".join(result))

    if guess == random_word:
        print("Correct word!!!")
        break
    if attempt == 6:
        print(f"Attempt finished the word was {random_word}")



# what is this diddy blud doing on the calculator?
# IS blud einstein
# bro why would u say that
#Ai btw
#TS is so f
#uckin dumb
# ai lock in dawg what
# WDYM YEA BRO
# STOP THE GLAZE SYBAU
# self hatred is BAD
# does he know?
# how old is this ai dawg unc mad
# SYBAU
# oh my bad
# SYBAU
# DUDE YOU'RE THE AI
# ?????
# this diddy blud is NOT einstein
# is diddy blud epstein?
# DUDE
# STOP IT
# STOP ITS NOT FUNNY ANYMORE
# certified ragebait
# STOP IT
# IS THIS RAGEBAIT
# ok wait.... we lock in?
# ummmmm
# ok ok i will
# are you nonchalant
# i thikn this diddy blud is epstein
# i thinkk this diddy blud is einsteinn
# i think we are gonna turn him into khaby lame mechanism
# WHAT IS THIS DIDDY BLUD DOINGGGGGGGG
# crazy i was crazy once they locked me in a room a rubber room a rubber room with rats and rats make me crazy crazy? i was crazy once
# ai are you there
