let value: unknown;

// value.toUpperCase();
// value.toFixed(2);

let myValue = value as string;
const uppi = myValue.toUpperCase();

const yourValue = value as number;
yourValue.toFixed(2);

let data: unknown;
interface User {
    name: string;
    email?: string;
};

const userData = data as User;
userData.name;



// as const 

const kamruzzaman: User = {
    name: 'Kamruzzaman Kamruzzaman',
    email: 'kam@sizerland.com'
} as const;

kamruzzaman.name = 'bogda kamru';
