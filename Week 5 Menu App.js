/*********************** TIFA'S COFFEE & SNACKS MENU APP ******************/

class Item {                                              
    constructor(name) {                           
        this.name = name;
    }                                                         
}                                                                   

class Order {                                                       
    constructor(name) {                                     
        this.name = name;
        this.items = [];                                  
    }
}                                                               

class Menu {                                                   
    constructor() {
        this.orders = [];                                
        this.selectedOrder = null;                       
    }

    start() {                                            
        let selection = this.showMainMenuOptions();     

        while (selection != 0) {                    
        switch (selection) {    
            case '1':
                this.showMenu();
                break;                      
            case '2':
                this.createNewOrder();                               
                break;
            case '3':
                this.viewOrder();            
                break;
            case '4':                       
                this.deleteOrder();
                break;
            case '5':                       
                this.displayOrders();
                break;
            default:                        
                  selection = 0;
            }
            selection = this.showMainMenuOptions();      
        }
        alert ('Come back again soon!');                
    }

    showMainMenuOptions() {       
    return prompt(`  
    Welcome to Tifa's Coffee & Snacks! 
    Choose an option below:
    -----------------------               
        0) Not thirsty or hungry
        1) Show Menu
        2) Create New Order
        3) View Order
        4) Delete Order
        5) Display Orders
        `);
    }

    showOrderMenuOptions(orderInfo) {  
    return prompt (`
        0) Go Back
        1) Add an Item
        2) Delete an Item
    -------------------------
        ${orderInfo}
    `);
    }

    showMenu() {
        alert(`
                            Menu Items
        ----------------------------------------------------
        Drinks:                         Snacks:
        - Chocobean Latte               - Ifrit's Flaming Sandwich
        - MP Espresso                   - Titan's Scrumptious Scramble
        - Cactuar Cold Brew             - Healer Healthy Salad
        `);       
    }

    displayOrders() { 
        let orderString = '';        
        for (let i = 0; i < this.orders.length; i++) {        
        orderString += i + ' # - ' + this.orders[i].name + '\n';      
    }                                                              
        alert(orderString);                                      
    }

    createNewOrder() {                          
        let name = prompt('What name should the order be under?');      
        this.orders.push(new Order(name));
        this.selectedOrder = this.orders[this.orders.length-1]
        this.addAnItem();
        alert('Thanks for the order! We will get to work on that straight away!');
    
    }                                 

    viewOrder() {                                
        let index =  prompt('What is the order number you want to view?');
        if (index > -1 && index < this.orders.length) { 
            this.selectedOrder = this.orders[index];

            let description = 'Order Name: ' + this.selectedOrder.name + '\n';    

        for(let i = 0; i < this.selectedOrder.items.length; i++) {     
                description += i + ' # - ' + this.selectedOrder.items[i].name + '\n';                                                      
            }

        let selection = this.showOrderMenuOptions(description);       
        switch (selection) {                                       
            case '1':                                       
                this.addAnItem();                        
                break;
            case '2':
                this.deleteAnItem();
            }
        }
    }

    deleteOrder() {                              
        let index = prompt('What is the order number you want to delete?');     
        if (index > -1 && index < this.orders.length) {       
            this.orders.splice(index, 1);
            alert('Your order has been deleted. Let us know what we can do to better serve you!');               
        }
    }

    addAnItem() {            
        let name = prompt(`What would you like to add to your order?
        ----------------------------------------------------
        Menu Items
        ----------------------------------------------------
        Drinks:                         Snacks:
        - Chocobean Latte               - Ifrit's Flaming Sandwich
        - MP Espresso                   - Titan's Scrumptious Scramble
        - Cactuar Cold Brew             - Healer Healthy Salad`);     
    
        this.selectedOrder.items.push(new Item(name));
                                                             
    }

    deleteAnItem() {        
        let index = prompt('What is the item number you want to delete from this order?');   
        if(index > -1 && index < this.selectedOrder.items.length) {     
            this.selectedOrder.items.splice(index, 1);      
    }
}
}

let menu = new Menu();
menu.start();

let cloudsOrder = new Order('Cloud');
cloudsOrder.items.push('Chocobean Latte');
console.log(cloudsOrder);
