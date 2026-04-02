import MyListModel from "../models/myList.model.js";
import { v2 as cloudinary } from "cloudinary";
import { error, log } from "console";
import fs from "fs";

export const addToMyListController = async (request, response) => {
  try {
    const userId = request.userId;
    const {
      productId,
      productTitle,
      image,
      rating,
      brand,
      price,
      oldPrice,
      discount,
    } = request.body;
    const item = await MyListModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (item) {
      return response.status(404).json({
        message: "Item alreday in my list ",
        success: false,
        error: true,
      });
    }

    const myList = new MyListModel({
      productId,
      productTitle,
      image,
      rating,
      brand,
      price,
      oldPrice,
      discount,
      userId,
    });

    const save = await myList.save();

    return response.status(200).json({
      error: false,
      success: true,
      message: "The product added in my list ",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteFromMyListController = async (request, response) => {
  try {
    const myListItem = await MyListModel.findById(request.params.id);

    if(!myListItem)
    {
        return response.status(404).json({
        message: "The item with this given id not found ",
        success: false,
        error: true,
      });
    }


    const deletedItem=await MyListModel.findByIdAndDelete(request.params.id);
 if(!deletedItem)
    {
        return response.status(404).json({
        message: "The item with this given id not deleted ",
        success: false,
        error: true,
      });
    }

     
        return response.status(200).json({
        message: "The item with this given id removed fro my list",
        success: true,
        error: false,
      });
    
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getMyListController = async (request, response) => {
try {
    const userId=request.userId;

    const myListItems=await MyListModel.find({
        userId:userId
    })
    return response.status(200).json({
        error:false,
        success:true,
        data:myListItems
    })
} catch (error) {
      return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
}
}