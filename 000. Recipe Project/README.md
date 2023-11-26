# RecipeProject

This Angular Application was created as a part of the ["Angular - The Complete Guide"](https://www.udemy.com/course/the-complete-guide-to-angular-2/) Udemy Course by Maximilian Schwarzmüller. 

If you are new to Angular, I highly recommend you to go over the rest of the sections to get a good understanding of the basics.

In this application, we have three main pages - 

    1. Recipes
    2. Shopping List
    3. Authentication

## RECIPES PAGE

The Recipes page shows all the Recipes and you can add/edit/remove Recipes from this page. 

## SHOPPING LIST PAGE

The Shopping List page shows a list of ingredients and for each Recipe, you will find a button that says "Add to Shopping List". This option lets you move all the ingredients of that Recipe to the Shopping List. Just like the Recipes, you can add/edit/remove ingredients from the Shopping List page.

## AUTHENTICATION PAGE

This page is the first page that shows up if you are not already authenticated. You can signup or login to your account via this page and only if you are authenticated, you can access and use the application.

# THE BACKEND

This project focuses on Angular so the backend is not created by us and instead, we use Google's Firebase to have a Realtime Database for our Recipes and also for Authentication. Make sure you provide your own API key in the "environments.ts" and "environment.development.ts" files whenever you clone this project on your system otherwise the calls to the Firebase Realtime Database will fail.

# ANGULAR CONCEPTS USED IN THE PROJECT

The main focus of this project is to get a hands-on experience with all the main Angular concepts. This project uses these concepts - 

    - Data Binding
    - Directives
    - Services
    - Routing
    - RxJS Observables and Operators
    - Template Driven Forms
    - Reactive Forms
    - Pipes
    - HttpClient
    - Authentication
    - Route Guards
    - Dynamic Components
    - Angular Modules
    - Lazy Loading
    - Pre-Loading
    - Providing Services
    - And more........

