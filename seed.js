const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const products = [
  {
    name: "Cappuccino",
    description: "Cappuccino is a latte made with more foam...",
    price: 4.2,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327200/capuchino1_gme2gj.png",
    rating: 4.5,
    type: "Coffee",
    sizes: ["S", "M", "L"],
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "A classic cappuccino with extra foam and a hint of vanilla.",
    price: 4.5,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327200/capuchino2_brrdxx.png",
    rating: 4.7,
    type: "Coffee",
    sizes: ["S", "M", "L"],
  },
  {
    id: 3,
    name: "Cappuccino",
    description: "Cappuccino with a rich chocolate topping.",
    price: 4.8,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327200/capuchino3_uj68tp.png",
    rating: 4.6,
    type: "Coffee",
    sizes: ["S", "M", "L"],
  },

  // Espresso
  {
    id: 4,
    name: "Espresso",
    description: "A single shot of espresso, bold and intense.",
    price: 3.5,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327201/espresso1_cnqdjf.png",
    rating: 4.3,
    type: "Coffee",
    sizes: ["S", "M", "L"],
  },
  {
    id: 5,
    name: "Espresso",
    description: "Double shot espresso for a stronger kick.",
    price: 4.0,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327201/espresso2_hlqnq5.png",
    rating: 4.6,
    type: "Coffee",
    sizes: ["S", "M", "L"],
  },
  {
    id: 6,
    name: "Espresso",
    description: "Espresso with a touch of cream for a smoother taste.",
    price: 4.2,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327201/espresso3_k3sung.png",
    rating: 4.4,
    type: "Coffee",
    sizes: ["S", "M", "L"],
  },

  // Americano
  {
    id: 7,
    name: "Americano",
    description: "Hot Americano with a balanced flavor.",
    price: 3.8,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327199/americano1_xwzs2u.png",
    rating: 4.1,
    type: "Coffee",
    sizes: ["S", "M", "L"],
  },
  {
    id: 8,
    name: "Americano",
    description: "Iced Americano, refreshing and bold.",
    price: 4.0,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327199/americano2_qqgi0j.png",
    rating: 4.3,
    type: "Coffee",
    sizes: ["S", "M", "L"],
  },
  {
    id: 9,
    name: "Americano",
    description: "Americano with a splash of milk.",
    price: 4.2,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327199/americano3_fu9ee8.png",
    rating: 4.5,
    type: "Coffee",
    sizes: ["S", "M", "L"],
  },

  // Macchiato
  {
    id: 10,
    name: "Macchiato",
    description: "Caramel Macchiato with a sweet twist.",
    price: 4.5,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327201/macchiato1_e19gek.png",
    rating: 4.6,
    type: "Coffee",
    sizes: ["S", "M", "L"],
  },
  {
    id: 11,
    name: "Macchiato",
    description: "Vanilla Macchiato with a smooth finish.",
    price: 4.7,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327201/macchiato2_pbzquf.png",
    rating: 4.8,
    type: "Coffee",
    sizes: ["S", "M", "L"],
  },
  {
    id: 12,
    name: "Macchiato",
    description: "Classic Macchiato with a strong espresso base.",
    price: 4.3,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327201/macchiato3_hn4vs7.png",
    rating: 4.4,
    type: "Coffee",
    sizes: ["S", "M", "L"],
  },

  // Coffee Beans
  {
    id: 13,
    name: "Robusta Beans",
    description:
      "Robusta beans are known for their strong, bold flavor, often used in espresso blends.",
    price: 10.5,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327200/beans1_mdk0pc.png",
    rating: 4.5,
    type: "Beans",
    sizes: ["250gm", "500gm", "1000gm"],
  },
  {
    id: 14,
    name: "Arabica Beans",
    description:
      "Arabica beans are by far the most popular type of coffee beans, making up about 60% of the world’s coffee.",
    price: 12.0,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327199/beans2_fx8xr4.png",
    rating: 4.7,
    type: "Beans",
    sizes: ["250gm", "500gm", "1000gm"],
  },
  {
    id: 15,
    name: "Liberica Coffee Beans",
    description:
      "Liberica beans from Africa, known for their unique aroma and woody notes.",
    price: 11.8,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327199/beans3_mts88b.png",
    rating: 4.6,
    type: "Beans",
    sizes: ["250gm", "500gm", "1000gm"],
  },
  {
    id: 16,
    name: "Excelsa Beans",
    description:
      "Excelsa beans offer a tart, fruitier flavor profile, often used to add complexity to blends.",
    price: 13.0,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327199/beans4_zxbrgq.png",
    rating: 4.8,
    type: "Beans",
    sizes: ["250gm", "500gm", "1000gm"],
  },
  {
    id: 17,
    name: "Java Beans",
    description:
      "Java beans from Indonesia, known for their smooth and earthy taste.",
    price: 11.5,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327200/beans5_eobcdb.png",
    rating: 4.4,
    type: "Beans",
    sizes: ["250gm", "500gm", "1000gm"],
  },
  {
    id: 18,
    name: "Colombian Beans",
    description:
      "Colombian beans are famous for their balanced flavor with notes of caramel and nuts.",
    price: 12.5,
    image:
      "https://res.cloudinary.com/duongphan/image/upload/v1746327200/beans6_ely33r.png",
    rating: 4.9,
    type: "Beans",
    sizes: ["250gm", "500gm", "1000gm"],
  },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Seeded product data.");
  process.exit();
});
