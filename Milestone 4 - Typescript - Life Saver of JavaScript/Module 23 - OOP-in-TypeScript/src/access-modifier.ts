/**
 * balance
 * pin
 * phone number
 * history
 * 
*/


// access modifier: public, private, protected
class bKashAccount {
    public phone: string
    private balance: number
    private pin: number
    protected history: any = []
    constructor (phone: string, balance: number, pin: number) {
        this.phone = phone
        this.balance = balance
        this.pin = pin
    }

    getBalance(pin:number) {
        if (this.pin === pin) {
            return this.balance
        }
        return `PIN is wrong!`
    }
}

const bKashAcc = new bKashAccount('01326157012', 5000, 1234)
// bKashAcc.balance = 0
// bKashAcc.history

console.log(bKashAcc.getBalance(123))
console.log(bKashAcc.getBalance(1234))