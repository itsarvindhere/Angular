import { Component, computed, resource, Signal, signal } from '@angular/core';
import { FormData } from '../model/form';
import { apply, createManagedMetadataKey, createMetadataKey, debounce, disabled, email, form, FormField, hidden, metadata, MetadataReducer, minLength, readonly, required, schema, SchemaPath, SchemaPathTree, validate, validateHttp } from '@angular/forms/signals';


// export const HELP_TEXT = createMetadataKey<string, string[]>(MetadataReducer.list());

// export const HELP_TEXT  = createManagedMetadataKey<Signal<string[]>, string>((inputSignal) => {
//   return computed(() => {
//     const input = inputSignal() || '';
//     return ['Extra help text', input]
//   });
// });

  export const HELP_TEXT  = createManagedMetadataKey<Signal<{ count: number; helpTexts: string[] }>, string, string[]>((inputSignal) => {
    return computed(() => {
      const helpTexts = inputSignal() || [];
      return {
        count: helpTexts?.length ?? 0,
        helpTexts
      }
    });
  }, MetadataReducer.list());

@Component({
  selector: 'app-root',
  imports: [FormField],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


  // Define the form model as a signal
  formModel = signal<FormData>({
    firstName: '',
    lastName: '',
    age: 0,
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  firstNameSchema = schema<string>((firstName) => {
    required(firstName, { message: 'First name is required' });
    minLength(firstName, 3, { message: 'First name must be at least 3 characters' });
  });

  usernameSchema = schema<string>((username) => {
    required(username, { message: 'Username is required' });
    minLength(username, 5, { message: 'Username must be at least 5 characters' });
    this.notAllowedUsername(username)
    this.checkUsername(username);
    debounce(username, 500);
  });

  // Passing the form model to the form function
  loginForm = form(this.formModel, (schemaPath) => {
    apply(schemaPath.firstName, this.firstNameSchema);
    apply(schemaPath.username, this.usernameSchema);
    
    required(schemaPath.lastName, { 
      message: 'Last name is required',
      when: ({valueOf}) => valueOf(schemaPath.firstName).length > 0
    });
    minLength(schemaPath.lastName, 3, { message: 'Last name must be at least 3 characters' });
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Email must be a valid email address' });
    metadata(schemaPath.email, HELP_TEXT, () => 'Email should be unique.');
    metadata(schemaPath.email, HELP_TEXT, () => 'We never share your email with anyone else.');
    metadata(schemaPath.email, HELP_TEXT, () => 'Email should be valid.');
    this.confirmPassword(schemaPath);
    // disabled(schemaPath.confirmPassword, ({valueOf}) => valueOf(schemaPath.password) === '' ? 'Please enter a password first!' : false);
    hidden(schemaPath.confirmPassword, ({valueOf}) => valueOf(schemaPath.password) === '');
    readonly(schemaPath.email,  ({valueOf}) => valueOf(schemaPath.username) === 'admin');
  });

  helpText = this.loginForm.email().metadata(HELP_TEXT);


  ngOnInit() {
    // This is how we can set the value of a form field
    this.loginForm.firstName().value.set('John');
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // This is how we can get the value of the form
    console.log(this.loginForm().value());
  }

  notAllowedUsername(schemaPath: SchemaPath<string>, options?: {message?: string}) {
    validate(schemaPath, (fieldContext) => {
      if (fieldContext.value() === 'admin') {
        return {
          kind: 'username-not-allowed',
          message: options?.message || 'This username is not allowed. Please choose another username!'
        }
      }
      return null;
    });
  };

  checkUsername(schemaPath: SchemaPath<string>, options?: {message?: string}) {
    validateHttp(schemaPath, {
      // request: ({value}) => `api/check-username?username=${value}`,
      request: ({value}) => {
        return {
          url: `api/check-username?username=${value}`,
          method: 'GET'
          // More options like headers can be added here
        }
      },
      onSuccess: (response: any) => {
        if (response.taken) {
          return {
            kind: 'usernameTaken',
            message: 'Username is already taken.'
          };
        };
         return null;
      },
      onError: (error) => {
        return {
            kind: 'networkError',
            message: 'Could not verify username availability',
          };
      }
    })
  }

  confirmPassword(schemaPath: SchemaPathTree<FormData>, options?: {message?: string}) {
    validate(schemaPath.confirmPassword, (fieldContext) => {
      const password = fieldContext.valueOf(schemaPath.password);
      const confirmPassword = fieldContext.value();
      
      if (password && confirmPassword !== password) {
        return {
          kind: 'confirm-password',
          message: 'Passwords do not match!'
        }
      }

      return null;
    });
  };

}
