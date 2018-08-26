function Person(name, surname, age) {
    this.name = name;
    this.surname = surname;
    this.age = age;
}

Person.prototype.getFullName = function () {
    return this.name + ' ' + this.surname;
};

Person.older = function(person1, person2) {
    return (person1.age >= person2.age) ? person1 : person2;
};

const p1 = new Person('matt', 'ulmer', 23);
console.log(p1.getFullName());

const p2 = new Person('olderMatt', 'ulmer', 30);

console.log(Person.older(p1, p2));