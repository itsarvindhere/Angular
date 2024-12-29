import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../Recipe.model';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css'],
    standalone: false
})
export class RecipeEditComponent implements OnInit{

  recipeId !: string;

  // Check if we are editing a recipe or creating a new recipe
  editFlow = false;

  // Form
  recipeForm !: FormGroup;

  // Recipe details that we get from edit flow
  recipe !: Recipe;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router){}

  ngOnInit() {
    this.route.params.subscribe(params => {

      // If there is an ID
      if (params['id']) {
        this.recipeId = params['id'];
        this.editFlow = true;

        // Get the Recipe by its id
        this.recipe = this.recipeService.getRecipe(this.recipeId);

        // Initialize the form each time params change
        this.initForm();
      }
    });

    // Initialize Form for add flow
    if (!this.editFlow) this.initForm();
  }

  // Initialize the form
  private initForm() {

    // If we are in edit flow, then we will pre-populate the fields
    const recipeName = this.editFlow ? this.recipe.name : '';
    const recipeImage = this.editFlow ? this.recipe.imagePath : '';
    const recipeDescription = this.editFlow ? this.recipe.description : '';

    // Note that "ingredients" property in our FormGroup is a Form Array where each value is a FormGroup
    let recipeIngredients: FormGroup[] = []

    // So, we build this array of Form Groups based on the ingredients of the Recipe we are editing
    if (this.editFlow) {
      this.recipe.ingredients.forEach(recipe => {
        const formGroup = new FormGroup({
          name: new FormControl(recipe.name, Validators.required),
          amount: new FormControl(recipe.amount, [Validators.required, Validators.min(1)])
        });

        recipeIngredients.push(formGroup);
      })
    }


    // Define the Form Group
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imageURL: new FormControl(recipeImage, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: new FormArray(recipeIngredients)
    });
  }

  // On Form Submission
  onRecipeAddOrEdit() {
    console.log(this.recipeForm.value)

    // Create the Recipe Object
    const recipe: Recipe = {
      id: this.editFlow ? this.recipeId : crypto.randomUUID(),
      name: this.recipeForm.value['name'],
      description: this.recipeForm.value['description'],
      imagePath: this.recipeForm.value['imageURL'],
      ingredients: this.recipeForm.value['ingredients'],
    }

    // If it is an edit flow
    if (this.editFlow) {
      this.recipeService.updateRecipe(this.recipeId, recipe)
    } else {
      this.recipeService.addRecipe(recipe);
    }

    // Go back to previous page
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // Add Controls/Form Groups to Ingredients Form Array
  addMoreIngredients() {
    const formArray = this.recipeForm.get('ingredients') as FormArray;

    // Form Group that we want to push
    const ingredientsFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(1)])
    })

    // Push the form group to the Form Array
    formArray.push(ingredientsFormGroup);
  }

  // Get the Form Array Controls (for template)
  getIngredientsFormArrayControls(){
    // Note that we are pushing a "FormGroup" on the click of add icon
    // So, we will get an array of "FormGroup" from the .controls property
    return (this.recipeForm.get('ingredients') as FormArray).controls as FormGroup[];
  }

  // Delete Form Group from Form Array
  deleteIngredient(i: number) {
    const formArray = this.recipeForm.get('ingredients') as FormArray;

    formArray.removeAt(i);
  }

  // Handler for Cancel Button
  onCancelClick () {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
