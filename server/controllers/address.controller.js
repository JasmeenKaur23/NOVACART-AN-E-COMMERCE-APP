import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (request, response) => {
  try {
    const userId = request.userId;
    const {
      address_line1,
      city,
      state,
      country,
      pincode,
      mobile,
      // userId,
      landmark,
      addressType,
    } = request.body;

    if (!address_line1 || !city || !state || !country || !pincode || !mobile) {
      return response.status(500).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    const address = new AddressModel({
      address_line1,
      city,
      state,
      country,
      pincode,
      mobile,
      userId,
      landmark,
      addressType,
    });

    const savedAddress = await address.save();
    const updateCartUser = await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          address_details: savedAddress?._id,
        },
      }
    );
    return response.status(200).json({
      message: "Address saved Successfully",
      success: true,
      error: false,
      data: savedAddress,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const getAddressController = async (request, response) => {
  try {
    const address = await AddressModel.find({
      userId: request?.query?.userId,
    });

    if (!address) {
      return response.status(404).json({
        error: true,
        success: false,
        message: "Address not found",
      });
    }

    return response.status(200).json({
      message: "success get address",
      success: true,
      error: false,
      address: address,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
// export const deleteAddressController = async (request, response) => {
//   try {
//     const userId = request.userId;
//     const { _id } = request.params._id;
//     if (!_id) {
//       return response.status(400).json({
//         message: "provide Id",
//         success: false,
//         error: true,
//       });
//     }

//     const deleteItem = await AddressModel.deleteOne({
//       _id: _id,
//       userId: userId,
//     });
//     if (!deleteItem) {
//       return response.status(404).json({
//         message: "The address in db A not found",
//         success: false,
//         error: true,
//       });
//     }

//     const address = await AddressModel.findOne({
//       _id: userId,
//     });

//     await address.save();
//     return response.status(200).json({
//       message: "address removed successfully",
//       success: true,
//       error: false,
//       data:deleteItem
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message:
//         error.message || "Internal Server Error while updating cart item",
//       success: false,
//       error: true,
//     });
//   }
// };

export const deleteAddressController = async (request, response) => {
  try {
    const userId = request.userId;
    const id = request.params.id; // ✅ get from params

    if (!id) {
      return response.status(400).json({
        message: "Provide address id",
        success: false,
        error: true,
      });
    }

    const deleteItem = await AddressModel.deleteOne({
      _id: id,
      userId: userId,
    });

    if (deleteItem.deletedCount === 0) {
      return response.status(404).json({
        message: "Address not found or already deleted",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      message: "Address removed successfully",
      success: true,
      error: false,
      data: deleteItem,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error while deleting address",
      success: false,
      error: true,
    });
  }
};

export const getSingleAddressController = async (request, response) => {
  try {
    const id = request.params.id;

    const address = await AddressModel.findOne({ _id: id });
    if (!address) {
      return response.status(404).json({
        error: true,
        success: false,
        message: "Address not found",
      });
    }

    return response.status(200).json({
      message: "Address fetched successfully",
      success: true,
      error: false,
      address: address,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export async function editAddress(request, response) {
  try {
    const userId = request.userId;
    const id = request.params.id;
    const {
      address_line1,
      city,
      state,
      country,
      pincode,
      mobile,
      // userId,
      landmark,
      addressType,
    } = request.body;

    const editAddress = await AddressModel.findByIdAndUpdate(
      id,
      {
        address_line1: address_line1,
        city: city,
        state: state,
        country: country,
        pincode: pincode,
        mobile: mobile,
        landmark: landmark,
        addressType: addressType,
      },
      {
        new: true,
      }
    );

    return response.json({
      message: "Address updated successfully",
      error: false,
      success: true,
      address: editAddress,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error while deleting image",
      success: false,
      error: true,
    });
  }
}
