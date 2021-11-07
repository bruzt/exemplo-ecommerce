import app from "../../app";
import { io } from "socket.io-client";
import axios from "axios";

import truncate from "../../testUtils/truncateTypeorm";
import sonicConnection from "../../databases/sonic/connection";
import UserModel from "../../models/UserModel";
import CategoryModel from "../../models/CategoryModel";
import AddressModel from "../../models/AddressModel";
import ProductModel from "../../models/ProductModel";
import OrderModel from "../../models/OrderModel";
import {
  fakeUser,
  fakeCreditCard,
  fakeAddress,
  fakeCategory,
  fakeProduct,
} from "../../testUtils/fakeData";

function sleep(timeout: number): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
}

describe("Socket.io Tests", () => {
  beforeAll(async () => {
    app.listen(3001);
  });

  beforeEach(() => {
    return truncate();
  });

  afterAll(async () => {
    app.close();

    await sonicConnection.search.close();
    await sonicConnection.ingest.close();
  });

  it("should keep connection via websocket", async () => {
    const user = UserModel.create(fakeUser);
    user.admin = true;
    const token = user.generateJwt();

    const socket = io("http://localhost:3001", {
      transports: ["websocket"],
      upgrade: false,
      query: {
        authorization: token,
      },
    });

    await sleep(100);

    expect(socket.connected).toBe(true);
    socket.disconnect();
  });

  it("should not allow connection via websocket - no authorization", async () => {
    const socket = io("http://localhost:3001", {
      transports: ["websocket"],
      upgrade: false,
    });

    await sleep(100);

    expect(socket.connected).toBe(false);
  });

  it("should not allow connection via websocket - not an admin", async () => {
    const user = UserModel.create(fakeUser);
    user.admin = false;
    const token = user.generateJwt();

    const socket = io("http://localhost:3001", {
      transports: ["websocket"],
      upgrade: false,
      query: {
        authorization: token,
      },
    });

    await sleep(100);

    expect(socket.connected).toBe(false);
  });

  it('should send "newOrder" via websocket', async () => {
    let order: OrderModel | undefined;

    const user = UserModel.create(fakeUser);
    user.admin = true;
    await user.save();
    const token = user.generateJwt();

    const socket = io("http://localhost:3001", {
      transports: ["websocket"],
      upgrade: false,
      query: {
        authorization: token,
      },
    });

    socket.on("newOrder", (message: OrderModel) => {
      order = message;
    });

    const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
    await address.save();

    const category = CategoryModel.create(fakeCategory);
    await category.save();

    const product = ProductModel.create({
      ...fakeProduct,
      category_id: category.id,
    });
    await product.save();

    const api = axios.create({
      baseURL: "http://localhost:3001",
    });

    api.defaults.headers.authorization = `Bearer ${token}`;

    const response = await api.post("/orders", {
      freight_name: "sedex",
      freight_price: 30.77,
      quantity_buyed: [2],
      products_id: [product.id],
      address_id: address.id,
    });

    expect(response.data.id).toBe(order?.id);
    socket.disconnect();
  });
});
