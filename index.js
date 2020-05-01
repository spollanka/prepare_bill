
//   input has to be in this form:
//   customer#posNr;item,amount,costPerUnit:item,amount,costPerUnit:item....
//   taxes are set to 20%
//   probably will add a feature for dynamic taxes later

class Bill {
    constructor(inputString) {
        this.timestamp = this.createTimestamp();
        this.positions = this.createPositions(inputString);
        this.customer = this.createCustomer(inputString);
        this.sum = this.calculateSum();
        this.taxes = this.calculateTaxes();
    }

    createCustomer(inputString) {
        var inputString = inputString.split("#");
        var customer = inputString[0];
        return customer;
    }

    createPositions(inputString) {
        //console.log(inputString);
        inputString = inputString.split("#");
        inputString = inputString[1];
        //console.log(inputString);
        inputString = inputString.split(";");
        var posCount = inputString[0];
        var billString = inputString[1];
        //console.log(billString);
        billString = billString.split(":");
        //console.log(billString);
        var positionString = billString[0].split(",");
        var positions = [new Position(positionString)];
        posCount = posCount - 1
        for(let i = 1; i <= posCount; i++) {
            positionString = billString[i].split(",");
            positions[i] = new Position(positionString);
        }
        //console.log(positions);
        return positions;
    }

    calculateSum() {
        var sum = 0;
        var pos = 0;
        var lastItem = false;

        while(lastItem == false) {
            sum = sum + this.positions[pos].price;
            pos++;
            if (typeof this.positions[pos] === 'undefined') {
                lastItem = true;
            }            
        }
        return sum;
    }

    calculateTaxes() {
        var tax = this.sum - ((this.sum / 120) * 100);
        return tax;
    }

    createTimestamp() {
        var timestampRaw = new Date();
        var timestamp = timestampRaw.getFullYear()+'.'+(timestampRaw.getMonth()+1)+'.'+timestampRaw.getDate()+' '+timestampRaw.getHours() + ":" + timestampRaw.getMinutes() + ":" + timestampRaw.getSeconds();
        return timestamp;
    }
};

class Position {
    constructor(positionString) {
        this.item = positionString[0];
        this.amount = positionString[1];
        this.price = positionString[2] * positionString[1];
    }
}
/*
function createBill(inputString) {
    var newBill = new Bill(inputString);
    return newBill;
}
var inputString = ("customer1#3;item1,4,5:item2,34,12:item3,23,8");
var Billy = createBill(inputString);
console.log(Billy.positions[1].item);
*/
function createBill(inputString) {
    var newBill = new Bill(inputString);
    return newBill;
}

module.exports.newBill = createBill;
/*
var inputString = ("customer1#3;item1,4,5:item2,34,12:item3,23,8");
var Billy = module.exports.newBill(inputString);
console.log(Billy.positions[1].item);
*/