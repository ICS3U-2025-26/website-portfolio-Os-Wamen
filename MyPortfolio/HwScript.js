let BestNum = 67;
let year = 2025;
let war = 2;
let CorrectNum = 0



let Quest1 = prompt("What is the best number?");

if (Quest1 == BestNum) {
    alert("That is correct!");
    CorrectNum = CorrectNum + 1;
} else {
    alert("Incorrect");
}

let Quest2 = prompt("What year is it?");

if (Quest2 == year) {
    alert("That is correct!");
    CorrectNum = CorrectNum + 1;
} else {
    alert("Incorrect");
}

let Quest3 = prompt("How many world wars have we had?");

if (Quest3 == war) {
    alert("That is correct!");
    CorrectNum = CorrectNum + 1;
} else {
    alert("Incorrect");
}

let ColorAns = confirm("Is the sky green?");

if (ColorAns == false) {
    alert("Correct!");
    CorrectNum = CorrectNum + 1;
} else {
    alert("Incorrect");
}

let KAns = confirm("Is a fork found in a kitchen");

if (KAns == true) {
    alert("Correct!");
    CorrectNum = CorrectNum + 1;
} else {
    alert("Incorrect");
}

alert(`Your final score is ${CorrectNum}/5.`);