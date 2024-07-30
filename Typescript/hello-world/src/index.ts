let age: number = 20;

let arr: [number, number, string] = [1, 2, 'l'];
arr.push('l')

// Function
// ========
function calculateTax(income: number, taxYear: number = 2022): number{
     if(taxYear > 2022)
          return income * 1.2
     return income * 1.3
}

calculateTax(10_000, 2023)

// Exercises
function reverseString(para: string): string{
     let reversedArr: string[] = para.split("").reverse();
     return reversedArr.join('');
}
// console.log(reverseString('hello world'));

function timesString(str: string, times: number = 1){
     let generatedStr: string = str + " ";
     let timedString: string = generatedStr.repeat(times);
     return timedString;
}
// console.log(timesString('test', 10));

// xxx

// Objects
// =======
let employee: {
     readonly id: number,
     name: string,
     retire: (date: Date) => void
} = {
     id: 1,
     name: 'Wan',
     retire: (date: Date) => console.log(date)
}
// console.log(employee);

// xxx

// Type Alias
// ==========
type Employee = {
     readonly id: number,
     name: string,
     retire: (date: Date) => void
}

let employeeTypeAlias: Employee = {
     id: 1,
     name: 'Wan',
     retire: (date: Date) => console.log(date)
}

// xxx

// Union Types
// ===========

function kgToLb(weight: number | string): number{ // Union types
     // Narrowing
     if(typeof weight === 'number'){
          return weight * 2.2
     }else{
          return parseInt(weight) * 2.2
     }
}

// console.log(kgToLb(60));
// console.log(kgToLb('60kg'));

// xxx

// Intersection Types
// ==================

type Draggable = {
     drag: () => void
}

type Resizable = {
     resize: () => void
}

type UIWidget = Draggable & Resizable; // Intersection Types

let textBox: UIWidget = {
     drag: () => {},
     resize: () => {}
}

// xxx

// Literal Types(exact, specific) ***
// ==================================

type Quantity = 50 | 100; // Literal Types
let quantity: Quantity = 100;

type Metric = 'cm' | 'inch' // Literal types

// xxx

// Nullable Types
// ==============

function greet(name: string){
     console.log(name.toUpperCase());
}