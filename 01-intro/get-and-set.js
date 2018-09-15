const person = {
    name: 'Matt',
    surname: 'Ulmer',

    get fullName () {
        return this.name + ' ' + this.surname;
    },

    set fullName (fullName) {
        let parts = fullName.split(' ');
        this.name = parts[0];
        this.surname = parts[1];
    }
};

console.log(person.fullName);
console.log(person.fullName = 'Ben Thomas');
console.log(person.name);