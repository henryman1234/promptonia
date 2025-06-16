import { Schema, model, models } from "mongoose";

const UserSchema = new Schema ({
    email: {
        type:  String,
        unique: [true, "Cet email existe deja"],
        required: [true, "Veuillez entrer un email"]
    },
    username: {
        type:  String,
        required: [true, 'Veuillez entrez un nom d\'utilisateur!'],
        // match: [/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "nom invalide, le nom d'utilisateur doit contenir 4-20 caractères alphanumériques!"]
    },
    image: {
        type: String
    }
    
})

const User = models.User || model("User", UserSchema)

export default User