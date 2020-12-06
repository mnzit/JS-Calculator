class Calculator {
    operations = new Map();
    numbers = [];

    constructor() {
        this.setOperations("+", (x, y) => x + y);
        this.setOperations("-", (x, y) => x - y);
        this.setOperations("*", (x, y) => x * y);
        this.setOperations("/", (x, y) => x / y);
        this.setOperations("%", (x, y) => x % y);
    }

    init(...initNumbers) {
        this.numbers = [...this.numbers, ...Array.from(initNumbers)];
        return this;
    }

    setOperations(type, operation) {
        this.operations.set(type, operation);
    }

    operators() {
        return `Operators allowed: [${Array.from(this.operations.keys())}]`;
    }

    calculate() {
        return this.numbers[0];
    }

    peep(perform) {
        perform(this.numbers);
        return this;
    }

    map(perform) {
        this.numbers = this.numbers.map(perform);
        return this;
    }

    do(type, ...numbers) {
        this.numbers = [...this.numbers, ...Array.from(numbers)];
        this.process(type);
        return this;
    }

    process(type) {
        let operation = this.operations.get(type);
        if (operation) {
            console.log(`Input: ${this.numbers.join(` ${type} `)}`);
            this.numbers = [this.numbers.reduce(operation)];
            console.log(`Output: ${this.numbers}`);
        } else {
            throw new Error(`Operation not found. Check available operation with .operators`);
        }
    }
}

let calculator = new Calculator();

console.log(calculator.operators());
calculator.setOperations("^", (x, y) => Math.pow(x, y));
console.log(calculator.operators());

calculator
    .init(1, 2, 3, 4, 5, 6)
    .peep((numbers) => console.log(numbers))
    .map(number => number * 1)
    .peep((numbers) => console.log(numbers))
    .do("*", 2)
    .do("-", 4)
    .do("^", 2)
    .do("/", 2)
    .do("+", 7)


    .calculate();

