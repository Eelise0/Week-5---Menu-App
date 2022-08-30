/*********************** TIFA'S COFFEE & SWEETS MENU APP******************/

class Item {                                              ///this is the beginning of the Player class///
    constructor(name, type) {                           ///this sets up the blueprint for anything under this class///
        this.name = name;
        this.type = type;
    }

    describe() {                            ///this is method applies only under this specific class. It is similiar to a function///
        return `${this.name} is a ${this.type}.`;              ///${...} is short hand for concatenation///
    }                                                               ///back ticks allow type to exactly as we want it displayed///
}                                                                   ///this is the end of the Player class///

class Order {                                                   ///this is the beginning of the Team class///
    constructor(name) {                                     ///this sets up the blueprint for anything under this class///
        this.name = name;
        this.items = [];                                  ///Players will be stored in an array///
    }

    addItem(item) {                                       ///1st method under Team Class///
        if (item instanceof Item) {             //if player is a child class of Player parent class
            this.items.push(item);          //Push entered player to players array for that team
        } else {                                //if anything else is entered, throw this error below
            throw new Error (`You can only add an instance of Item. Argument is not a item: ${item}`);
        }
    }

    describe() {                                               ///2nd method under Team Class///
        return `${this.order} has ${this.items.length} items.`; //if we call TEAM.NAME.DESCRIBE(); it should show us the name of the team and how many players it has
    }
}                                                               ///this is the end of the Team class///

class Menu {                                                   ///This is the beginning of Menu Class///
    constructor() {
        this.orders = [];                                ///Teams will be stored in an array///
        this.selectedOrder = null;                       ///Selected Teams is set to Null for now till there is user input///
    }

    start() {                                            ///Method: Start Menu//
        let selection = this.showMainMenuOptions();     //Selection references the method showMainMenuOptions...its a method within a method

        while (selection != 0) {                    //while input is anything but 0, run the loop//
        switch (selection) {                          //the switch statement given the user a selection of options///
            case '1':
                this.createNewOrder(); 
                                               //if they type 1, this will take them to the create Team method below//
                break;
            case '2':
                this.viewOrder();            //if they type 2, they will go to the View Team method below
                break;
            case '3':                       //if they type 3, they will go to delete team method below
                this.deleteOrder();
                break;
            case '4':                       //if they type 4, they will go to display team method below
                this.displayOrders();
                break;
            default:                        //if they don't select 1-4, then the default selection will be 0.
                  selection = 0;
            }
            selection = this.showMainMenuOptions();     //the selection option is shown again to keep the loop going 
        }
        alert ('Come back again soon!');                 //if 0 is selected, it will leave the loop and print goodbye
    }

    showMainMenuOptions() {       //this Method displays a message and presents an opportunity for input, this method is used above//
    return prompt(`  
    Welcome to Tifa's Coffee & Sweets! 
    Choose an option below:
    -----------------------               
        0) Not thirsty or hungry
        1) Create New Order
        2) View Order
        3) Delete Order
        4) Display Orders
        `);
    }

    showOrderMenuOptions(orderInfo) {  //Method appears when in View Team & gives the user option to select. Which ever team choosen is displayed in teamInfo//
    return prompt (`
        0) Go Back
        1) Add an Item
        2) Delete an Item
    -------------------------
        ${orderInfo}
    `);
    }

    displayOrders() {        //Method to display all Teams
        let orderString = '';        //Empty string is made
        for (let i = 0; i < this.orders.length; i++) {       //For loop iterates through the Teams array 
        orderString += i + ') ' + this.orders[i].name + '\n';     //Concatenates the empty string w/ the # entered & Team name it currently is iterating through
    }                                                              //then adds a new line with \n.
        alert(orderString);                                      //alert, same as console log, TeamString to show the #) Team Name
    }
    createNewOrder() {                          //method to create a new team, used in Team Menu method
        let name = prompt('What name should the order be under?');      //Prompts user to input a team name and sets variable to name
        this.orders.push(new Order(name));                                 //Pushes new team name, established under Teams Class, to the Teams array
    }

    viewOrder() {                                //Method to view team, used in Team Menu
        let index =  prompt('What is the order number you want to view?'); //Prompts user to input the index # for team looking for and sets that as vairable for index//
        if (index > -1 && index < this.orders.length) {         //For loop to iterate, looking for # entered greater than -1 & less than length fo teams array//        
            this.selectedOrder = this.orders[index];          //Sets var Selected Team to whatever index/# selected in the Teams array//
            let description = 'Order Name: ' + this.selectedOrder.name + '\n';    //Sets var description to concatenate Team Name & the currently selected Teams name and \n after//
        
            for(let i = 0; i < this.selectedOrder.items.length; i++) {     //For loop will iterate through array of Players for that selected team//
                description += i + ') ' + this.selectedOrder.items[i].name   //Description var is set to #/index & 
                + ' - ' + this.selectedOrder.items[i].type + '\n';             //player's name & players position with a \n after//
            }

        let selection = this.showOrderMenuOptions(description);      //method calls the Show Team Menu Option method and sets the value passed in 
        switch (selection) {                                       //as the value for Selection
            case '1':                                       //switch statement and uses input from user to select one of the 3 options
                this.addAnItem();                        //each option will take the user to a different method
                break;
            case '2':
                this.deleteAnItem();
            }
        }
    }

    deleteOrder() {                              //Method to delete a team, used in the Start method
        let index = prompt('What is the order number you want to delete?');     //sets var index to what the user enters after prompt//
        if (index > -1 && index < this.orders.length) {       //if statement, searches through Teams array if #/index entered is < -1 & > length of teams array//
            this.orders.splice(index, 1);               //Once the index is found in the array, splice/remove it from the array at that index, only one element
        }
    }

    addAnItem() {            //method to add a new player, used in the show team menu options //
        let name = prompt('What is the name of the item you want to add?');     //prompts user to input a name for the player and sets this to name var
        let type = prompt('What type of item is it?');       //prompts user to input position for the player ad sets this to position var
        this.selectedOrder.items.push(new Item(name, type));
                                                                  //in currently selected team menu, push newly made player to the array of Players for that team
    }

    deleteAnItem() {        //method to delete players, used in team menu options method//
        let index = prompt('What is the item number you want to delete from this order?');   //prompt user to input index/# of player they want to delete and save it index var
        if(index > -1 && index < this.selectedOrder.items.length) {     //if statement, if index is < -1 & > length of the selected teams players array, run the statement
            this.selectedOrder.items.splice(index, 1);      //for the selected teams, player undex that was selected, splice/remove that player
        }
    }
}
let menu = new Menu();
menu.start();