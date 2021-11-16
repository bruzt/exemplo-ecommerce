import { Request, Response } from "express";

import UserModel from "../../models/UserModel";

interface IAddressData {
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipcode?: string;
}

export default async function update(req: Request, res: Response) {
  const paramsId = Number(req.params.id);
  const { id } = req.tokenPayload;

  const { street, number, neighborhood, city, state, zipcode } =
    req.body as IAddressData;

  try {
    /*
        const user = await UserModel.findOne(id, {
            relations: ['addresses'],
        });
        
        if(user == null) return res.status(404).json({ message: 'user not found' });
        
        const filteredAddress = user.addresses?.filter( (address) => address.id === paramsId );
        
        if(filteredAddress == null || filteredAddress.length === 0) return res.status(404).json({ message: "address not found" });
        
        const address = filteredAddress[0];
        */

    const user = await UserModel.createQueryBuilder("users")
      .where("users.id = :userId", { userId: id })
      .leftJoinAndSelect(
        "users.addresses",
        "addresses",
        "addresses.id = :addressId",
        { addressId: paramsId }
      )
      .getOne();
    if (user == null)
      return res.status(404).json({ message: "user not found" });
    if (user.addresses == null || user.addresses.length === 0)
      return res.status(404).json({ message: "address not found" });

    const address = user.addresses[0];

    if (street) address.street = street;
    if (number) address.number = number;
    if (neighborhood) address.neighborhood = neighborhood;
    if (city) address.city = city;
    if (state) address.state = state;
    if (zipcode) address.zipcode = zipcode;

    await address.save();

    return res.json(address);
  } catch (error) {
    console.error(new Date().toUTCString(), "-", error);
    res.status(500).json({ message: "internal error" });
  }
}
