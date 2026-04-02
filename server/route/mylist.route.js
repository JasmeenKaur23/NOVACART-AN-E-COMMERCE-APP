import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addToMyListController, deleteFromMyListController, getMyListController } from "../controllers/mylist.controller.js";

const myListRouter=Router();

myListRouter.post('/add',auth,addToMyListController)
myListRouter.delete('/:id',auth,deleteFromMyListController)
myListRouter.get('/',auth,getMyListController)

export default  myListRouter