// Data about the User
export class User {
    constructor(
        public email: string, 
        public id: string, 
        private _token: string, 
        private _tokenExpirationDate: Date
    ){}

    // Getter for the Token
    get token() {
        // Current Timestamp
        const currentTime = new Date();

        // If token has already expired, return null
        if(!this._tokenExpirationDate || currentTime > this._tokenExpirationDate) {
            return null
        }

        // Only return the Token when token has not expired
        return this._token;
    }
}