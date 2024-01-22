import { IsNull, Not } from 'typeorm';
import { User } from '../models/User';
import { userService } from '../services/user.service';
import { UserRequest } from '../types/express';
import { Response } from 'express';

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
    const { propertyId } = req.body;
    const { userId } = req.body;

    const { user, property } = await userService.addRental(userId, propertyId);

    if (!user || !property) {
        return res.status(404).json({ success: false, message: 'User or property not found.' });
    }

    property.tenant = user;
    await property.save();

    res.status(200).json({ success: true, message: 'Rental added successfully.' });
}

const removeRentalAdmin = async (req: UserRequest, res: Response) => {
    const { propertyId } = req.body;
    const { userId } = req.body;

    const { user, property } = await userService.removeRental(userId, propertyId);

    if (!user || !property) {
        return res.status(404).json({ success: false, message: 'User or property not found.' });
    }

    property.tenant = null;
    await property.save();

    res.status(200).json({ success: true, message: 'Rental removed successfully.' });
}

const removeRental = async (req: UserRequest, res: Response) => {
    const { propertyId } = req.body;
    const userId = req.user.id;

    const { user, property } = await userService.removeRental(userId, propertyId);

    if (!user || !property) {
        return res.status(404).json({ success: false, message: 'User or property not found.' });
    }

    property.tenant = null;
    await property.save();

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

export const userController = {getUsers, removeUser, getFavourites, addFavourites, removeFavourites, addRental, removeRentalAdmin, removeRental, getAllRental}
