import { IsNull, Not } from 'typeorm';
import { User } from '../models/User';
import { userService } from '../services/user.service';
import { UserRequest } from '../types/express';
import { Response } from 'express';
import { RentalApplication } from '../models/RentalApplication';
import { Property } from '../models/Property';

const getUsers = async (req: UserRequest, res: Response) => {
    return res.json(
        await userService.findAll()
    )
}

const removeUser = async (req: UserRequest, res: Response) => {
    const { userId } = req.params;

   await userService.remove(userId);

  return res.status(200).json({ status: 200 });
}



const getFavourites = async (req: UserRequest, res: Response) => {
    const favourites = await userService.getFavourites(req.user.id)

    res.json(favourites)
}


const addFavourites = async (req: UserRequest, res: Response) => {
    const { propertyId } = req.body;

    const userId = req.user.id

    const { user, property } = await userService.addFavourites(userId, propertyId);

    if (!user || !property) {
      return res.status(404).json({ success: false, message: 'User or property not found.' });
    }

    user.favourites.push(property);

    await user.save();

    res.status(200).json({ success: true, message: 'Property added to favourites.' });
}

const removeFavourites = async (req: UserRequest, res: Response) => {
    const { propertyId } = req.body;
    const userId = req.user.id

    const {user, property } = await userService.removeFavourites(userId, propertyId);

    if (!user) {
        throw new Error('User not found');
    }    

    user.favourites = user.favourites.filter(favourite => favourite.id !== propertyId);

    await user.save();

    return res.status(200).json({ success: true, message: 'Property removed from favourites.' });
}

const addRental = async (req: UserRequest, res: Response) => {
    const { rentalAppId } = req.body;
    const userId = req.user.id;

    const { rentalApplication, user } = await userService.addRental(rentalAppId, userId);
    
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if(rentalApplication?.state == "accepted" && rentalApplication.property){
        const property = rentalApplication.property;
        property.tenant = user;
        await property.save();
        res.status(200).json({ success: true, message: 'Rental added successfully.' });
    }
    else
        res.status(400).json({ success: false, message: 'Rental not added.' });
}

const removeRentalAdmin = async (req: UserRequest, res: Response) => {
    const propertyId = req.params.userId;
    const userId = req.params.propertyId;

    const { user, property } = await userService.removeRentalAdmin(userId, propertyId);

    if (!user || !property) {
        return res.status(404).json({ success: false, message: 'User or property not found.' });
    }

    property.tenant = null;
    await property.save();

    res.status(200).json({ success: true, message: 'Rental removed successfully.' });
}

const removeRental = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;

    const { user } = await userService.removeRental(userId);

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }

    user.rentedProperty = null;
    await user.save();

    res.status(200).json({ success: true, message: 'Rental removed successfully.' });
}

const getAllRental = async (req: UserRequest, res: Response)=> {
    const usersWithRental = await User.find({
        where: {
            rentedProperty: Not(IsNull())
        }, 
        relations: {
            rentedProperty: true
        }
    })
    return res.json(usersWithRental)
};

const getRental = async (req: UserRequest, res: Response)=> {
    const userWithRental = await User.findOne({
        where: {
            rentedProperty: Not(IsNull())
        }, 
        relations: {
            rentedProperty: true
        }
    })
    return res.json(userWithRental)
};

const getRentalApplication = async (req: UserRequest, res: Response)=> {
    const userId = req.user.id;

    const rentalApp = await userService.getRentalApplication(userId);

    res.status(200).json(rentalApp);
}

const getRentalApplicationById = async (req: UserRequest, res: Response)=> {
    const id = req.params.id;

    const rentalApp = await userService.getRentalApplicationById(id);

    res.status(200).json(rentalApp);
}

export const userController = {
    getUsers,
    removeUser,
    getFavourites,
    addFavourites,
    removeFavourites,
    addRental,
    removeRentalAdmin,
    removeRental,
    getAllRental,
    getRental,
    getRentalApplication,
    getRentalApplicationById
}
