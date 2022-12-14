import moment from "moment";
import { v1 as uuidv1 } from 'uuid';

class User {
    constructor() {
        this._id = uuidv1();
        this.fotoProfil = "";
        this.name = "";
        this.email = "";
        this.password = "";
        this.roles = "";
        this.isActive = true;
        this.lastActive = "";
        this.createdBy = "";
        this.updatedBy = "";
        this.createdAt = moment();
        this.updatedAt = moment();
    }

}

export default User;
