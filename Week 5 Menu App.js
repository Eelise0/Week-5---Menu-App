// class Dog {
//     constructor (name, gender, breed, favoriteTreat) {
//         this.name = name;
//         this.gender = gender;
//         this.breed = breed;
//         this.favoriteTreat = favoriteTreat;
//     }

//     introduce() {
//        console.log(`${this.name} is a ${this.gender} dog and their breed is ${this.breed}.`);
//     }
    
// }

// let dog1 = new Dog('Barry', 'male', 'Shiba Inu', 'hot dogs');
// let dog2 = new Dog('Iroh', 'male', 'Chow-Chow', 'peanut butter');

// dog1.introduce();
// dog2.introduce(); 







class Player {                                              ///this is the beginning of the Player class///
    constructor(name, position) {                           ///this sets up the blueprint for anything under this class///
        this.name = name;
        this.position = position;
    }

    describe() {                            ///this is method applies only under this specific class. It is similiar to a function///
        return `${this.name} plays ${this.position}.`;              ///${...} is short hand for concatenation///
    }                                                               ///back ticks allow type to exactly as we want it displayed///
}                                                                   ///this is the end of the Player class///

class Team {                                                   ///this is the beginning of the Team class///
    constructor(name) {                                     ///this sets up the blueprint for anything under this class///
        this.name = name;
        this.players = [];                                  ///Players will be stored in an array///
    }

    addPlayer(player) {                                       ///1st method under Team Class///
        if (player instanceof Player) {
            this.players.push(player);
        } else {
            throw new Error (`You can only add an instance of Player. Argument is not a player: ${player}`);
        }
    }

    describe() {                                               ///2nd method under Team Class///
        return `${this.name} has ${this.players.length} players.`;
    }
}                                                               ///this is the end of the Team class///

class Menu {                                                   ///This is the beginning of Menu Class///
    constructor() {
        this.teams = [];                                ///Teams will be stored in an array///
        this.selectedTeam = null;                       ///Selected Teams is set to Null for now till there is user input///
    }

    start() {                                            ///Method: Start Menu//
        let selection = this.showMainMenuOptions();     //Selection references the method showMainMenuOptions...its a method within a method

        while (selection != 0) {                    //while input is anything but 0, run the loop//
        switch (selection) {                          //the switch statement given the user a selection of options///
            case '1':
                this.createTeam();          //if they type 1, this will take them to the create Team method below//
                break;
            case '2':
                this.viewTeam();            //if they type 2, they will go to the View Team method below
                break;
            case '3':                       //if they type 3, they will go to delete team method below
                this.deleteTeam();
                break;
            case '4':                       //if they type 4, they will go to display team method below
                this.displayTeams();
                break;
            default:                        //if they don't select 1-4, then the default selection will be 0.
                  selection = 0;
            }
            selection = this.showMainMenuOptions();     //the selection option is shown again to keep the loop going 
        }
        alert ('Goodbye!');                 //if 0 is selected, it will leave the loop and print goodbye
    }

    showMainMenuOptions() {       //this Method displays a message and presents an opportunity for input, this method is used above//
    return prompt(`                 
        0) Exit
        1) Create New Team
        2) View Team
        3) Delete Team
        4) Display Teams
        `);
    }

    showTeamMenuOptions(teamInfo) {
    return prompt (`
        0) Back
        1) Create Player
        2) Delete Player
    -------------------------
        ${teamInfo}
    `);
    }

    displayTeams() {
        let teamString = '';
        for (let i = 0; i < this.teams.length; i++) {
        teamString += i + ') ' + this.teams[i].name + '\n';
    }
        alert(teamString);
    }
    createTeam() {
        let name = prompt('Enter name for new team:');
        this.teams.push(new Team(name));
    }

    viewTeam() {
        let index =  prompt('Enter the index of the team you wish to view:');
        if (index > -1 && index < this.teams.length) {
            this.selectedTeam = this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name + '\n';
        
            for(let i = 0; i < this.selectedTeam.players.length; i++) {
                description = description + i + ') ' + this.selectedTeam.players[i].name 
                + ' - ' + this.selectedTeam.players[i].position + '\n';
            }

        let selection = this.showTeamMenuOptions(description);
        switch (selection) {
            case '1':
                this.createPlayer();
                break;
            case '2':
                this.deletePlayer();
            }
        }
    }

    deleteTeam() {
        let index = prompt('Enter the index of the team you wish to delete:');
        if (index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
    }

    createPlayer() {
        let name = prompt('Enter name for new player:');
        let position = prompt('Enter position for new player:');
        this.selectedTeam.players.push(new Player(name, position));
    }

    deletePlayer() {
        let index = prompt('Enter the index of the player you wish to delete: ');
        if(index > -1 && index < this.selectedTeam.players.length) {
            this.selectedTeam.players.splice(index, 1);
        }
    }
}
let menu = new Menu();
menu.start();