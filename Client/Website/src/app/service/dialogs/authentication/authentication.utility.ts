


export function validateEmail(email: string) {
    const expression = /^[A-Za-z](\w|\.|_)*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const result: boolean = expression.test(email);

    return result;
}

export function validatePassword(password: string) {
    const expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const result: boolean = expression.test(password);

    return result;
}

export function parseDate(date: Date) {

    const year = date.getFullYear().toString();
    const month = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
    const day = (date.getDate() < 10 ? "0" : "") + date.getDate();
    return `${year}-${month}-${day}`

}