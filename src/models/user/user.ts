import Meal from "../meal/meal";
import Review from "../review/review";

export default class User {
    name: string
    email: string
    phoneNumber: string
    location: string
    preferences: [string]
    mealsPrepared: [Meal]
    mealsPurchased: [Meal]
    reviews: [Review]

    constructor(name: string, email: string, phoneNumber: string, preferences: [string], mealsPrepared: [Meal], mealsPurchased: [Meal], reviews: [Review]){
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.preferences = preferences;
        this.mealsPrepared = mealsPrepared;
        this.mealsPurchased = mealsPurchased;
        this.reviews = reviews;
    }
}