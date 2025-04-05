// project.js - purpose and description here
// Author: Grace Herman
// Date: April 4, 2025

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

// In experiment1/project.js replace the contents of main() with your JS sketch from glitch.com
function main() {
  /*// create an instance of the class
  let myInstance = new MyProjectClass("value1", "value2");

  // call a method on the instance
  myInstance.myMethod();*/

  const fillers = {
    You: ["My dude", "Bro", "You", "Hooman", "Giraffe", "Giant tree", "Servant"],
    pre: ["Fra", "Tro", "Gre", "Pan", "Ast", "Ara"],
    post: ["gria", "ston", "gott","-on-the-lee", "ora", "Ara", "uwu"],
    activity: ["rob their snack cabinet", "steal food", "slime the computer", "nom chips", "sleep", "play games", "eat brains"],  
    location: ["in my bottle", "in jail", "at the floor with legs(table)", "on dirt", "in a teacup", "bedroom", "on big cushy pillow (couch)"],
    place:["UCSC", "Wes' classroom", "downtown", "Player 2's house", "Jeff's mushroom", "The White House", "hooman's grocery store", "snack stash", "food cabinet"], 
    people: ["two legged giraffe", "帥氣", "cat", "Grace", "Player 1", "Wes", "bork bork"],
    item: ["backpack", "baggie", "switch", "laptop", "book", "my mouth", "potato chips", "pocket", "my head"],
    io: ["on", "in"], 
    time: ["0", "1", "2", "3", "5", "7", "8", "9", "10", "11", "12"], 
    setting: ["PM", "AM", "in the morning", "night time"], 
    food: ["potatoes", "chips", "cookies", "sushi", "spaghetti", "candy", "fruit juice", "soup", "pizza", "cheezy cheese", "creamy mac and cheese", "Jeff"], 
    chaos: ["chaos", "destruction", "lots and lots of confetti", "sprinkle glitter", "slime"],
    yum: ["sweet sweet", "valuable", "sweaty", "heheheh", "precious", "nom incucing", "shiny", "juicy", "yummy delicious", "complete garbage"],
    message: ["call", "txt", "post", "story", "shoutz", "me", "yum", "...wait, no! Come back", "Watermelon"],
    
  };
  
  const template = `$You, listen to my $message!

  I'm taking you with me to $place where we will $activity. We will need to get $food in order to do the $activity.

  I've been stuck $location for days now. I'm growing bored! You and I will go to $people to steal their $food, $food, and $food.

  When we get there, we will $activity $location to create $chaos. Once that's done then we shall crash at their place. We can hail a cab if $people finds us.

  $pre$post $yum $food! Be ready at $time $setting, I will pick you up $io my $item (I may be small but I can carry you). 
  (P.S Eat this note)
  
  - Steve hehe >:3
`;
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    //box.innerText = story;
    $("#box").text(story);
  }
  
  /* global clicker */
  //clicker.onclick = generate;
  $("#clicker").click(generate);
  
  generate();
}

// let's get this party started - uncomment me
main();