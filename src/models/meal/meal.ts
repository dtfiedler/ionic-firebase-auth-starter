import User from '../user/user';

export default class Meal {
    ingredients: [string];
    preparer: User;
    dateMade: Date;
    expirationDate: Date;
    description: string;
    glutenFree: boolean;
    dairyFree: boolean;
    cultureType: string;
    location: string;
    image: string

    constructor(preparer: User, ingredients: [string], dateMade: Date, expirationDate: Date, description: string, image: string) {
        this.preparer = preparer;
        this.ingredients = ingredients;
        this.dateMade = dateMade;
        this.expirationDate = expirationDate;
        this.description = description
        this.image = image
    }

    getPreparer(){
        return this.preparer;
    }

    getDateMade(){
        return this.dateMade;
    }

    getExpirationDate(){
        return this.expirationDate;
    }

    getIngredients(){
        return this.ingredients;
    }
}
