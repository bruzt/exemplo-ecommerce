const app = require("../../app");
const { io } = require("socket.io-client");
const axios = require("axios");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

//const truncate = require("../../testUtils/truncate");
const sonicConnection = require("../../database/sonic/connection");
const factories = require("../../testUtils/factories");

function sleep(timeout) {
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

  beforeEach(async () => {
    await exec("sequelize db:migrate:undo:all");

    return exec("sequelize db:migrate");
    //return truncate();
  });

  afterAll(async () => {
    app.close();

    await sonicConnection.search.close();
    await sonicConnection.ingest.close();
  });

  it("should keep connection via websocket", async () => {
    const user = await factories.create("User");
    user.admin = true;
    const token = user.generateToken();

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
    const user = await factories.create("User");
    user.admin = false;
    const token = user.generateToken();

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
    let order;

    const user = await factories.create("User");
    user.admin = true;
    const token = user.generateToken();

    const socket = io("http://localhost:3001", {
      transports: ["websocket"],
      upgrade: false,
      query: {
        authorization: token,
      },
    });

    socket.on("newOrder", (message) => {
      order = message;
    });

    const address = await factories.create("Address", { user_id: user.id });

    const category = await factories.create("Category");

    const product = await factories.create("Product", {
      category_id: category.id,
    });

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

    expect(response.data.id).toBe(order.id);
    socket.disconnect();
  });
});
