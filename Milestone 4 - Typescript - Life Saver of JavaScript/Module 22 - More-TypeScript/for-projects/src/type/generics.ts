// interface Response {
//     // data: any;
//     data: string | number | boolean | object | null;
//     status: number;
// };



interface Response<T> {
    data: T;
    status: number;
};

const transactionResponse: Response<string> = {
    data: 'Transaction successfull',
    status: 200
};

const transactionStatus: Response<boolean> = {
    data: true,
    status: 200
};

const transactionAmont:Response<number> = {
    data: 215,
    status: 401,
};

function getLength<T>(array: T[]): number {
    return array.length;
};

getLength(['', "", 4, 5]);




