class Person {
    constructor (name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    getFullName () {
        return this.name + ' ' + this.surname;
    }

    static older (person1, person2) {
        return (person1.age >= person2.age) ? person1 : person2;
    }
}

// Why class is better? EXTENDS

class PersonWithMiddleName extends Person {
    constructor (name, middlename, surname, age) {
        super(name, surname, age);
        this.middlename = middlename;
    }

    getFullName () {
        return this.name + ' ' + this.middlename + ' ' + this.surname;
    }
}

const p1 = new PersonWithMiddleName('matt', 'david', 'ulmer', '23');
console.log(p1.getFullName());

const p2 = new Person('olderMatt', 'ulmer', 30);

console.log(Person.older(p1, p2));